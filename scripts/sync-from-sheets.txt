const { google } = require('googleapis');

async function syncGoogleSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: './blog-revitapi-445829869691.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '18WSX_X50RAwEFnufY1PoC8lCxRioG3AQOmUWuqvUBMA';
  const range = 'Sheet1!A2:H';

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log('Không tìm thấy dữ liệu trong Google Sheet.');
      return [];
    }

    const posts = rows.map((row) => ({
      title: row[1] || '',
      slug: row[2] || '',
      summary: row[3] || '',
      tags: row[4] ? row[4].split(',').map((tag) => tag.trim()) : [],
      author: row[5] || 'Unknown Author',
      date: row[6] || new Date().toISOString().split('T')[0],
      lastMod: row[7] || row[6] || new Date().toISOString().split('T')[0],
      draft: false,
    }));

    console.log('Dữ liệu bài viết từ Google Sheets:', posts);
    return posts;
  } catch (error) {
    console.error('Lỗi chi tiết:', error);
    return [];
  }
}

async function updateGoogleSheets(post) {
  const auth = new google.auth.GoogleAuth({
    keyFile: './blog-revitapi-445829869691.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '18WSX_X50RAwEFnufY1PoC8lCxRioG3AQOmUWuqvUBMA';
  const range = 'Sheet1!A2:H';

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:A',
    });
    const stt = response.data.values ? response.data.values.length : 0;

    const newRow = [
      stt + 1,
      post.title || '',
      post.slug || '',
      post.summary || '',
      post.tags ? post.tags.join(', ') : '',
      post.author || 'Unknown Author',
      post.date || new Date().toISOString().split('T')[0],
      post.lastMod || new Date().toISOString().split('T')[0],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values: [newRow],
      },
    });
    console.log('Đã thêm bài viết vào Google Sheets:', post.title);
  } catch (error) {
    console.error('Lỗi khi cập nhật Google Sheets:', error.message);
  }
}

module.exports = { syncGoogleSheets, updateGoogleSheets };