import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function formatInlineArray(arr) {
  if (!Array.isArray(arr)) return arr
  return `[${arr.map((v) => `'${v}'`).join(', ')}]`
}

function fixFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const parsed = matter(raw)

  let front = parsed.data

  // fallback mặc định nếu thiếu
  const safe = {
    title: front.title || 'Untitled Post',
    date: front.date || new Date().toISOString(),
    tags: front.tags || [],
    draft: typeof front.draft === 'boolean' ? front.draft : false,
    authors: front.authors || ['ductruong'], // fallback luôn có author
    layout: front.layout || 'PostLayout',
    summary: front.summary || 'No summary available.',
    appendix: front.appendix || [],
  }

  // build frontmatter
  const yamlLines = []
  yamlLines.push(`title: '${safe.title}'`)
  yamlLines.push(`date: '${safe.date}'`)
  yamlLines.push(`tags: ${formatInlineArray(safe.tags)}`)
  yamlLines.push(`draft: ${safe.draft}`)
  yamlLines.push(`authors: ${formatInlineArray(safe.authors)}`)
  yamlLines.push(`layout: ${safe.layout}`)
  yamlLines.push(`summary: ${safe.summary}`)
  yamlLines.push(`appendix:`)
  safe.appendix.forEach((a) => {
    yamlLines.push(`  - title: '${a.title}'`)
    yamlLines.push(`    url: '${a.url}'`)
  })

  const fm = `---\n${yamlLines.join('\n')}\n---\n`
  const body = parsed.content.trimStart()

  fs.writeFileSync(filePath, fm + '\n' + body, 'utf8')
}

// chạy cho thư mục blog
const blogDir = 'data/blog'
fs.readdirSync(blogDir).forEach((file) => {
  if (file.endsWith('.mdx')) {
    fixFrontmatter(path.join(blogDir, file))
  }
})
