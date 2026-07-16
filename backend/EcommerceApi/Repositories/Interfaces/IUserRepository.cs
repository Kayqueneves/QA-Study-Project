using EcommerceApi.Models;

namespace EcommerceApi.Repositories.Interfaces;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByEmailAsync(string email);
}
