using EcommerceApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EcommerceApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<CartItem> CartItems => Set<CartItem>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>()
            .Property(p => p.Price)
            .HasColumnType("decimal(10,2)");

        modelBuilder.Entity<Order>()
            .Property(o => o.Total)
            .HasColumnType("decimal(10,2)");

        modelBuilder.Entity<OrderItem>()
            .Property(i => i.UnitPrice)
            .HasColumnType("decimal(10,2)");

        // Relacionamento: User 1 -> N CartItem
        modelBuilder.Entity<CartItem>()
            .HasOne(c => c.User)
            .WithMany(u => u.CartItems)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relacionamento: Product 1 -> N CartItem
        modelBuilder.Entity<CartItem>()
            .HasOne(c => c.Product)
            .WithMany(p => p.CartItems)
            .HasForeignKey(c => c.ProductId)
            .OnDelete(DeleteBehavior.Cascade);


        modelBuilder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany(u => u.Orders)
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<OrderItem>()
            .HasOne(i => i.Order)
            .WithMany(o => o.Items)
            .HasForeignKey(i => i.OrderId)
            .OnDelete(DeleteBehavior.Cascade);


        modelBuilder.Entity<OrderItem>()
            .HasOne(i => i.Product)
            .WithMany(p => p.OrderItems)
            .HasForeignKey(i => i.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Teclado Mecanico", Description = "Teclado mecanico RGB switch azul", Price = 249.90m, Stock = 15, ImageUrl = "https://picsum.photos/seed/teclado/300/200" },
            new Product { Id = 2, Name = "Mouse Gamer", Description = "Mouse com sensor optico 16000dpi", Price = 129.90m, Stock = 30, ImageUrl = "https://picsum.photos/seed/mouse/300/200" },
            new Product { Id = 3, Name = "Monitor 27 polegadas", Description = "Monitor Full HD 144hz", Price = 899.00m, Stock = 8, ImageUrl = "https://picsum.photos/seed/monitor/300/200" },
            new Product { Id = 4, Name = "Headset Bluetooth", Description = "Headset com cancelamento de ruido", Price = 349.50m, Stock = 20, ImageUrl = "https://picsum.photos/seed/headset/300/200" },
            new Product { Id = 5, Name = "Webcam Full HD", Description = "Webcam 1080p com microfone embutido", Price = 179.90m, Stock = 12, ImageUrl = "https://picsum.photos/seed/webcam/300/200" },
            new Product { Id = 6, Name = "Cadeira Gamer", Description = "Cadeira ergonomica reclinavel", Price = 1199.00m, Stock = 5, ImageUrl = "https://picsum.photos/seed/cadeira/300/200" }
        );
    }
}
