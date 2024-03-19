// ts for extract useful data from original data

// IssueDataList
// octokit.request("GET /repos/{owner}/{repo}/issues", {...})
export interface ResIssueData {
  // from response
  title: string
  body?: string | null | undefined
  id: number
  state: string
  number: number // the issue number in issueList of specified repo
  user: UserData | null
  [key: string]: unknown
}

export interface SimpIssueData {
  content: IssueContentData
  user: UserData | null
}

export interface UserData {
  id: number
  avatar_url: string
  login: string
}

export interface IssueContentData {
  id: number
  state: string
  title: string
  body: string | null | undefined
  number: number
}
