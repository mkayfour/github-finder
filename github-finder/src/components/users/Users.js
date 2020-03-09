import React, { useContext, useEffect } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
  const githubContext = useContext(GithubContext);

  useEffect(
    () => {
      githubContext.clearUsers();
    },
    //eslint-disable-next-line
    []
  );

  const { loading, users } = githubContext;

  return (
    <div style={userStyle}>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        users.map(item => <UserItem key={item.id} user={item} />)
      )}
    </div>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

export default Users;
