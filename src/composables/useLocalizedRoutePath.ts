import localizedRoutes from '@/data/localizedRoutes'
import type { SupportedLocale } from './useLocale'

export default function useLocalizedRoutePath(route: string, locale?: SupportedLocale) {
    if (!localizedRoutes[route]) {
        throw new Error(`[useLocalizedRoutePath] invalid route: ${route}`)
    }

    return locale ? localizedRoutes[route][locale] : localizedRoutes[route]
}
