using EcommerceApi.Models;

namespace EcommerceApi.Repositories.Interfaces;

public interface ICartRepository : IRepository<CartItem>
{
    Task<List<CartItem>> GetByUserIdAsync(int userId);
    Task<CartItem?> GetByUserAndProductAsync(int userId, int productId);
}
