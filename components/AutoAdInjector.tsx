import { useMemo } from 'react'

export function AutoAdInjector({ htmlContent }) {
  const elements = useMemo(() => {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html')
    // Tự động chèn sau mỗi 3 đoạn văn
    const paragraphs = doc.querySelectorAll('p')
    paragraphs.forEach((p, index) => {
      if (index % 3 === 0 && index !== 0) {
        p.insertAdjacentHTML('afterend', '<AdSpot slot="AUTO_SLOT" />')
      }
    })
    return doc.body.innerHTML
  }, [htmlContent])

  return <div dangerouslySetInnerHTML={{ __html: elements }} />
}
