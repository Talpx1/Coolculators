import fs from 'fs'
import { routes } from '../src/composables/useLocalizedRoutePath.ts'

const SAVE_PATH = './public/sitemap.xml'
const PRODUCTION_URL = 'https://coolculators.com'

const xmlUrls = Object.keys(routes).map((routeName) => {
    const localizedRoutes = routes[routeName]

    let currentXmlUrlTag = ''

    Object.keys(localizedRoutes).forEach((locale) => {
        const currentUrl = [PRODUCTION_URL, locale, localizedRoutes[locale]]
            .filter((e) => e !== '')
            .join('/')

        currentXmlUrlTag = currentXmlUrlTag.concat(`
            <url>
                <loc>${currentUrl}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
                <xhtml:link
                    rel="alternate"
                    hreflang="${locale}"
                    href="${currentUrl}"
                />
        `)

        Object.keys(localizedRoutes)
            .filter((altLocale) => altLocale !== locale)
            .forEach((altLocale) => {
                const currentAltUrl = [PRODUCTION_URL, altLocale, localizedRoutes[altLocale]]
                    .filter((e) => e !== '')
                    .join('/')

                currentXmlUrlTag = currentXmlUrlTag.concat(`
                    <xhtml:link
                        rel="alternate"
                        hreflang="${altLocale}"
                        href="${currentAltUrl}"
                    />
                `)
            })

        currentXmlUrlTag = currentXmlUrlTag.concat(`</url>`)
    })
    return currentXmlUrlTag
})

const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
    xmlns:xhtml="http://www.w3.org/1999/xhtml" 
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>${xmlUrls.join('\n')}
</urlset>`

fs.writeFile(SAVE_PATH, sitemap, (err) => {
    if (err) throw err
    console.log('Sitemap Generated!')
})
