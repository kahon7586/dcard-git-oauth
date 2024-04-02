import React from "react";
import RepoSelector from "../_components/client/RepoSelector";
import { setRepository } from "../_lib/server/github/setRepository";

const page = async () => {
  async function setRepoAction(formData: FormData) {
    "use server";
    await setRepository(formData);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <RepoSelector setRepository={setRepoAction} />
    </div>
  );
};

export default page;
