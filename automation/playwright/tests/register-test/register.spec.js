import { test, expect } from "@playwright/test";
test.describe("Register", () => {
  test("Deve registrar com credenciais válidas", async ({ page }) => {
    await page.goto("http://localhost:5173/register");
    await page.locator('[placeholder="Nome"]').fill("User Teste");
    await page.locator('[placeholder="Email"]').fill("user@teste.com");
    await page.locator('[placeholder="Senha"]').fill("password123");
    await page.locator('button[type="submit"]').click();
    
  });
  //Teste com todas as credenciais vazias
  test("Deve exibir mensagem de erro ao tentar registrar com credenciais vazias", async ({ page }) => {
    await page.goto("http://localhost:5173/register");
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText("Nome é obrigatório.")).toBeVisible();
await expect(page.getByText("E-mail é obrigatório.")).toBeVisible();
await expect(page.getByText("Senha é obrigatória.")).toBeVisible();
  });
    //Teste com formato de email inválido
    test("Deve exibir mensagem de erro ao tentar registrar com email inválido", async ({ page }) => {
      await page.goto("http://localhost:5173/register");
      await page.locator('[placeholder="Nome"]').fill("User Teste");
      await page.locator('[placeholder="Email"]').fill("user@teste");
      await page.locator('[placeholder="Senha"]').fill("password123");
      await page.locator('button[type="submit"]').click();
      await expect(page.getByText("Informe um e-mail válido.")).toBeVisible();
    });
    //Teste com senha menor que 6 caracteres
    test("Deve exibir mensagem de erro ao tentar registrar com senha menor que 6 caracteres", async ({page})=> {
        await page.goto("http://localhost:5173/register");
        await page.locator('[placeholder="Nome"]').fill("User test2")
        await page.locator('[placeholder="Email"]').fill('user@gmail.com')
        await page.locator('[placeholder="Senha"]').fill("12345")
        await page.locator('button[type="submit"]').click();
        await expect(page.getByText("A senha precisa ter pelo menos 6 caracteres.")).toBeVisible();
    })
});
