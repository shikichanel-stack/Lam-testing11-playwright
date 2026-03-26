import { Locator, Page } from "@playwright/test"
import { join } from "node:path";

export class MyInfoPage {
    readonly page: Page

    // locator
    readonly avatarWrapper: Locator
    readonly uploadBtn: Locator
    readonly fileInput: Locator 

    constructor(page: Page) {
        this.page = page
        this.avatarWrapper = page.locator("//div[@class='orangehrm-edit-employee-image-wrapper']")
        // this.uploadBtn = page.locator("//button[@class='oxd-icon-button oxd-icon-button--solid-main employee-image-action']")  // cách 1: locator theo class
        this.uploadBtn = page.locator("button.employee-image-action") // cách 2: locator theo class ngắn gọn hơn
        this.fileInput = page.locator("input[type='file']")

    }

    async uploadAvatar(): Promise<void> {
        // B1: click vào avatar để hiển thị button upload
        await this.avatarWrapper.waitFor({ state: "visible", timeout: 20000 }) // đợi avatar hiển thị thành công
        await this.avatarWrapper.click()

        // B2: click vào button upload để hiển thị file input
        await this.uploadBtn.waitFor({ state: "visible", timeout: 20000 }) // đợi button upload hiển thị thành công
        await this.uploadBtn.click()

        // B3: upload file ảnh thông qua file input
        const filePath = join(__dirname, "..", "test", "data", "testing11.jpg") // đường dẫn đến file ảnh cần upload
        await this.fileInput.setInputFiles(filePath) // setInputFiles: hàm của Playwright để upload file thông qua file input
        await this.page.waitForTimeout(5000) // đợi 5 giây để đảm bảo file được upload thành công


    }

}
