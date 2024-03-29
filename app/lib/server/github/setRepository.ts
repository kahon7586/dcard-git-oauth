import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setRepository(formData: FormData) {
  "use server";

  const owner = formData.get("owner") as string | null;
  const repo = formData.get("repo") as string | null;
  const cookieList = cookies();

  if (repo === null || owner === null) {
    clearRepository();
    return;
  }

  cookieList.set("owner", owner);
  cookieList.set("repo", repo);

  revalidatePath("/issue-list"); // WIP: split this
}

function clearRepository() {
  const cookieList = cookies();
  cookieList.delete("owner");
  cookieList.delete("repo");
}
