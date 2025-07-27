interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Callbike-client-app',
    description: `Callbike-client-app cho phép đặt xe, kết nối hành khách với tài xế. `,
    imgSrc: '/static/images/google.png',
    href: 'https://www.google.com',
  },
  {
    title: 'Callbike-serve-app',
    description: `Hệ thống Callbike-serve-app cho phép quản lý các tài xế, hành khách, xe và các chuyến đi.`,
    imgSrc: '/static/images/google.png',
    href: 'https://www.google.com',
  },
  {
    title: 'Scan_grabReceipt',
    description: `Đọc và trích xuất thông tin từ hình ảnh biên lai của Grab.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/doc-bien-lai-grab',
  },
]

export default projectsData
