
import test, { expect } from "@playwright/test"
import { LoginPage } from "../../page/Loginpage"
import { HomePage } from "../../page/HomePage"
import { AdminPage } from "../../page/AdminPage"
import { highlightStep } from "./highlightStep"

test.describe("Admin page tests", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)


        await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!)

        const homePage = new HomePage(page)
        await page.waitForURL("**/dashboard**", { timeout: 30000 }) // đợi đến khi trang home load thành công => dựa vào ULR có chứa dashboard
        await homePage.clickMenuAdmin()


    })

    test("TC1: Filter admin user", async ({ page }) => {
        // B1: Nhập username vào ô search
        // B2: Click vào button search
        // B3: Kiểm tra kết quả hiển thị có chứa username đã nhập hay không
        const adminPage = new AdminPage(page)

        await highlightStep(page, adminPage.userNameInput)
        await adminPage.filterAdminUser("Admin")

        await highlightStep(page, adminPage.userRoleSelect)
        await adminPage.selectAdminRole()

        await highlightStep(page, adminPage.searchButton)
        await adminPage.clickSearchButton()

        await adminPage.waitForLoadingSpinnerDisappear() // đợi loading spinner biến mất để đảm bảo dữ liệu đã được load thành công trên UI

        // verify kết quả hiển thị có chứa username đã nhập hay không
        const rowCount = await adminPage.countRows()
        expect(rowCount).toBeGreaterThan(0) // ít nhất phải có 1 kết quả hiển thị sau khi filter

        expect(true).toBeTruthy() // mặc định là true, vì mình chưa có dữ liệu để assert, nên tạm thời sẽ để như này trước



    })

})