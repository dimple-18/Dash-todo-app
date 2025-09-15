import React from "react";
import { Bell, CalendarDay, Clock, Palette, X } from "react-bootstrap-icons";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function TodoForm({
  handleSubmit,
  heading = false,
  text,
  setText,
  day,
  setDay,
  time,
  setTime,
  todoProject,
  setTodoProject,
  projects = [], //default empty array to prevent crash
  showButtons = false,
  setShowModal = () => {}, 
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit} className="TodoForm">
        <div className="text">
          {heading && <h3>{heading}</h3>}
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Todo ..."
            autoFocus
          />
        </div>

        {/* Reminder section */}
        <div className="remind">
          <Bell />
          <p>Remind Me</p>
        </div>

        {/* Pick day */}
        <div className="pick-day">
          <div className="title">
            <CalendarDay />
            <p>Choose a day</p>
          </div>
          <DatePicker
            label="Pick a day"
            value={day || dayjs()}
            onChange={(newValue) => setDay(newValue || dayjs())}
          />
        </div>

        {/* Pick time */}
        <div className="pick-time">
          <div className="title">
            <Clock />
            <p>Choose a time</p>
          </div>
          <TimePicker
            label="Pick a time"
            value={time || dayjs()} 
            onChange={(newValue) => setTime(newValue || dayjs())}
          />
        </div>

        {/* Pick project */}
        <div className="pick-project">
          <div className="title">
            <Palette />
            <p>Choose Project</p>
          </div>
          <div className="projects">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className={`project ${
                    todoProject === project.name ? "active" : ""
                  }`}
                  onClick={() => setTodoProject(project.name)}
                >
                  {project.name}
                </div>
              ))
            ) : (
              <div style={{ color: "#ff0000" }}>
                Please add a project before proceeding
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        {showButtons && (
          <div className="actions">
            <div className="cancel" onClick={() => setShowModal(false)}>
              <X size="40" />
            </div>
            <div className="confirm">
              <button type="submit">+ Add Todo</button>
            </div>
          </div>
        )}
      </form>
    </LocalizationProvider>
  );
}

export default TodoForm;
