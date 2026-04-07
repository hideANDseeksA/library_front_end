// resource.ts

export interface Resource {
  id:    string
  title: string

  author:         string
  category?:      string | null
  category_name?: string | null

  isbn:             string | null
  copies_total:     number | null
  copies_available: number

  abstract:  string
  keywords:  string[]

  type?:      string | null   // digital resources only
  year?:      string | null   // published year (from details)
  call_number?: string | null // physical books only

  publisher?: string | null

  imageUrl: string | null

  timesBorrowed?: number
  uploadedBy?:    string | null
}