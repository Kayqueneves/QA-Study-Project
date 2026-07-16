using EcommerceApi.DTOs;
using EcommerceApi.Models;
using EcommerceApi.Repositories.Interfaces;
using EcommerceApi.Services.Interfaces;

namespace EcommerceApi.Services;

public class CartService : ICartService
{
    private readonly ICartRepository _cartRepository;
    private readonly IProductRepository _productRepository;
    private readonly IOrderRepository _orderRepository;

    public CartService(
        ICartRepository cartRepository,
        IProductRepository productRepository,
        IOrderRepository orderRepository)
    {
        _cartRepository = cartRepository;
        _productRepository = productRepository;
        _orderRepository = orderRepository;
    }

    private static ProductResponseDto ToProductDto(Product p) => new()
    {
        Id = p.Id,
        Name = p.Name,
        Description = p.Description,
        Price = p.Price,
        Stock = p.Stock,
        ImageUrl = p.ImageUrl
    };

    private static CartItemResponseDto ToDto(CartItem c) => new()
    {
        Id = c.Id,
        ProductId = c.ProductId,
        Product = c.Product == null ? null : ToProductDto(c.Product),
        Quantity = c.Quantity
    };

    public async Task<List<CartItemResponseDto>> GetCartAsync(int userId)
    {
        var items = await _cartRepository.GetByUserIdAsync(userId);
        return items.Select(ToDto).ToList();
    }

    public async Task<CartItemResponseDto> AddItemAsync(int userId, AddCartItemDto dto)
    {
        // CORRIGIDO: valida quantidade antes de qualquer outra coisa.
        if (dto.Quantity <= 0)
        {
            throw new ArgumentException("A quantidade deve ser maior que zero.");
        }

        var product = await _productRepository.GetByIdAsync(dto.ProductId);
        if (product == null)
        {
            throw new KeyNotFoundException("Produto nao encontrado.");
        }

        // CORRIGIDO: se o produto ja esta no carrinho do usuario, soma a
        // quantidade na linha existente em vez de criar uma linha duplicada.
        var existing = await _cartRepository.GetByUserAndProductAsync(userId, dto.ProductId);
        var totalDesejado = (existing?.Quantity ?? 0) + dto.Quantity;

        // CORRIGIDO: nao permite adicionar mais do que o estoque disponivel.
        if (totalDesejado > product.Stock)
        {
            throw new InvalidOperationException(
                $"Estoque insuficiente. Disponivel: {product.Stock}, solicitado: {totalDesejado}.");
        }

        if (existing != null)
        {
            existing.Quantity = totalDesejado;
            _cartRepository.Update(existing);
            await _cartRepository.SaveChangesAsync();
            existing.Product = product;
            return ToDto(existing);
        }

        var item = new CartItem
        {
            UserId = userId,
            ProductId = dto.ProductId,
            Quantity = dto.Quantity
        };

        await _cartRepository.AddAsync(item);
        await _cartRepository.SaveChangesAsync();

        item.Product = product;
        return ToDto(item);
    }

    public async Task<CartItemResponseDto?> UpdateItemAsync(int userId, int itemId, UpdateCartItemDto dto)
    {
        if (dto.Quantity <= 0)
        {
            throw new ArgumentException("A quantidade deve ser maior que zero.");
        }

        var item = await _cartRepository.GetByIdAsync(itemId);

        // CORRIGIDO (IDOR): trata "nao encontrado" e "pertence a outro usuario"
        // da mesma forma (retorna null -> 404), sem revelar que o item existe
        // na conta de outra pessoa.
        if (item == null || item.UserId != userId)
        {
            return null;
        }

        var product = await _productRepository.GetByIdAsync(item.ProductId);
        if (product != null && dto.Quantity > product.Stock)
        {
            throw new InvalidOperationException(
                $"Estoque insuficiente. Disponivel: {product.Stock}, solicitado: {dto.Quantity}.");
        }

        item.Quantity = dto.Quantity;
        _cartRepository.Update(item);
        await _cartRepository.SaveChangesAsync();

        item.Product = product;
        return ToDto(item);
    }

    public async Task<bool> RemoveItemAsync(int userId, int itemId)
    {
        var item = await _cartRepository.GetByIdAsync(itemId);

        // CORRIGIDO (IDOR): so remove se o item pertencer ao usuario logado.
        if (item == null || item.UserId != userId)
        {
            return false;
        }

        _cartRepository.Remove(item);
        await _cartRepository.SaveChangesAsync();
        return true;
    }

    public async Task<OrderResponseDto> CheckoutAsync(int userId)
    {
        var items = await _cartRepository.GetByUserIdAsync(userId);
        if (items.Count == 0)
        {
            throw new InvalidOperationException("Carrinho vazio.");
        }

        // CORRIGIDO: valida estoque de todos os itens ANTES de criar o pedido,
        // para nao gerar um pedido parcialmente valido.
        foreach (var item in items)
        {
            if (item.Product == null || item.Quantity > item.Product.Stock)
            {
                throw new InvalidOperationException(
                    $"Estoque insuficiente para o produto '{item.Product?.Name ?? item.ProductId.ToString()}'.");
            }
        }

        // CORRIGIDO: o total agora multiplica preco pela quantidade de cada item.
        var total = items.Sum(i => i.Product!.Price * i.Quantity);

        var order = new Order
        {
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            Total = total,
            Status = "Pending"
        };

        await _orderRepository.AddAsync(order);
        await _orderRepository.SaveChangesAsync(); // gera o Id do pedido

        var responseItems = new List<OrderItemResponseDto>();

        foreach (var item in items)
        {
            var orderItem = new OrderItem
            {
                OrderId = order.Id,
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                UnitPrice = item.Product!.Price
            };
            order.Items.Add(orderItem);

            // CORRIGIDO: desconta o estoque vendido.
            item.Product.Stock -= item.Quantity;
            _productRepository.Update(item.Product);

            responseItems.Add(new OrderItemResponseDto
            {
                ProductId = item.ProductId,
                Product = ToProductDto(item.Product),
                Quantity = item.Quantity,
                UnitPrice = item.Product.Price
            });
        }

        // CORRIGIDO: limpa o carrinho do usuario apos o checkout.
        foreach (var item in items)
        {
            _cartRepository.Remove(item);
        }

        await _orderRepository.SaveChangesAsync();

        return new OrderResponseDto
        {
            Id = order.Id,
            CreatedAt = order.CreatedAt,
            Total = order.Total,
            Status = order.Status,
            Items = order.Items.Select((i, idx) => new OrderItemResponseDto
            {
                Id = i.Id,
                ProductId = i.ProductId,
                Product = responseItems[idx].Product,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice
            }).ToList()
        };
    }
}
