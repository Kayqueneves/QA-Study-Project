namespace EcommerceApi.DTOs;

public class CartItemResponseDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public ProductResponseDto? Product { get; set; }
    public int Quantity { get; set; }
}

public class AddCartItemDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

public class UpdateCartItemDto
{
    public int Quantity { get; set; }
}
