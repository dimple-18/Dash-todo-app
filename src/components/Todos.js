import React, { useContext } from "react";
import Todo from "./Todo"
import Next7Days from "./Next7Days";
import { TodoContext  } from "../context";

function Todos(){
    const{ todos, selectedProject } = useContext(TodoContext)

    // const todos = [
    //     {
    //         id : '001',
    //         text : "Go for a run",
    //         time : "10:00 AM",
    //         date : "01/09/2025",
    //         day : "6",
    //         checked : false,
    //         color : '#00000',
    //         project : 'personal'
    //     },
    //     {
    //         id : '002',
    //         text : "Meeting",
    //         time : "09:00 AM",
    //         date : "02/09/2025",
    //         day : "1",
    //         checked : true,
    //         color : '#00000',
    //         project : 'work'
    //     },
    //     {
    //         id : '003',
    //         text : "sleep",
    //         time : "11:00 PM",
    //         date : "01/09/2025",
    //         day : "6",
    //         checked : false,
    //         color : '#00000',
    //         project : 'other'
    //     } 
    // ]
    return(
        <div className='Todos'>
            <div className="selected-project">
                {selectedProject}
            </div>
            <div className="todos">
                {
                    selectedProject === "next 7 days" ?
                    <Next7Days todos={todos} />
                    :
                    todos.map(todo =>
                        <Todo todo={todo} key={todo.id} />
                    )
                }
            </div>
        </div>
    )
}

export default Todos;
