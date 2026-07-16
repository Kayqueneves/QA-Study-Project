using EcommerceApi.DTOs;

namespace EcommerceApi.Services.Interfaces;

public interface IOrderService
{
    Task<List<OrderResponseDto>> GetOrdersAsync(int userId);
    Task<OrderResponseDto?> GetByIdAsync(int userId, int orderId);
}
