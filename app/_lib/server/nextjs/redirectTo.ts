import { redirect } from "next/navigation";

export function toSetRepository() {
  redirect("/set-repository");
}

export function toIssueList() {
  redirect("/issue-list");
}

export function toIssue(number: number | string) {
  if (typeof number === "number") number = number.toString();

  redirect(`/issue-list/issue/${number}`);
}
