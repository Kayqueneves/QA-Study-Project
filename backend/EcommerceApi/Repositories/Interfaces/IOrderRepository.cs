using EcommerceApi.Models;

namespace EcommerceApi.Repositories.Interfaces;

public interface IOrderRepository : IRepository<Order>
{
    Task<List<Order>> GetAllWithItemsAsync();
    Task<List<Order>> GetByUserIdAsync(int userId);
    Task<Order?> GetByIdWithItemsAsync(int id);
}
