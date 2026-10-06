import moment from "moment";

export const calendarItems = ['today', 'next 7 days', 'all days']

const projectPalette = ["#ec4899", "#0ea5e9", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6", "#14b8a6", "#6366f1"];

export function projectColor(name = "") {
  let hash = 0;
  for (const char of name) hash = (hash * 37 + char.charCodeAt(0)) >>> 0;
  return projectPalette[hash % projectPalette.length];
}

export const sampleProjects = [
  { id: "p1", name: "personal" },
  { id: "p2", name: "work" },
  { id: "p3", name: "health" },
  { id: "p4", name: "shopping" },
];

function sampleTodo(id, text, daysFromToday, time, projectName, color, checked = false) {
  const date = moment().add(daysFromToday, "days");
  return {
    id,
    text,
    date: date.format("MM/DD/YYYY"),
    day: date.format("d"),
    time,
    checked,
    color,
    projectName,
  };
}

export const sampleTodos = [
  sampleTodo("t1", "Morning run in the park", 0, "06:30 AM", "health", "#22c55e", true),
  sampleTodo("t2", "Team standup meeting", 0, "10:00 AM", "work", "#6366f1", true),
  sampleTodo("t3", "Finish dashboard UI redesign", 0, "12:30 PM", "work", "#8b5cf6"),
  sampleTodo("t4", "Call mom", 0, "05:00 PM", "personal", "#f59e0b"),
  sampleTodo("t5", "Buy vegetables and fruits", 0, "07:00 PM", "shopping", "#ec4899"),
  sampleTodo("t6", "Read 20 pages of a book", 0, "10:00 PM", "personal", "#14b8a6"),
  sampleTodo("t7", "Review pull requests", 1, "11:00 AM", "work", "#3b82f6"),
  sampleTodo("t8", "Yoga session", 1, "07:00 AM", "health", "#10b981"),
  sampleTodo("t9", "Client presentation", 2, "03:00 PM", "work", "#ef4444"),
  sampleTodo("t10", "Order new headphones", 3, "08:00 PM", "shopping", "#f97316"),
  sampleTodo("t11", "Dentist appointment", 4, "04:30 PM", "health", "#06b6d4"),
  sampleTodo("t12", "Plan weekend trip", 5, "09:00 PM", "personal", "#a855f7"),
  sampleTodo("t13", "Monthly report submission", 6, "06:00 PM", "work", "#0ea5e9"),
];
