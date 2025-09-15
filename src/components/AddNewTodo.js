import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { TodoContext } from "../context";
import TodoForm from "./TodoForm";
import randomcolor from "randomcolor";
import moment from "moment";
import dayjs from "dayjs"; 

// Firestore
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function AddNewTodo() {
  // CONTEXT
  const { projects, selectedProject } = useContext(TodoContext);

  // STATE
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState(dayjs());  
  const [time, setTime] = useState(dayjs()); 
  const [todoProject, setTodoProject] = useState(selectedProject);

  // SUBMIT HANDLER
  async function handleSubmit(e) {
    e.preventDefault();

    if (!text) {
      alert("Please enter a todo.");
      return;
    }

    try {
      await addDoc(collection(db, "todos"), {
        text,
        date: moment(day?.toDate?.() || new Date()).format("MM/DD/YYYY"), // ✅ convert safely
        day: moment(day?.toDate?.() || new Date()).format("d"),
        time: moment(time?.toDate?.() || new Date()).format("hh:mm A"),
        checked: false,
        color: randomcolor(),
        projectName: todoProject || "inbox", // fallback if none selected
        createdAt: new Date(), 
      });

      // reset form after adding
      setShowModal(false);
      setText("");
      setDay(dayjs()); 
      setTime(dayjs()); 
    } catch (error) {
      console.error("Error adding todo: ", error);
      alert("Failed to add todo. Check console for details.");
    }
  }

  // KEEP PROJECT IN SYNC
  useEffect(() => {
    setTodoProject(selectedProject);
  }, [selectedProject]);

  return (
    <div className="AddNewTodo">
      <div className="btn">
        <button onClick={() => setShowModal(true)}>+ New Todo</button>
      </div>

      {showModal && ( 
      <Modal onClose={() => setShowModal(false)}>
        <TodoForm
          handleSubmit={handleSubmit}
          heading="Add new to do!"
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
          projects={projects}
          showButtons={true}
          setShowModal={setShowModal}
        />
      </Modal>
    )}
    </div>
  );
}

export default AddNewTodo;
