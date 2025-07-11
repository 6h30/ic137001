const { updateGoogleSheets } = require('./sync-from-sheets');

const newPost = {
  title: 'Bài viết mới',
  slug: 'new-post',
  summary: 'Tóm tắt bài viết mới...',
  tags: ['tech', 'blog'],
  author: 'Nguyễn Văn A',
  date: '2025-07-12',
  lastMod: '2025-07-12',
};

updateGoogleSheets(newPost).then(() => console.log('Hoàn tất'));