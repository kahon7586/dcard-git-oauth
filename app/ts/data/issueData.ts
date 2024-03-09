// ts for extract useful data from original data

// IssueDataList
// octokit.request("GET /repos/{owner}/{repo}/issues", {...})
export interface ResData {
  // from response
  title: string
  body?: string | null | undefined
  id: number
  state: string
  number: number // the issue number in issueList of specified repo
  user: UserDataOrNull
  [key: string]: unknown
}

export interface SimpIssueData {
  content: ContentData
  user: UserDataOrNull
}

export interface UserData {
  id: number
  avatar_url: string
  login: string
}

export type UserDataOrNull = UserData | null

export interface ContentData {
  id: number
  state: string
  title: string
  body: string | null | undefined
  number: number
}
