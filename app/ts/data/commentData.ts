import { UserData } from "./issueData"

export interface ResCommentData {
  body?: string | null | undefined
  id: number
  user: UserData | null
  updated_at: string
  [key: string]: unknown
}

export interface CommentContentData {
  id: number
  body: string | null | undefined
  updated_at: string
  created_at: string
}

export interface SimpCommentData {
  content: CommentContentData
  user: UserData
}
