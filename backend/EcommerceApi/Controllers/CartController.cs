using System.Security.Claims;
using EcommerceApi.DTOs;
using EcommerceApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceApi.Controllers;

[ApiController]
[Route("api/cart")]
[Authorize]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    private int CurrentUserId =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        return Ok(await _cartService.GetCartAsync(CurrentUserId));
    }

    [HttpPost]
    public async Task<IActionResult> AddItem(AddCartItemDto dto)
    {
        try
        {
            var item = await _cartService.AddItemAsync(CurrentUserId, dto);
            return Ok(item);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateItem(int id, UpdateCartItemDto dto)
    {
        try
        {
            var item = await _cartService.UpdateItemAsync(CurrentUserId, id, dto);
            if (item == null) return NotFound();
            return Ok(item);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveItem(int id)
    {
        var removed = await _cartService.RemoveItemAsync(CurrentUserId, id);
        if (!removed) return NotFound();
        return Ok();
    }

    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout()
    {
        try
        {
            var order = await _cartService.CheckoutAsync(CurrentUserId);
            return Ok(order);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
