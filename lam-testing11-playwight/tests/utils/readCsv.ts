

// username: Admin, password: admin123

import path from "node:path";
import fs from "fs";
// key - value
export type CsvRow = Record<string, string>;

export const readCsv = (relativeFilePath: string): CsvRow[] => {
    // B1:
    // convert relative file path -> absolute file path
    // __dirname: đường dẫn tuyệt đối đến thư mục chứa file readCsv.ts
    // VD: Mac: /Users/lam/Desktop/......../lam-testing11-playwight/tests/utils/readCsv.ts
    const absoluteFilePath = path.resolve(__dirname, "..", relativeFilePath)

    // B2: dựa vào path absolutePath -> đọc file
    const raw = fs.readFileSync(absoluteFilePath, "utf-8")

    // B3: bỏ header không đọc, đọc từ line 2 trở đi
    const dataLines = raw.slice(1)
    const rows: CsvRow[] = []

    for (const line of dataLines) {
        // tách thành cặp key - value
        // VD: Admin,admin123,success
        // ["Admin","admin123","success"] -> split(",")
        // trim(): loại bỏ khoảng trắng thừa
        const cell = line.split(",").map((c: string) => c.trim()) // loại bỏ khoảng trắng thừa

        //  tạo data dạng CsvRow
        const row: CsvRow = {
            username: cell[0],
            password: cell[1],
            expected: cell[2]
        }
        console.log(`Data: ${row}`)

        //  add row vào mảng rows => push: thêm phần tử vào cuối mảng
        rows.push(row)
    }

    return rows

}