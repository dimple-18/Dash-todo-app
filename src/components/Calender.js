import React, { useContext, useState } from "react";
import { CalendarDate, CalendarWeek, CaretUp, Inbox, Sun } from "react-bootstrap-icons";
import { calendarItems } from "../constants";
import { TodoContext } from "../context";

const calendarIcons = {
    "today": Sun,
    "next 7 days": CalendarWeek,
    "all days": Inbox,
}

function Calender(){
    const [showMenu, setShowMenu] = useState(true)

    //CONTEXT
    const { selectedProject, setSelectedProject } = useContext(TodoContext)
    return(
        <div className='Calendar'>
            <div className="header">
                <div className="title">
                    <CalendarDate size="16"/>
                    <p>Calendar</p>
                </div>
                <div className="btns">
                    <span onClick={() => setShowMenu(prev => !prev)}>
                        <CaretUp
                            size="16"
                            style={{
                                transform: showMenu ? "rotate(0deg)" : "rotate(180deg)",
                                transition: "0.2s ease"
                            }}
                        />
                    </span>
                </div>
            </div>
            {showMenu && (
                <div className="items">
                    {
                        calendarItems.map( item => {
                            const Icon = calendarIcons[item]
                            return (
                                <div
                                    className={`item ${selectedProject === item ? "active" : ""}`}
                                    key={item}
                                    onClick={ () => setSelectedProject(item)}
                                >
                                    <Icon size="15" />
                                    <span>{item}</span>
                                </div>
                            )
                        })
                    }
                </div>
            )}
        </div>
    )
}

export default Calender
