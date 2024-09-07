export default function useSlugify(string: string) {
    return string
        .normalize('NFKD')
        .replace(/'/g, ' ')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
}
