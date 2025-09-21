import React from "react";

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
      <h3>{heading}</h3>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="project name . . ."
        autoFocus
      />
      <button className="cancel" type="button" onClick={handleCancel}>
        cancel
      </button>
      <button className="confirm" type="submit" disabled={!value?.trim()}>
        {confirmButtonText}
      </button>
    </form>
  );
}

export default ProjectForm;
