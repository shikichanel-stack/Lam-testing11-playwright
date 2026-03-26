import { Locator, Page } from "@playwright/test"

export class HomePage {
    readonly page: Page

    // locator
    readonly sidebarMenuNames: Locator
    readonly myInfoMenu: Locator
    readonly adminMenu: Locator

    constructor(page: Page) {
        this.page = page
        this.sidebarMenuNames = page.locator("//span[@class='oxd-text oxd-text--span oxd-main-menu-item--name']")
        this.myInfoMenu = page.locator("//span[text()='My Info']")
        this.adminMenu = page.locator("//span[text()='Admin']")
    }

    async clickMenuMyInfoMenu(): Promise<void> {
        await this.sidebarMenuNames.first().waitFor({timeout: 30000}) // đợi đến khi sidebar menu hiển thị thành công để tránh lỗi khi click vào menu My Info
        await this.myInfoMenu.click()
    }

    async clickMenuAdmin(): Promise<void> {
        await this.sidebarMenuNames.first().waitFor({timeout: 30000}) // đợi đến khi sidebar menu hiển thị thành công để tránh lỗi khi click vào menu Admin
        await this.adminMenu.click()
    }

    // get list sidebar menu names
    async getSidebarMenuNames(): Promise<string[]> {
        const count = await this.sidebarMenuNames.count()

        // Vì object locator chứa nhiều attribute, hàm mà mình chỉ cần lấy text của locator
        // => tạo 1 mảng chỉ chứa string text của locator

        const menuNames: string[] = []
        for (let i = 0; i < count; i++) {
            const name = await this.sidebarMenuNames.nth(i).textContent()
            // Lưu Ý: textContent() có thể trả về null nếu không lấy được text => cần xử lý trường hợp này
            // TypeScript: bắt mình xử lý trường hợp null
            if(name) {
                menuNames.push(name.trim()) // trim(): loại bỏ khoảng trắng thừa
            } 
        }
        return menuNames

    }

}