import test, { expect } from "@playwright/test"
import { LoginPage } from "../../page/Loginpage"
import { HomePage } from "../../page/HomePage"
import { MyInfoPage } from "../../page/Myinfopage"
import { highlightStep } from "./highlightStep"

test.describe("My Info Test", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.login("Admin", "admin123")

        await loginPage.isLoginSuccessfull()

        const homePage = new HomePage(page)

        // thêm step đợi locator sidebar menu hiển thị thành công sau khi click login không bị lỗi
        await homePage.sidebarMenuNames.first().waitFor()
        // click vào menu My Info để vào trang My Info -> click vào menu My Info để vào trang My Info
        await homePage.clickMenuMyInfoMenu()

    })

    test("TC1: Upload avatar successfully", async ({ page }) => {
        // B1: click vào avatar để hiển thị button upload
        // B2: click vào button upload để hiển thị file input
        // B3: upload file ảnh thông qua file input
        const myInfoPage = new MyInfoPage(page)

        await highlightStep(page, myInfoPage.avatarWrapper)
        await myInfoPage.uploadAvatar()

        // mặc định là true
        await highlightStep(page, myInfoPage.fileInput)
        const uploadFileCount = await myInfoPage.fileInput.evaluate((el) => {
            // input ở đây chính là fileInput trong MyInfoPage
            // vì hàm evaluate sẽ trả về fileInput element từ DOM của page
            // nên mình có thể truy cập vào thuộc tính files của input để kiểm tra đã upload file thành công hay chưa
            const input = el as HTMLInputElement
            return input.files ? input.files.length : 0
        })
        expect(uploadFileCount).toBeGreaterThan(0)
        // expect(true).toBeTruthy()
        


    })

})