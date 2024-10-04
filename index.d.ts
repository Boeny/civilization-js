declare module "*.svg" {
    const content: string
    export default content
}

interface Window {
    showOpenFilePicker: (options?: {
        excludeAcceptAllOption?: boolean
        id?: string
        multiple?: boolean
        startIn?: FileSystemHandle | string
        types?: {description: string, accept: Record<string, string[]>}[]
    }) => Promise<FileSystemFileHandle[]>
}
