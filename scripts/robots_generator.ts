import fs from 'fs'

const SAVE_PATH = './public/robots.txt'
const PRODUCTION_URL = 'https://coolculators.com'
const SITEMAP_URL = `${PRODUCTION_URL}/sitemap.xml`

const content = `
User-agent: *
Allow: /

Sitemap: ${SITEMAP_URL}
`

fs.writeFile(SAVE_PATH, content, (err) => {
    if (err) throw err
    console.log('robots.txt generated!')
})
