import useLocalizedRoutePath from './useLocalizedRoutePath'
import { i18n, type SupportedLocale } from './useLocale'
import type { RouteLocationPathRaw } from 'vue-router'

export default function useLocalizedRoute(
    routeName: string,
    options?: Omit<RouteLocationPathRaw, 'path'> & { forceLocale: SupportedLocale }
): RouteLocationPathRaw {
    const locale = options?.forceLocale ?? (i18n.global.locale.value as SupportedLocale)

    return {
        ...options,
        path: `/${locale}/${useLocalizedRoutePath(routeName, locale)}`
    }
}
