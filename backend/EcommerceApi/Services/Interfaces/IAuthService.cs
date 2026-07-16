using EcommerceApi.DTOs;

namespace EcommerceApi.Services.Interfaces;

public interface IAuthService
{
    Task<UserResponseDto> RegisterAsync(RegisterDto dto);
    Task<AuthResponseDto?> LoginAsync(LoginDto dto);
}
