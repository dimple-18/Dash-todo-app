import React from "react";
import { X } from "react-bootstrap-icons";

function ProjectForm({
  handleSubmit,
  heading,
  value,
  setValue,
  confirmButtonText,
  onClose,      
}) {
  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof onClose === "function") onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="ProjectForm">
      <div className="form-header">
        <h3>{heading}</h3>
        <button className="icon-btn" type="button" onClick={handleCancel} aria-label="Close">
          <X size="22" />
        </button>
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Project name"
        autoFocus
      />
      <div className="form-footer">
        <button className="btn-secondary" type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn-primary" type="submit" disabled={!value?.trim()}>
          {confirmButtonText}
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
