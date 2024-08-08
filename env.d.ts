/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FALLBACK_LOCALE: string
    readonly VITE_DEFAULT_LOCALE: string
    readonly VITE_APP_TITLE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
