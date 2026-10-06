import React, { useContext, useState } from "react";
import moment from "moment";
import { CheckAll, Search } from "react-bootstrap-icons";
import Todo from "./Todo"
import Next7Days from "./Next7Days";
import { TodoContext  } from "../context";

function sortByDateTime(todos) {
    const key = (todo) => moment(`${todo.date} ${todo.time}`, "MM/DD/YYYY hh:mm A").valueOf() || 0
    return [...todos].sort((a, b) => key(a) - key(b))
}

function TodoGroup({ title, todos }) {
    if (todos.length === 0) return null
    return (
        <section className="task-group">
            <div className="task-group-header">
                <h2>{title}</h2>
                <span>{todos.length}</span>
            </div>
            <div className="task-list">
                {todos.map(todo => <Todo todo={todo} key={todo.id} />)}
            </div>
        </section>
    )
}

function Todos(){
    const{ todos, selectedProject } = useContext(TodoContext)
    const [search, setSearch] = useState("")

    const visibleTodos = sortByDateTime(
        todos.filter(todo => todo.text?.toLowerCase().includes(search.trim().toLowerCase()))
    )
    const pendingTodos = visibleTodos.filter(todo => !todo.checked)
    const doneTodos = visibleTodos.filter(todo => todo.checked)

    const total = todos.length
    const done = todos.filter(todo => todo.checked).length
    const progress = total === 0 ? 0 : Math.round((done / total) * 100)

    return(
        <div className='Todos'>
            <header className="page-header">
                <div>
                    <h1 className="selected-project">{selectedProject}</h1>
                    <p className="subtitle">{moment().format("dddd, D MMMM YYYY")}</p>
                </div>
                <label className="search">
                    <Search size="14" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search tasks"
                    />
                </label>
            </header>

            <div className="stats">
                <div className="stat">
                    <span className="label">Total tasks</span>
                    <span className="value">{total}</span>
                </div>
                <div className="stat">
                    <span className="label">Pending</span>
                    <span className="value">{total - done}</span>
                </div>
                <div className="stat">
                    <span className="label">Completed</span>
                    <span className="value">{done}</span>
                </div>
                <div className="stat">
                    <span className="label">Progress</span>
                    <span className="value">{progress}%</span>
                    <div className="progress">
                        <div className="progress-bar" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </div>

            <div className="todos">
                {
                    visibleTodos.length === 0 ?
                    <div className="empty">
                        <CheckAll size="36" />
                        <p>{search ? "No matching tasks" : "Nothing here yet"}</p>
                        <span>{search ? "Try a different search term." : 'Click "+ New Todo" to add a task.'}</span>
                    </div>
                    :
                    selectedProject === "next 7 days" ?
                    <Next7Days todos={visibleTodos} />
                    :
                    <>
                        <TodoGroup title="To do" todos={pendingTodos} />
                        <TodoGroup title="Completed" todos={doneTodos} />
                    </>
                }
            </div>
        </div>
    )
}

export default Todos;
