import React from "react";
import PropTypes from "prop-types";

const Alert = ({ alert }) => {
  return (
    <div>
      {alert !== null && (
        <div className={`alert alert-${alert.type}`}>
          {" "}
          <i className="fas fa-info-circle">{alert.msg}</i>{" "}
        </div>
      )}
    </div>
  );
};

Alert.propTypes = {};

export default Alert;