import { redirect } from "next/navigation";

export async function toSetRepository() {
  redirect("/set-repository");
}

export async function toIssueList() {
  redirect("/issue-list");
}

export async function toIssue(number: number | string) {
  if (typeof number === "number") number = number.toString();

  redirect(`/issue-list/issue/${number}`);
}
