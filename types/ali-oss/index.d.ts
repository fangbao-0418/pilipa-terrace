
declare module 'ali-oss' {
  export interface ConfigProps {
    accessKeyId: string
    accessKeySecret: string
    stsToken?: string
    bucket?: string
    endpoint?: string
    region?: string
    internal?: boolean
    secure?: boolean
    timeout?: boolean
  }
  export interface CheckPoint {
    file: File
    name: string
    fileSize: number
    partSize: number
    uploadId: string
    doneParts: Array<{number: number, etag: string}>
  }
  export interface Client {
    multipartUpload: <T, S>(name: string, file: string | File, options?: T) => S
    cancel: <T>() => T
    abortMultipartUpload: <T>(name: string, uploadId: string) => T
    delete: <T>(name: string) => T
    deleteMulti: (names: string[]) => void
    completeMultipartUpload: <T>(name: string, uploadId: string, parts: Array<{number: number, etag: string}>) => T
    get: <T>(name: string) => T
    put: <T, S>(name: string, file: string | File, options?: T) => S
  }
  export function Wrapper (configs: ConfigProps): Client
  export default function client (configs: ConfigProps): Client
}
