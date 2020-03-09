import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const [text, setText] = useState("");

  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      setAlert(" Please enter something..", "danger");
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form
        className="form"
        onSubmit={onSubmit}
        onReset={githubContext.clearUsers}
      >
        <input
          type="text"
          name="text"
          placeholder="Search User... "
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          t
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          {" "}
          Clear{" "}
        </button>
      )}
    </div>
  );
};

export default Search;
