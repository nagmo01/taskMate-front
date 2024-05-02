import React from "react";
import { useState } from "react";
import { useMemo } from "react";

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

  const handleBlur = () => {
    setIsInputClick(false);
    setIsBodyClick(false);
  };

  return (
    <>
      <div className="my-5">
        {isInputClick ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsInputClick(false);
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

            <div className="scrollbar h-[500px] overflow-y-auto text-left text-lg px-2 mt-5 mb-5 whitespace-pre-wrap">
              {task.body}
            </div>

          </form>
        ) : (
          <>
            <div
              className="ps-3 w-full font-sans font-bold border-none outline-none"
              onClick={() => setIsInputClick(true)}
            >
              {task.title}
            </div>
            {/* <div>{todo.body}</div> */}
            {/* <div>{todo.due_date}</div> */}

            <div className="scrollbar h-[500px] overflow-y-auto text-left text-lg px-2 mt-5 mb-5 whitespace-pre-wrap">
              {task.body}
            </div>

            <button
              className="rounded-md p-2 bg-original text-white font-mono"
              onClick={() => setActiveTask(false)}
            >
              close
            </button>
          </>
        )}
      </div>
      {/* <div>{task.title}</div> */}
      {/* <div>{task.due_date}</div> */}
    </>
  );
}
