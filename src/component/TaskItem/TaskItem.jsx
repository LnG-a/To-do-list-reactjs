import React, { useState } from "react";
import "./style.css";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { Option, Select } from "../Select/Select";

function TaskItem(props) {
  const [detail, setDetail] = useState(false);
  const [priority, setPriority] = useState(props.priority);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [date, setDate] = useState(props.date);
  const [error, setError] = useState(false);

  const today = formatDate(new Date());
  const handleRemoveTask = () => {
    const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    const filteredItems = taskList.filter((item) => item.id !== props.id);
    localStorage.setItem("taskList", JSON.stringify(filteredItems));
    window.dispatchEvent(new Event("updateTaskList"));
  };

  const handleUpdateTask = () => {
    if (title === "") {
      setError(true);
      return;
    }
    const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    const updatedTask = {
      id: props.id,
      title: title,
      description: description,
      date: date,
      priority: priority,
    };
    const updatedList = taskList.map((task) => {
      if (task.id === props.id) {
        return { ...task, ...updatedTask };
      }
      return task;
    });
    localStorage.setItem("taskList", JSON.stringify(updatedList));
    onReset();
    window.dispatchEvent(new Event("updateTaskList"));
  };

  const onReset = () => {
    setError(false);
    setDetail(false);
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="task-item-container">
      <div className="task-item">
        <div className="task-item-left">
          <input
            type="checkbox"
            checked={props.checked}
            onInput={() => {
              props.handleCheckBox(props.id);
            }}
          />
          <div className="task-title">{props.title}</div>
        </div>
        <div>
          <Button
            type="info"
            label="Detail"
            onClick={() => {
              setDetail(!detail);
            }}
          />
          <Button
            type="danger"
            label="Remove"
            onClick={() => {
              handleRemoveTask();
            }}
          />
        </div>
      </div>
      {detail === true ? (
        <div className="task-item-detail">
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
                min={today}
              />
              <Select label="Priority" onChange={setPriority} value={priority}>
                <Option value="Low" />
                <Option value="Normal" />
                <Option value="High" />
              </Select>
            </Form.Wrapper>
            <Form.Submit
              type="primary"
              label="Update"
              onClick={handleUpdateTask}
            />
          </Form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TaskItem;
