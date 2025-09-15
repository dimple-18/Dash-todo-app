import React, { useContext, useState } from "react";
import Project from "./Project";
import AddNewProject from "./AddNewProject";
import { CaretUp, Palette, PencilFill } from "react-bootstrap-icons";
import { projectItems } from "../constants";
import { TodoContext } from "../context";

function Projects() {
  const [showMenu, setShowMenu] = useState(true);
  const [edit, setEdit] = useState(false);
  const pencilColor = edit ? "#1EC94C" : "#000000";

  //CONTEXT
  const { projects } = useContext(TodoContext)

  return (
    <div className="Projects">
      <div className="header">
        {/* LEFT SIDE → Title + List */}
        <div className="left">
          <div className="title">
            <Palette size="18" />
            <p>Projects</p>
          </div>
        </div>

        {/* RIGHT SIDE → Buttons */}
        <div className="btns">
          {showMenu && projectItems.length > 0 && (
            <span className="edit" onClick={() => setEdit((edit) => !edit)}>
              <PencilFill size="15" color={pencilColor} />
            </span>
          )}
          <AddNewProject />
          <span
            className="arrow"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <CaretUp
              size="20"
              style={{
                transform: showMenu ? "rotate(0deg)" : "rotate(180deg)",
                transition: "0.2s ease"
              }}
            />
          </span>
        </div>
      </div>

      {/* Project List */}
      {showMenu && (
        <div className="items">
          {projectItems.map((project) => (
            <Project
              project={project} // ✅ only one item
              key={project.id}
              edit={edit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
