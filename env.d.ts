/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FALLBACK_LOCALE: string
    readonly VITE_DEFAULT_LOCALE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
