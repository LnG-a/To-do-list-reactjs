import React, { useEffect, useState } from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { Option, Select } from "../Select/Select";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(formatDate(new Date()));
  const [priority, setPriority] = useState("Normal");
  const [error, setError] = useState(false);
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("taskList")) || []
  );

  function addTask() {
    if (title === "") {
      setError(true);
      return;
    }
    const task = {
      id: uuidv4(),
      title: title,
      description: description,
      date: date,
      priority: priority,
    };
    const newList = JSON.parse(localStorage.getItem("taskList")) || [];
    newList.push(task);
    newList.sort((a, b) => {
      const d1 = Date.parse(a.date);
      const d2 = Date.parse(b.date);
      if (d1 > d2) return 1;
      else if (d1 < d2) return -1;
      else return 0;
    });
    setTaskList([].concat(newList));
    onReset();
  }

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
    window.dispatchEvent(new Event("updateTaskList"));
  }, [taskList]);

  const onReset = () => {
    setError(false);
    setTitle("");
    setDescription("");
    setDate(formatDate(new Date()));
    setPriority("Normal");
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="new-task-container">
      <h2 className="title">New Task</h2>
      <Form>
        <Input
          placeholder="Add new task.."
          value={title}
          onInput={setTitle}
          error={error}
        />
        <Input.Description
          label="Description"
          placeholder="Add description..."
          value={description}
          onInput={setDescription}
        />
        <Form.Wrapper>
          <Input
            type="date"
            value={date}
            label="Duo Date"
            onInput={setDate}
            min={date}
          />
          <Select label="Priority" onChange={setPriority} value={priority}>
            <Option value="Low" />
            <Option value="Normal" />
            <Option value="High" />
          </Select>
        </Form.Wrapper>
        <Form.Submit
          type="primary"
          label="Add"
          onClick={() => {
            addTask();
          }}
        />
      </Form>
    </div>
  );
}

export default NewTask;
