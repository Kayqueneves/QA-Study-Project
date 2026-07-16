using EcommerceApi.Data;
using EcommerceApi.Models;
using EcommerceApi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EcommerceApi.Repositories;

public class CartRepository : Repository<CartItem>, ICartRepository
{
    public CartRepository(AppDbContext db) : base(db) { }

    public async Task<List<CartItem>> GetByUserIdAsync(int userId)
    {
        return await _dbSet
            .Include(c => c.Product)
            .Where(c => c.UserId == userId)
            .ToListAsync();
    }

    public async Task<CartItem?> GetByUserAndProductAsync(int userId, int productId)
    {
        return await _dbSet
            .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);
    }
}
