import React, { useState } from "react";
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from "react-bootstrap-icons";
import moment from "moment";
import { db } from "../firebase"; 
import { doc, deleteDoc } from "firebase/firestore"; 

function Todo({ todo }) {
  const [hover, setHover] = useState(false);

  const deleteTodo = async (todo) => {
    try {
      await deleteDoc(doc(db, "todos", todo.id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="Todo">
      <div
        className="todo-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Checkbox / Checked State */}
        <div className="check-todo">
          {todo.checked ? (
            <span className="checked">
              <CheckCircleFill color="#bebebe" />
            </span>
          ) : (
            <span className="unchecked">
              <Circle color={todo.color} />
            </span>
          )}
        </div>

        {/* Todo Text + Time + Project */}
        <div className="text">
          <p style={{ color: todo.checked ? "#bebebe" : "#000000" }}>
            {todo.text}
          </p>
          <span>
            {
              // If it's a Firestore Timestamp → format with moment
              todo.time?.toDate
                ? moment(todo.time.toDate()).format("hh:mm A")
                : todo.time
            }{" "}
            - {todo.projectName}
          </span>
          <div className={`line ${todo.checked ? "line-through" : ""}`}></div>
        </div>

        {/* Add to next day button */}
        <div className="add-to-next-day">
          {todo.checked && (
            <span>
              <ArrowClockwise />
            </span>
          )}
        </div>

        {/* Delete button */}
        <div 
          className="delete-todo"
          onClick={() => deleteTodo(todo)}
        >
          {(hover || todo.checked) && (
            <span>
              <Trash />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
