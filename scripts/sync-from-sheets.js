import { google } from 'googleapis'

// Hàm lấy dữ liệu bài viết từ Google Sheets
async function syncGoogleSheets() {
  // Khởi tạo xác thực với Google Sheets API
  const auth = new google.auth.GoogleAuth({
    keyFile: './blog-revitapi-445829869691.json', // Đường dẫn đến tệp JSON credentials
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })
  const spreadsheetId = '18WSX_X50RAwEFnufY1PoC8lCxRioG3AQOmUWuqvUBMA' // Thay bằng ID của Google Sheet
  const range = 'Sheet1!A2:H' // Phạm vi dữ liệu (bỏ qua hàng tiêu đề, từ cột A đến H)

  try {
    // Gửi yêu cầu lấy dữ liệu
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    })

    const rows = response.data.values
    if (!rows || rows.length === 0) {
      console.log('Không tìm thấy dữ liệu trong Google Sheet.')
      return []
    }

    // Chuyển đổi dữ liệu thành định dạng bài viết
    const posts = rows.map((row) => ({
      title: row[1] || '', // Cột B: Title
      slug: row[2] || '', // Cột C: Slug
      summary: row[3] || '', // Cột D: Summary
      tags: row[4] ? row[4].split(',').map((tag) => tag.trim()) : [], // Cột E: Tags
      author: row[5] || 'Unknown Author', // Cột F: Author
      date: row[6] || new Date().toISOString().split('T')[0], // Cột G: Date, mặc định là hôm nay nếu trống
      lastMod: row[7] || row[6] || new Date().toISOString().split('T')[0], // Cột H: Last Mod, dùng Date nếu trống
      draft: false, // Giả định không có cột Draft, mặc định là false (đã xuất bản)
    }))
    console.log('Dữ liệu bài viết từ Google Sheets:', posts) // In dữ liệu để kiểm tra
    return posts
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu từ Google Sheets:', error.message)
    return []
  }
}

export default syncGoogleSheets
