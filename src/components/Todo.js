import React from "react";
import { ArrowClockwise, Check, Clock, Trash } from "react-bootstrap-icons";
import moment from "moment";
import { db } from "../firebase"; 
import { doc, deleteDoc, updateDoc, addDoc, collection } from "firebase/firestore"; 
import { projectColor } from "../constants";

function Todo({ todo }) {
  const deleteTodo = async (todo) => {
    try {
      await deleteDoc(doc(db, "todos", todo.id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const checkTodo = async (todo) => {
    try {
      await updateDoc(doc(db, "todos", todo.id), { checked: !todo.checked });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const repeatNextDay = async (todo) => {
    const nextDay = moment(todo.date, "MM/DD/YYYY").add(1, "days");
    const { id, ...rest } = todo;
    try {
      await addDoc(collection(db, "todos"), {
        ...rest,
        date: nextDay.format("MM/DD/YYYY"),
        day: nextDay.format("d"),
        checked: false,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error repeating todo:", error);
    }
  };

  const time = todo.time?.toDate
    ? moment(todo.time.toDate()).format("hh:mm A")
    : todo.time;

  return (
    <div className={`Todo ${todo.checked ? "done" : ""}`}>
      <button
        type="button"
        className="check-todo"
        onClick={() => checkTodo(todo)}
        aria-label={todo.checked ? "Mark as not done" : "Mark as done"}
      >
        {todo.checked && <Check size="16" />}
      </button>

      <p className="text">{todo.text}</p>

      <div className="meta">
        {todo.projectName && (
          <span className="project-tag">
            <span
              className="dot"
              style={{ background: projectColor(todo.projectName) }}
            />
            {todo.projectName}
          </span>
        )}
        {time && (
          <span className="time">
            <Clock size="12" />
            {time}
          </span>
        )}
      </div>

      <div className="actions">
        {todo.checked && (
          <span
            className="repeat"
            onClick={() => repeatNextDay(todo)}
            title="Repeat tomorrow"
          >
            <ArrowClockwise size="14" />
          </span>
        )}
        <span
          className="delete"
          onClick={() => deleteTodo(todo)}
          title="Delete"
        >
          <Trash size="14" />
        </span>
      </div>
    </div>
  );
}

export default Todo;
