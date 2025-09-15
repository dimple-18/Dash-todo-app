import React, { useContext, useState } from "react";
import ProjectForm from "./ProjectForm";
import { TodoContext } from "../context";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function RenameProject({ project, setShowModal }) {
  const [newProjectName, setNewProjectName] = useState(project.name);

  const { selectedProject, setSelectedProject } = useContext(TodoContext);

  const renameProject = async (project, newProjectName) => {
    try {
      const projectsRef = collection(db, "projects");
      const todosRef = collection(db, "todos");

      const oldProjectName = project.name;

      // 1. Check if new project name already exists
      const q = query(projectsRef, where("name", "==", newProjectName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Project with the same name already exists");
        return;
      }

      // 2. Update project name in Firestore
      const projectDocRef = doc(db, "projects", project.id);
      await updateDoc(projectDocRef, { name: newProjectName });
      console.log("✅ Project renamed:", oldProjectName, "➡", newProjectName);

      // 3. Update todos linked to this project
      const todosQuery = query(
        todosRef,
        where("projectName", "==", oldProjectName)
      );
      const todosSnapshot = await getDocs(todosQuery);

      for (const docSnap of todosSnapshot.docs) {
        await updateDoc(docSnap.ref, { projectName: newProjectName });
      }

      // 4. If the renamed project was selected, update context
      if (selectedProject === oldProjectName) {
        setSelectedProject(newProjectName);
      }
    } catch (error) {
      console.error("❌ Error renaming project:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await renameProject(project, newProjectName); // ✅ wait for update
    setShowModal(false);
  };

  return (
    <div className="RenameProject">
      <ProjectForm
        handleSubmit={handleSubmit}
        heading="Edit Project Name"
        value={newProjectName}
        setValue={setNewProjectName}
        setShowModal={setShowModal}
        confirmButtonText={"Confirm"}
      />
    </div>
  );
}

export default RenameProject;
