import React, { useContext } from "react";
import RepoItem from "./RepoItem";
import GithubContext from "../../context/github/githubContext";

export default function Repos() {
  const githubContext = useContext(GithubContext);

  return githubContext.repos.map(repo => (
    <RepoItem repo={repo} key={repo.id} />
  ));
}
