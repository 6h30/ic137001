interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  // {
  //   title: 'Callbike-client-app',
  //   description: `Callbike-client-app cho phép đặt xe, kết nối hành khách với tài xế. `,
  //   imgSrc: '/static/images/google.png',
  //   href: 'https://www.google.com',
  // },
  // {
  //   title: 'Callbike-serve-app',
  //   description: `Hệ thống Callbike-serve-app cho phép quản lý các tài xế, hành khách, xe và các chuyến đi.`,
  //   imgSrc: '/static/images/google.png',
  //   href: 'https://www.google.com',
  // },
  // {
  //   title: 'Scan_grabReceipt',
  //   description: `Đọc và trích xuất thông tin từ hình ảnh biên lai của Grab.`,
  //   imgSrc: '/static/images/time-machine.jpg',
  //   href: '/unlock',
  // },
  {
    title: 'BIMleak.dev - blog',
    description: `Blog cung cấp thông tin mới nhất, hướng dẫn thực tiễn và tài nguyên hữu ích, giúp bạn tối ưu hóa quy trình thiết kế và xây dựng thông minh.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/unlock',
  },
  {
    title: 'Phác thảo giao diện BIMleak.dev - blog',
    description: `Phát triển ý tưởng, phác thảo giao diện cho các giao diện, workflow, low-wireframe cho blog.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/unlock',
  },
  {
    title: 'Phát triển giao diện BIMleak.dev - blog',
    description: `Phát triển giao diện cho các trang hiển thị.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/unlock',
  },
  {
    title: 'Tối ưu giao diện BIMleak.dev - blog',
    description: `Tối ưu giao diện, responsive cho các thiết bị.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/unlock',
  },
  {
    title: 'Thiết lập "cms" tùy biến cho các bài viết.',
    description: `Phát triển mã cho phép quản lý dữ liệu - 'CRUD' bài viết.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/unlock',
  },
  {
    title: 'Thiết lập tính năng bình luận cho các bài viết.',
    description: `Phát triển tính năng bình luận cho mỗi bài viết trên blog.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/unlock',
  },
  {
    title: 'Thiết lập tính năng lọc theo thời gian, chủ đề cho các bài viết.',
    description: `Phát triển bộ lọc theo thời gian, chủ đề cho tất cả bài viết.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/unlock',
  },
  {
    title: 'Thiết lập tính năng tìm kiếm bài viết theo từ khóa, tên bài viết.',
    description: `Phát triển tính năng tìm kiếm bài viết trong tất cả bài viết theo tên bài viết và từ khóa xuất hiện trong bài viết.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/unlock',
  },
  {
    title: 'Thiết lập điều hướng cho BIMleak.dev - blog',
    description: `Phát triển điều hướng cho các trang hiển thị.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/unlock',
  },
  {
    title: 'Triển khai thử nghiệm local và kiểm thử.',
    description: `Thiết lập thử nghiệm trong môi trường local và kiểm thử giao diện, tính năng.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/unlock',
  },
  {
    title: 'Triển khai thử nghiệm lên host',
    description: `Thiết lập và thử nghiệm lên môi trường internet.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/unlock',
  },
  {
    title: 'Thiết lập tên miền và triển khai production.',
    description: `Tích hợp tên miền và triển khai BIMleak.dev lên internet.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/unlock',
  },
  {
    title: 'Thiết lập các hệ thống phân tích số liệu, đánh giá tình trạng.',
    description: `Thiết lập các hệ thống phân tích số liệu truy cập, đánh giá tình trạng tìm kiếm và hiển thị trên dữ liệu tìm kiếm của google.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/unlock',
  },
]

export default projectsData
