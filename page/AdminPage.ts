import { Locator, Page } from "@playwright/test";

export class AdminPage {
    readonly page: Page

    readonly userNameInput: Locator
    readonly userRoleSelect: Locator
    readonly adminRoleOption: Locator
    readonly searchButton: Locator

    readonly tableRows: Locator
    readonly loadingSpinner: Locator

    constructor(page: Page) {
        this.page = page
        this.userNameInput = page.locator("(//input[@class='oxd-input oxd-input--active'])[2]")
        this.userRoleSelect = page.locator("(//div[@class='oxd-select-text-input'])[1]")
        this.adminRoleOption = page.locator("//div[@role='listbox']//span[text()='Admin']")
        this.searchButton = page.locator("//button[@type='submit']")
        this.tableRows = page.locator("//div[@class='oxd-table-card']")
        this.loadingSpinner = page.locator("//div[@class='oxd-table-loader']")

    }

    async waitForLoadingSpinnerDisappear(): Promise<void> {
        const isVisible = await this.loadingSpinner.isVisible()
        if (isVisible) {
            await this.loadingSpinner.waitFor({ state: "hidden", timeout: 30000 }) // đợi loading spinner biến mất để đảm bảo dữ liệu đã được load thành công trên UI
        }
    }

    // hàm đếm số lượng row sau khi filter (của thằng tableRows)
    async countRows(): Promise<number> {
        return await this.tableRows.count()
    }

    async filterAdminUser(username: string): Promise<void> {
        await this.userNameInput.fill(username)
        await this.page.waitForTimeout(1000) // tạm dừng 1 giây để đảm bảo dữ liệu đã được điền vào input

    }

    async selectAdminRole(): Promise<void> {
        await this.userRoleSelect.click()
        await this.adminRoleOption.click()
        await this.page.waitForTimeout(1000) // tạm dừng 1 giây để đảm bảo dữ liệu đã được chọn 

    }

    async clickSearchButton(): Promise<void> {
        await this.searchButton.click()
        await this.page.waitForTimeout(2000) // tạm dừng 2 giây để đảm bảo dữ liệu đã được lọc và hiển thị trên UI

    }

    
    
}