import { google } from 'googleapis'
import slugger from 'github-slugger'
import credentials from '../blog-revitapi-445829869691.json' assert { type: 'json' }

// Cấu hình Google Sheets API
const spreadsheetId = '18WSX_X50RAwEFnufY1PoC8lCxRioG3AQOmUWuqvUBMA'
const sheetName = 'Sheet1'

// Xác thực Google Sheets API
async function authenticateGoogleSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

// Tải allBlogs từ contentlayer
async function loadAllBlogs() {
  try {
    const module = await import('../.contentlayer/generated/index.mjs')
    return module.allBlogs
  } catch (error) {
    console.error('Error loading allBlogs:', error)
    return []
  }
}

// Chuẩn bị dữ liệu
function prepareBlogData(posts) {
  return posts
    .filter((post) => post.draft !== true)
    .map((post, index) => ({
      STT: index + 1,
      Title: post.title || '',
      Slug: post.slug || '',
      Summary: post.summary || '',
      Tags: post.tags ? post.tags.join(', ') : '',
      Author: post.author || 'Unknown',
      Date: post.date ? new Date(post.date).toISOString().split('T')[0] : '',
      'Last Modified': post.lastmod ? new Date(post.lastmod).toISOString().split('T')[0] : '',
      _id: post._id || '',
      filePath: post.filePath || '',
      path: post.path || '',
      'Reading Time': post.readingTime?.text || '',
      Authors: post.authors ? post.authors.join(', ') : '',
      'Canonical URL': post.canonicalUrl || '',
    }));
}

// Cập nhật Google Sheet
async function updateGoogleSheet() {
  try {
    const allBlogs = await loadAllBlogs()
    if (!allBlogs || !Array.isArray(allBlogs)) {
      throw new Error('Invalid or missing blog data')
    }

    const sheets = await authenticateGoogleSheets()
    const blogData = prepareBlogData(allBlogs)

    const headers = [
      'STT',
      'Title',
      'Slug',
      'Summary',
      'Tags',
      'Author',
      'Date',
      'Last Modified',
      '_id',
      'filePath',
      'path',
      'Reading Time',
      'Authors',
      'Canonical URL',
    ]

    const values = [headers, ...blogData.map((post) => headers.map((header) => post[header]))]

    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: `${sheetName}!A1:Z`,
    })

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      resource: { values },
    })

    console.log('✅ Google Sheet updated successfully!')
  } catch (error) {
    console.error('❌ Error updating Google Sheet:', error)
  }
}

// Gọi hàm chính
updateGoogleSheet()
