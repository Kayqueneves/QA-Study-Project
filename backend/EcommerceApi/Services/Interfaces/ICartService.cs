using EcommerceApi.DTOs;

namespace EcommerceApi.Services.Interfaces;

public interface ICartService
{
    Task<List<CartItemResponseDto>> GetCartAsync(int userId);
    Task<CartItemResponseDto> AddItemAsync(int userId, AddCartItemDto dto);
    Task<CartItemResponseDto?> UpdateItemAsync(int userId, int itemId, UpdateCartItemDto dto);
    Task<bool> RemoveItemAsync(int userId, int itemId);
    Task<OrderResponseDto> CheckoutAsync(int userId);
}
