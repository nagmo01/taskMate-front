import { fromJSON } from "postcss";
import React, { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import axios from "axios"

export default function EditTask({
  todos,
  setTodos,
  setActiveTask,
  activeTask,
}) {
  const [isInputClick, setIsInputClick] = useState(false);
  const [isBodyClick, setIsBodyClick] = useState(false);



  const task = useMemo(() => {
    return todos.find((todo) => todo.id === activeTask);
  }, [todos, activeTask]);


  const inputHandleChange = (e) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === activeTask) {
          return { ...todo, title: e.target.value };
        }
        return todo;
      });
    });
  };

  const bodyHandleChange = (e) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === activeTask) {
          return { ...todo, body: e.target.value };
        }
        return todo;
      });
    });
  };

  const updateTask = async (id, task) => {
    await axios.put(`http://localhost:3001/tasks/${id}`, {
      title: task.title,
      body: task.body,
      due_date: task.due_date,
    });
  }

  const handleBlur = () => {
    setIsInputClick(false);
    setIsBodyClick(false);
    updateTask(activeTask, task)
  };

  const handleClose = () => {
    updateTask(activeTask, task)
    setActiveTask(false);
  }

  

  return (
    <div className="my-5">
      {isInputClick ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsInputClick(false);
            updateTask(activeTask, task)
          }}
        >
          <input
            type="text"
            value={task.title}
            onChange={inputHandleChange}
            autoFocus
            onBlur={handleBlur}
            className="ps-3 w-full font-sans font-bold border-none outline-none"
          />
        </form>
      ) : (
        <div
          className="ps-3 w-full font-sans font-bold border-none outline-none"
          onClick={() => setIsInputClick(true)}
        >
          {task.title}
        </div>
      )}
      {isBodyClick ? (
        <form
        >
          <textarea
            value={task.body}
            onChange={bodyHandleChange}
            autoFocus
            onBlur={handleBlur}
            className="resize-none w-full outline-none scrollbar h-[500px] overflow-y-auto text-left text-lg px-2 mt-5 mb-5 whitespace-pre-wrap"
          >
            {task.body}
          </textarea>
        </form>
      ) : (
        <div
          onClick={() => setIsBodyClick(true)}
          className="w-full scrollbar h-[500px] overflow-y-auto text-left text-lg px-2 mt-5 mb-5 whitespace-pre-wrap"
        >
          {task.body}
        </div>
      )}

      <div className="flex justify-center">
        <button
          className="rounded-md p-1 text-sm bg-original text-white font-mono"
          onClick={handleClose}
        >
          close
        </button>
        <button
          className="ms-3 rounded-md p-1 text-sm bg-original text-white font-mono"
          onClick={handleClose}
        >
          update
        </button>

        

      </div>
    </div>
  );
}
