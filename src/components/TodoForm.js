import React from "react";
import { Bell, CalendarDay, Clock, Palette, X } from "react-bootstrap-icons";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const pickerSlotProps = { textField: { size: "small", fullWidth: true } };

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
        <div className="form-header">
          <h3>{heading || "Edit todo"}</h3>
          {showButtons && (
            <button
              type="button"
              className="icon-btn"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <X size="22" />
            </button>
          )}
        </div>

        <input
          className="todo-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you need to do?"
          autoFocus
        />

        {/* Reminder section */}
        <div className="section-label">
          <Bell size="14" />
          <p>Remind me</p>
        </div>

        <div className="pickers">
          <div className="picker">
            <div className="title">
              <CalendarDay size="13" />
              <p>Day</p>
            </div>
            <DatePicker
              value={day || dayjs()}
              onChange={(newValue) => setDay(newValue || dayjs())}
              slotProps={pickerSlotProps}
            />
          </div>

          <div className="picker">
            <div className="title">
              <Clock size="13" />
              <p>Time</p>
            </div>
            <TimePicker
              value={time || dayjs()} 
              onChange={(newValue) => setTime(newValue || dayjs())}
              slotProps={pickerSlotProps}
            />
          </div>
        </div>

        {/* Pick project */}
        <div className="section-label">
          <Palette size="14" />
          <p>Project</p>
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
            <div className="no-projects">
              Please add a project before proceeding
            </div>
          )}
        </div>

        {/* Action buttons */}
        {showButtons && (
          <div className="form-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              + Add Todo
            </button>
          </div>
        )}
      </form>
    </LocalizationProvider>
  );
}

export default TodoForm;
