import { test, expect } from "@playwright/test";
test.describe("Cart", ()=>{

test("Deve adicionar produto ao carrinho", async ({ page }) => {

  await page.goto("http://localhost:5173/login");


  await page.getByPlaceholder("Email").fill("user@teste.com");
  await page.getByPlaceholder("Senha").fill("password123");
  await page.getByRole("button", { name: "Entrar" }).click();


  await expect(page).toHaveURL("http://localhost:5173/");


  const produto = page
    .getByRole("heading", { name: "Teclado Mecanico" })
    .locator("..");

  
  await produto.getByRole("button", {
    name: "Adicionar ao carrinho",
  }).click();


  await page.getByRole("link", { name: "Carrinho" }).click();


  await expect(
    page.getByText("Teclado Mecanico", { exact: true })
  ).toBeVisible();
});
test("Deve alterar a quantidade de um produto no carrinho", async ({ page }) => {

  await page.goto("http://localhost:5173/login");

  await page.getByPlaceholder("Email").fill("user@teste.com");
  await page.getByPlaceholder("Senha").fill("password123");
  await page.getByRole("button", { name: "Entrar" }).click();
 await expect(page).toHaveURL("http://localhost:5173/");

 
  const produto = page
    .getByRole("heading", { name: "Teclado Mecanico" })
    .locator("..");
await produto.getByRole("spinbutton").fill("3");
  
  await produto.getByRole("button", {
    name: "Adicionar ao carrinho",
  }).click();


  await page.getByRole("link", { name: "Carrinho" }).click();


  await expect(
    page.getByText("Teclado Mecanico", { exact: true })
  ).toBeVisible();
});
test("Deve remover um produto do carrinho", async ({ page }) => {
  // Acessa o login
  await page.goto("http://localhost:5173/login");

  await page.getByPlaceholder("Email").fill("user@teste.com");
  await page.getByPlaceholder("Senha").fill("password123");
  await page.getByRole("button", { name: "Entrar" }).click();
 await expect(page).toHaveURL("http://localhost:5173/");
 const produto = page
    .getByRole("heading", { name: "Teclado Mecanico" })
    .locator("..");


  await produto.getByRole("button", {
    name: "Adicionar ao carrinho",
  }).click();
   await page.getByRole("link", { name: "Carrinho" }).click();
   await page.getByRole("button", { name: "Remover" }).click();
  
}

)});
