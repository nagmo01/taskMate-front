import React from "react";
import TaskList from "./TaskList";
import { TiArrowBackOutline } from "react-icons/ti";
import { IoReturnDownBack } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { TbArrowBackUp } from "react-icons/tb";
import writeImage from "../../public/628.jpeg";

export default function DoneTaskList({ todos, setTodos, onDelete, onReturn, setDone }) {
  const doneTasks = todos.filter((todo) => todo.done_date !== null);
  const sortedTasks = [...doneTasks].sort((a, b) => {
    const dateA = new Date(a.done_date);
    const dateB = new Date(b.done_date);
    return dateB - dateA;
  });

  return (
    <div className="w-[500px] mt-10 mb-5 bg-white shadow-md rounded-md">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl font-sans ms-3 pt-3">Complete</h1>
        <button
          className="me-3 self-center font-sans text-original text-3xl"
          onClick={() => setDone(false)}
        >
          ×
        </button>
      </div>
      <div className="border-2 border-gray-400 mt-2 mb-2"></div>

      {sortedTasks.length === 0 ? (
        <>
        <img
        src={writeImage}
        className="w-7/12 mx-auto pt-40 mt-10"
        />
        <h3 className="text-center font-bold font-mono text-xl mt-5 ms-5 me-5">
        No completed tasks yet!
        </h3>
        </>
        
      ) : (
        <div className="scrollbar overflow-scroll">
      {sortedTasks.map((todo) => (
        <React.Fragment key={todo.uuid}>
          <div className="mx-1 my-2 flex justify-between border shadow rounded">
            <p className="text-sm pt-1">・{todo.title}</p>
            <div className="me-3">
              <button
                className="py-2 ps-3 text-original"
                onClick={() => onReturn(todo.uuid)}
              >
                <TbArrowBackUp style={{ fontSize: "16px" }} />
              </button>
              <button
                className="py-2 ps-3 text-original"
                onClick={() => onDelete(todo.uuid)}
              >
                <FaTrashAlt style={{ fontSize: "16px" }} />
              </button>
              
            </div>
          </div>
        </React.Fragment>
      ))}
      </div>
      )}

    </div>
  );
}
