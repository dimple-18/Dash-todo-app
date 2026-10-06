import React, { useContext, useState } from "react";
import Project from "./Project";
import AddNewProject from "./AddNewProject";
import { CaretUp, Palette, PencilFill } from "react-bootstrap-icons";
import { TodoContext } from "../context";

function Projects() {
  const [showMenu, setShowMenu] = useState(true);
  const [edit, setEdit] = useState(false);
  const pencilColor = edit ? "#1EC94C" : "currentColor";

  //CONTEXT
  const { projects } = useContext(TodoContext)

  return (
    <div className="Projects">
      <div className="header">
        <div className="title">
          <Palette size="16" />
          <p>Projects</p>
        </div>

        <div className="btns">
          {showMenu && projects.length > 0 && (
            <span className="edit" onClick={() => setEdit((edit) => !edit)}>
              <PencilFill size="13" color={pencilColor} />
            </span>
          )}
          <AddNewProject />
          <span
            className="arrow"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <CaretUp
              size="16"
              style={{
                transform: showMenu ? "rotate(0deg)" : "rotate(180deg)",
                transition: "0.2s ease"
              }}
            />
          </span>
        </div>
      </div>

      {showMenu && (
        <div className="items">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Project
                project={project}
                key={project.id}
                edit={edit}
              />
            ))
          ) : (
            <p className="empty">No projects yet. Click + to add one.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Projects;
