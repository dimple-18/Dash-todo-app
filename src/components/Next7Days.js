import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import moment from "moment";


function Next7Days({ todos }) {
  const [weekTodos, setWeekTodos ] = useState([])
  useEffect( () => {
 const days = ['0', '1', '2', '3', '4', '5', '6']
 const sortedTodosByDay = days.map( day => {
   return {
     todos : todos.filter( todo => todo.day === day),
     number : day
   }
 })

 const today = parseInt(moment().format('d'))
  const arrangeDays = sortedTodosByDay.slice(today).concat(sortedTodosByDay.slice(0, today))

  setWeekTodos(arrangeDays)
   }, [todos])
 

  return (
    <div className="Next7Days">
      {
        weekTodos.map( day => 
          <section key={day.number} className="task-group">
            <div className="task-group-header">
                <h2>
                    { moment(day.number, 'd').format('dddd') }
                    { day.number === moment().format('d') && <span className="today">Today</span>}
                </h2>
                <span>{ day.todos.length }</span>
            </div>
            <div className="task-list">
                {
                  day.todos.length === 0
                    ? <p className="no-todos">No tasks scheduled</p>
                    : day.todos.map( todo =>
                        <Todo key={todo.id} todo={todo} />
                      )
                }
            </div>
          </section>
        )}
      
    </div>
  );
}

export default Next7Days;
