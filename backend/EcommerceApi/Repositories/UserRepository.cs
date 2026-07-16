using EcommerceApi.Data;
using EcommerceApi.Models;
using EcommerceApi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EcommerceApi.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(AppDbContext db) : base(db) { }

    public async Task<User?> GetByEmailAsync(string email)
    {
        // CORRIGIDO: comparacao normalizada (o AuthService ja envia o e-mail em
        // lowercase, mas o repositorio tambem normaliza aqui como defesa extra,
        // caso algum outro Service futuro chame este metodo diretamente).
        var normalized = email.Trim().ToLower();
        return await _dbSet.FirstOrDefaultAsync(u => u.Email.ToLower() == normalized);
    }
}
