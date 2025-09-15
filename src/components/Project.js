import React, { useContext, useState } from "react";
import { Pencil, XCircle } from "react-bootstrap-icons";
import RenameProject from "./RenameProject";
import Modal from "./Modal";
import { TodoContext } from "../context";
import { db } from "../firebase";
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

function Project({ project, edit }) {
  // CONTEXT
  const { defaultProject, selectedProject, setSelectedProject } =
    useContext(TodoContext);

  // STATE
  const [showModal, setShowModal] = useState(false);

  const deleteProject = async (project) => {
    try {
      // 1. Project delete karo
      await deleteDoc(doc(db, "projects", project.id));

      // 2. Us project ke todos delete karo
      const q = query(
        collection(db, "todos"),
        where("projectName", "==", project.name)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (docSnap) => {
        await deleteDoc(docSnap.ref);
      });

      // 3. Agar selectedProject wahi tha jo delete hua, to default set kar do
      if (selectedProject === project.name) {
        setSelectedProject(defaultProject);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="Project">
      <div className="name" onClick={() => setSelectedProject(project.name)}>
        {project.name}
      </div>
      <div className="btns">
        {edit ? (
          <div className="edit-delete">
            <span className="edit" onClick={() => setShowModal(true)}>
              <Pencil size="13" />
            </span>
            <span className="delete" onClick={() => deleteProject(project)}>
              <XCircle size="13" />
            </span>
          </div>
        ) : project.numOfTodos === 0 ? (
          ""
        ) : (
          <div className="total-todos">{project.numOfTodos}</div>
        )}
      </div>

        {showModal && ( 
      <Modal onClose={() => setShowModal(false)}>
        <RenameProject project={project} setShowModal={setShowModal} />
      </Modal>
        )}
    </div>
  );
}

export default Project;
