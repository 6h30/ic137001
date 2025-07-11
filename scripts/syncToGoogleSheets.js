const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(process.cwd(), 'data', 'blog');

async function readBlogPosts() {
  try {
    const files = await fs.readdir(blogDir);
    console.log('Danh sách tệp trong data/blog:', files); // Debug: In danh sách tệp
    const posts = [];

    for (const file of files) {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const filePath = path.join(blogDir, file);
        const stats = await fs.stat(filePath);
        if (stats.isFile()) {
          const content = await fs.readFile(filePath, 'utf-8');
          const { data } = matter(content);
          console.log(`Frontmatter của ${file}:`, data); // Debug: In frontmatter

          posts.push({
            title: data.title || '',
            slug: data.slug || file.replace(/\.mdx?$/, ''),
            summary: data.summary || '',
            tags: Array.isArray(data.tags) ? data.tags : [],
            author: data.author || 'Unknown Author',
            date: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            lastMod: data.lastMod ? new Date(data.lastMod).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          });
        }
      }
    }

    console.log('Bài viết từ thư mục blog:', posts);
    return posts;
  } catch (error) {
    console.error('Lỗi khi đọc thư mục blog:', error.message);
    return [];
  }
}

async function syncToGoogleSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: './blog-revitapi-445829869691.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '18WSX_X50RAwEFnufY1PoC8lCxRioG3AQOmUWuqvUBMA';
  const range = 'Sheet1!A2:H';

  try {
    const posts = await readBlogPosts();
    if (posts.length === 0) {
      console.log('Không có bài viết nào để đồng bộ.');
      return;
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:A',
    });
    let stt = response.data.values ? response.data.values.length : 0;
    console.log('Số hàng hiện tại (Stt):', stt); // Debug: In số hàng

    const values = posts.map((post) => [
      ++stt,
      post.title,
      post.slug,
      post.summary,
      post.tags.join(', '),
      post.author,
      post.date,
      post.lastMod,
    ]);
    console.log('Dữ liệu chuẩn bị ghi:', values); // Debug: In dữ liệu

    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: 'Sheet1!A2:H',
    });
    console.log('Đã xóa dữ liệu cũ từ Sheet1!A2:H'); // Debug

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A2:H',
      valueInputOption: 'RAW',
      resource: {
        values,
      },
    });

    console.log('Đã đồng bộ', posts.length, 'bài viết lên Google Sheets.');
  } catch (error) {
    console.error('Lỗi chi tiết:', error);
  }
}

module.exports = syncToGoogleSheets;