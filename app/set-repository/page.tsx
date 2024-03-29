import React from "react";
import RepoSelector from "../components/client/RepoSelector";
import { setRepository } from "../lib/server/github/setRepository";

const page = () => {
  return (
    <div className="mx-auto">
      <RepoSelector setRepository={setRepository} />
    </div>
  );
};

export default page;
