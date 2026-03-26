import test, { expect } from '@playwright/test';
import { LoginPage } from '../../page/Loginpage';
import { HomePage } from '../../page/HomePage';

test.describe("Home page tests", () => {
    // Luư ý: vì test case này cần login thành công
    // nên mình sẽ viết code login vào trong beforeEach để đảm bảo tất cả test case đều được login trước khi thực hiện các bước tiếp theo
    test.beforeEach(async ({page}) => {
        // code login
        const loginPage = new LoginPage(page)
        await loginPage.login("Admin", "admin123")
        
        // Đợi đến khi trang home load thành công => dựa vào ULR có chứa dashboard
        await loginPage.isLoginSuccessfull()

        await page.waitForTimeout(3000) // tạm dừng 3 giây để đảm bảo trang home load xong

    })

    test("Verify sidebar menu names", async ({page}) => {
        const homePage = new HomePage(page)

        const menuNames = await homePage.getSidebarMenuNames()

        // Kiểm tra số lượng menu hiển thị
        await test.step("Verify number of menu", async () => {
            expect(menuNames.length).toBeGreaterThan(0) // ít nhất phải có 1 menu hiển thị
        })
        
        // kiểm tra menu Admin có tồn tại trong sidebar menu hay không
        await test.step("Verify Admin menu exists", async () => {
            expect(menuNames).toContain("Admin")
        })

    })

})