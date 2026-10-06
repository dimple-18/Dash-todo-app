import './App.css';
import Sidebar from './components/Sidebar';
import User from './components/User';
import AddNewTodo from './components/AddNewTodo';
import Calender from './components/Calender';
import Projects from './components/Projects';
import Main from './components/Main';
import Todos from './components/Todos';

function App() {
  return (
    <div className='App'>
      <Sidebar>
          <User />
          <AddNewTodo />
          <Calender />
          <Projects />
      </Sidebar>
      <Main>
          <Todos />
      </Main>
    </div>
  );
}

export default App;
