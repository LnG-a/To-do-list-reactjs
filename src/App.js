import "./App.css";
import NewTask from "./component/NewTask/NewTask";
import TodoList from "./component/ToDoList/TodoList";

function App() {
  return (
    <div className="App">
      <NewTask />
      <TodoList />
    </div>
  );
}

export default App;
