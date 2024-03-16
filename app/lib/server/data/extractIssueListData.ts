import { ContentData, ResData, SimpIssueData } from "@/app/ts/data/issueData"

export function extractIssueListData(data: ResData[]) {
  if (data.length === 0) return null

  return data.map((issue) => {
    const { title, body, id, state, number, user } = issue

    const contentData: ContentData = {
      title,
      body,
      id,
      state,
      number,
    }

    const extractedData: SimpIssueData = {
      content: contentData,
      user: user ? { id: user.id, login: user.login, avatar_url: user.avatar_url } : null,
    }

    return extractedData
  })
}
