namespace EcommerceApi.DTOs;

public class OrderResponseDto
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public decimal Total { get; set; }
    public string Status { get; set; } = string.Empty;
    public List<OrderItemResponseDto> Items { get; set; } = new();
}

public class OrderItemResponseDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public ProductResponseDto? Product { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}
