import test, { expect } from '@playwright/test'
import path from 'node:path'
import fs from 'node:fs'

test.describe("Get By Role Test", () => {
    test("TC1: demo get by role", async ({ page }) => {
        // B1: Đọc file html có chứa các element cần thao tác
        // Đường dẫn đến file html
        const htmlPath = path.join(__dirname, "fixtures", "getbyrole-demo.html")
        // Đọc file html và load vào page của Playwright
        const htmlContent = fs.readFileSync(htmlPath, "utf-8")
        await page.setContent(htmlContent)

        // getbyrole có 2 params
        // - param 1: role của element cần lấy: button, heading, link, textbox, checkbox, radio, ...
        // - param 2: thêm các option để xác định chính xác các element cần lấy, vì có thể có nhiều element cùng role trên 1 page
        //  name: text hiển thị trên các element (text hiển thị, aria-label, placeholder, title, ..) có chứa text này sẽ được lấy
        // level: chỉ áp dụng cho role heading, để xác định heading nào (h1, h2, h3, ...)
        //  exact: true/false, mặc định là false, nếu true thì sẽ lấy chính xác element có text trùng khớp với name, nếu false thì sẽ lấy element có text chứa name

        // heading: h1, h2, h3, ...
        const heading1 = page.getByRole("heading", { name: "Test getByRole - Playwright Demo", level: 1, exact: true })

        await expect(heading1).toBeVisible()

        const heading2 = page.getByRole("heading", {
            name: "Heading level 2",
            level: 2,
            exact: true

        })

        // await expect(heading2).toBeVisible()

        // <a href="#home" aria-label="Trang chủ">Home</a>
        const homeLink = page.getByRole("link", {name: "Trang chủ"})
        await expect(homeLink).toBeVisible()

        const form = page.getByRole("form")
        await expect(form).toBeVisible()

        // input: text, email, password, ... => role: textbox
        const usernameInput = page.getByRole("textbox", {name: "Username input field"})
        await expect(usernameInput).toBeVisible()

        // <textarea id="message" placeholder="Enter your message here" aria-label="Message input field"></textarea>
        const messageInput = page.getByRole("textbox", {name: "Message textarea"})
        await expect(messageInput).toBeVisible()

        // // checkbox
        // // <label><input type="checkbox" id="agree" name="agree" aria-label="Agree to terms checkbox">Tôi đồng ý với điều khoản</label>
        // const agreeCheckbox = page.getByRole("checkbox", {name: "Agree to terms checkbox"})
        // await agreeCheckbox.check()
        // await page.waitForTimeout(3000)
        // await expect(agreeCheckbox).toBeChecked()

        // // <label><input type="radio" id="male" name="gender" value="male" aria-label="Male gender option">Nam</label>
        // const maleRadio = page.getByRole("radio", {name: "Male gender option"})
        // // await maleRadio.check()
        // await page.waitForTimeout(3000)
        // await expect(maleRadio).toBeChecked()

        // // <label><input type="radio" id="female" name="gender" value="female" aria-label="Female gender option">Nữ</label>
        // const femaleRadio = page.getByRole("radio", {name: "Female gender option"})
        // await femaleRadio.check()
        // await expect(femaleRadio).toBeChecked()

        // <select id="country" name="country" aria-label="Country selection">
        //             <option value="">-- Select --</option>
        //             <option value="vn">Vietnam</option>
        //             <option value="us">United States</option>
        //             <option value="uk">United Kingdom</option>
        //         </select>

        const countrySelect = page.getByRole("combobox", {name: "Country selection"})
        await countrySelect.selectOption("vn")
        await expect(countrySelect).toHaveValue("vn")

        // <button type="submit" aria-label="Submit form button">Submit</button>
        // <button type="button" aria-label="Cancel button">Cancel</button>
        // <button type="button" aria-label="Delete button">Delete</button>

        const submitBtn = page.getByRole("button", {name: "Submit form button"})
        await expect(submitBtn).toBeVisible()

        // table
        const table = page.getByRole("table")
        const rows = page.getByRole("row")
        await expect(rows).toHaveCount(4) // 1 row header + 3 row data
       


    })
})