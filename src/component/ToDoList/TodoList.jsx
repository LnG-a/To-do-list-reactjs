import React, { useEffect, useState } from "react";
import "./style.css";
import Input from "../Input/Input";
import TaskItem from "../TaskItem/TaskItem";
import BulkAction from "../BulkAction/BulkAction";
function TodoList() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [checkList, setCheckList] = useState([]);
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("taskList")) || []
  );

  const filteredItems = taskList.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    window.addEventListener("updateTaskList", handleStorageChange);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [taskList, filteredItems]);

  const handleStorageChange = () => {
    const newList = JSON.parse(localStorage.getItem("taskList")) || [];
    newList.sort((a, b) => {
      const d1 = Date.parse(a.date);
      const d2 = Date.parse(b.date);
      if (d1 > d2) return 1;
      else if (d1 < d2) return -1;
      else return 0;
    });
    setTaskList([].concat(newList));
    localStorage.setItem("taskList", JSON.stringify(newList));
    setLoading(true);
  };

  const handleSearch = (search) => {
    setSearch(search);
    setLoading(true);
  };

  const handleCheckBox = (id) => {
    setCheckList((prevList) => {
      const index = prevList.indexOf(id);
      if (index !== -1) {
        return prevList.filter((item) => item !== id);
      } else {
        return [...prevList, id];
      }
    });
  };

  const handleRemoveTask = () => {
    const newList = taskList.filter((obj) => !checkList.includes(obj.id));
    setTaskList(newList);
    setCheckList([]);
    localStorage.setItem("taskList", JSON.stringify(newList));
    window.dispatchEvent(new Event("updateTaskList"));
  };

  return (
    <div className="to-do-list-container">
      <h2 className="title">To Do List</h2>
      <div className="search-bar">
        <Input placeholder="Search..." onInput={handleSearch} value={search} />
      </div>
      <div className="to-do-list-content">
        {loading === false &&
          filteredItems.map((task, index) => (
            <TaskItem
              key={index}
              id={task.id}
              title={task.title}
              description={task.description}
              date={task.date}
              priority={task.priority}
              handleCheckBox={handleCheckBox}
            />
          ))}
      </div>
      <BulkAction handleRemoveTask={handleRemoveTask} />
    </div>
  );
}

export default TodoList;
