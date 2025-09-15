import React, { useState, useContext, useEffect } from "react";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import dayjs from "dayjs";

function EditTodo({ todo, setShowModal }) {
  const { projects } = useContext(TodoContext);

  const [text, setText] = useState("");
  const [day, setDay] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [todoProject, setTodoProject] = useState("");

  // Initialize state from the todo object
  useEffect(() => { 
    if (todo) {
      setText(todo.text || "");
      setDay(todo.date ? dayjs(todo.date, "MM/DD/YYYY") : dayjs());
      setTime(todo.time ? dayjs(todo.time, "hh:mm A") : dayjs());
      setTodoProject(todo.projectName || "");
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      alert("Todo cannot be empty!");
      return;
    }

    try {
      const todoRef = doc(db, "todos", todo.id);
      await updateDoc(todoRef, {
        text,
        date: day.format("MM/DD/YYYY"),
        day: day.format("d"),
        time: time.format("hh:mm A"),
        projectName: todoProject,
      });

      setShowModal(false);
    } catch (error) {
      console.error("Error updating todo:", error);
      alert("Failed to update todo.");
    }
  };

  return (
    <div className="EditTodo">
      {<TodoForm
        handleSubmit={handleSubmit}
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
      /> }
    </div>
  );
}

export default EditTodo;