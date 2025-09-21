import React, { useState } from "react";
import Modal from "./Modal";
import ProjectForm from "./ProjectForm";
import { Plus } from "react-bootstrap-icons";
import { db } from "../firebase"; 
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

function AddNewProject() {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (projectName) {
      try {
        const projectsRef = collection(db, "projects");

        // check if project already exists
        const q = query(projectsRef, where("name", "==", projectName));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // add new project
          await addDoc(projectsRef, { name: projectName });
        } else {
          alert("Project already exists!");
        }

        // reset form
        setShowModal(false);
        setProjectName("");
      } catch (error) {
        console.error("Error adding project: ", error);
      }
    }
  }

  return (
    <div className="AddNewProject">
      <div className="add-button">
        <span onClick={() => setShowModal(true)}>
          <Plus size="20" />
        </span>
      </div>
       {showModal && ( 
      <Modal onClose={() => setShowModal(false)}> 
        <ProjectForm
          handleSubmit={handleSubmit}
          heading="New Project"
          value={projectName}
          setValue={setProjectName}
          setShowModal={setShowModal}
          confirmButtonText={"+ Add Project"}
          onClose={() => setShowModal(false)}
        />
      </Modal>
       )}
    </div>
  );
}

export default AddNewProject;
