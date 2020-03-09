import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alert } = alertContext;

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

export default Alert;
