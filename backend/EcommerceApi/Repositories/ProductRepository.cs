using EcommerceApi.Data;
using EcommerceApi.Models;
using EcommerceApi.Repositories.Interfaces;

namespace EcommerceApi.Repositories;

public class ProductRepository : Repository<Product>, IProductRepository
{
    public ProductRepository(AppDbContext db) : base(db) { }
}
