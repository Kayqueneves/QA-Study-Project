using EcommerceApi.DTOs;
using EcommerceApi.Models;
using EcommerceApi.Repositories.Interfaces;
using EcommerceApi.Services.Interfaces;

namespace EcommerceApi.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;

    public OrderService(IOrderRepository orderRepository)
    {
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

    private static OrderResponseDto ToDto(Order o) => new()
    {
        Id = o.Id,
        CreatedAt = o.CreatedAt,
        Total = o.Total,
        Status = o.Status,
        Items = o.Items.Select(i => new OrderItemResponseDto
        {
            Id = i.Id,
            ProductId = i.ProductId,
            Product = i.Product == null ? null : ToProductDto(i.Product),
            Quantity = i.Quantity,
            UnitPrice = i.UnitPrice
        }).ToList()
    };

    public async Task<List<OrderResponseDto>> GetOrdersAsync(int userId)
    {
        // CORRIGIDO: agora usa GetByUserIdAsync, retornando apenas os pedidos
        // do usuario autenticado (antes retornava os pedidos de todo mundo).
        var orders = await _orderRepository.GetByUserIdAsync(userId);
        return orders.Select(ToDto).ToList();
    }

    public async Task<OrderResponseDto?> GetByIdAsync(int userId, int orderId)
    {
        var order = await _orderRepository.GetByIdWithItemsAsync(orderId);
        if (order == null) return null;

        // CORRIGIDO (IDOR): se o pedido nao pertence ao usuario autenticado,
        // retorna null (o Controller converte isso em 404), sem revelar que
        // o pedido existe na conta de outra pessoa.
        if (order.UserId != userId) return null;

        return ToDto(order);
    }
}
