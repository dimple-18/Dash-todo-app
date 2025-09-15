import { useState, useEffect } from "react";
import { db } from "../firebase";  // import Firestore instance
import { collection, onSnapshot } from "firebase/firestore";
import moment from "moment";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(data);
    });

    return () => unsubscribe();
  }, []); // don't forget empty deps array

  return todos;
}

export function useFilterTodos(todos, selectedProject) {
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    let data;
    const todayDateFormated = moment().format("MM/DD/YYYY");

    if (selectedProject === "today") {
      data = todos.filter((todo) => todo.date === todayDateFormated);
    } else if (selectedProject === "next 7 days") {
      data = todos.filter((todo) => {
        const todoDate = moment(todo.date, "MM/DD/YYYY");
        const todayDate = moment(todayDateFormated, "MM/DD/YYYY");

        const diffDays = todoDate.diff(todayDate, "days");
        return diffDays >= 0 && diffDays < 7;
      });
    } else if (selectedProject === "alldays") {
      data = todos;
    } else {
      data = todos.filter((todo) => todo.projectName === selectedProject);
    }

    setFilteredTodos(data);
  }, [todos, selectedProject]);

  return filteredTodos;
}


export function useProjects(todos) {
  const [projects, setProjects] = useState([]);

  function calculateNumOfTodos(projectName, todos) {
    return todos.filter((todo) => todo.projectName === projectName).length;
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const projectName = doc.data().name;
        return {
          id: doc.id,
          name: projectName,
          numOfTodos: calculateNumOfTodos(projectName, todos),
        };
      });
      setProjects(data);
    });

    return () => unsubscribe();
  }, [todos]); // depends on todos

  return projects;
}
