import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class About extends Component {
  render() {
    return (
      <Fragment>
        <div className="card text-center">
          <h1> About this app </h1>
          <p>App to search Github users</p>
          <p>
            This will use Github API's to fetch latest data about the users.{" "}
          </p>
          <p>This will also return last 5 repos by create date. </p>
          <p>
            <strong> Version: 1.0</strong>{" "}
          </p>
          <p>
            <strong> Created by: </strong>{" "}
            <Link to="/user/mkayfour">
              {" "}
              <b>Mohit Kumar</b>
            </Link>
          </p>
        </div>
      </Fragment>
    );
  }
}

export default About;
