import React from "react";
import { InfoCircle } from "react-bootstrap-icons";
import { isFirebaseConfigured } from "../firebase";

function Sidebar({ children }) {
  return (
    <div className="Sidebar">
      {children}
      {!isFirebaseConfigured && (
        <div className="sidebar-footer">
          <InfoCircle size="14" />
          <p>
            Showing sample data. Add your Firebase config to save tasks.
          </p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
