import { ContentData, ResData, SimpIssueData } from "@/app/ts/data/issueData"

export function extractIssueListData(data: ResData[] | undefined): SimpIssueData[] | null {
  if (data === undefined) return null

  // console.log(data)
  return data.map((issue) => {
    const { title, body, id, state, number, user } = issue

    const contentData: ContentData = {
      title,
      body,
      id,
      state,
      number,
    }

    return {
      content: contentData,
      user: user ? { id: user.id, login: user.login, avatar_url: user.avatar_url } : null,
    }
  })
}
