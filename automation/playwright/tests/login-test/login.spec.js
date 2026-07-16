import { test, expect } from "@playwright/test";
test.describe("Login", () => {
  test("Deve logar com credenciais válidas", async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    await page.locator('[placeholder="Email"]').fill("user@teste.com");
    await page.locator('[placeholder="Senha"]').fill("password123");
    await page.locator('[type="submit"]').click();

  });

  test("Deve exibir um erro ao tentar login com senha inválida", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/login");
    await page.locator('[placeholder="Email"]').fill("user@example.com");
    await page.locator('[placeholder="Senha"]').fill("passoword12");
    await page.locator('[type="submit"]').click();
    await expect(page.getByText("E-mail ou senha inválidos.")).toBeVisible();
  });
 
  test("Deve exibir erro ao tentar login com email inválido", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.getByPlaceholder("Email").fill("user@random.com");
  await page.getByPlaceholder("Senha").fill("password123");
  await page.getByRole("button", { name: "Entrar" }).click();


  await expect(page.locator(".error")).toHaveText(
    "E-mail ou senha inválidos."
  );
});

  test("Deve exibir um erro ao tentar login com campos vazios", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/login");
    await page.locator('[type="submit"]').click();
    await expect(page.getByText("E-mail é obrigatório.")).toBeVisible();
    await expect(page.getByText("Senha é obrigatória.")).toBeVisible();
  });
  
test("Logout", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.getByPlaceholder("Email").fill("user@teste.com");
  await page.getByPlaceholder("Senha").fill("password123");
  await page.getByRole("button", { name: "Entrar" }).click();



  const botaoSair = page.getByRole("button", { name: "Sair" });
  await expect(botaoSair).toBeVisible();
  await botaoSair.click();

  
});
  });
