import React from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function TaskList({
  todos,
  activeTask,
  setActiveTask,
  onDelete,
  onCheck,
}) {
  const today = new Date().toISOString().split("T")[0];
  const oneWeekLater = new Date(Date.now() + 604800000)
    .toISOString()
    .split("T")[0];

  const groupedTasks = todos.reduce((groups, task) => {
    const { due_date } = task;

    // 当日を含む直近1週間のタスクを日別に分ける
    if (due_date >= today && due_date < oneWeekLater) {
      const key = due_date;
      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
    }
    // 今後の期日が設定されているタスクは 'future tasks' に格納
    else if (due_date >= oneWeekLater) {
      if (!groups["future tasks"]) groups["future tasks"] = [];
      groups["future tasks"].push(task);
    }
    // 前日以下の期日が設定されているタスクは 'past tasks' に格納
    else {
      if (!groups["past tasks"]) groups["past tasks"] = [];
      groups["past tasks"].push(task);
    }

    return groups;
  }, {});

  console.log(groupedTasks);
  console.log(today)

  return (
    <>
      {Object.entries(groupedTasks).map(([key, tasks]) => (
        <div key={key}>
          { today === key ? (
          <h3 className="bg-original text-white font-sans text-xs font-bold ps-2 py-1 rounded-sm">
            Today
          </h3>
          ) : (
            <h3 className="bg-original text-white font-sans text-xs font-bold ps-2 py-1 rounded-sm">
            {key}
          </h3>
          )}
          
          {tasks.map((todo) => (
            // <p key={todo.id}>{todo.title}</p>
            <div
              key={todo.id}
              className={`mx-1 my-2 flex justify-between border shadow rounded ${
                activeTask === todo.id ? "bg-neutral-700 text-white" : ""
              }`}
            >
              <div
                className="flex justify-start items-center w-full cursor-default"
                onClick={() => setActiveTask(todo.id)}
              >
                <button
                  className="ms-2 me-1 rounded-full border border-gray-300 p-2 cursor-pointer"
                  onChange={() => onCheck(todo.id)}
                />
                <p className="text-sm">{todo.title}</p>
              </div>
              <div className="me-3 flex items-center">
                {/* <h3 className="font-mono text-sm font-bold">{todo.due_date}</h3> */}
                <div>
                  {todo.title.length >= 8 ? (
                    <>
                      <h3 className="font-mono text-xs font-bold">
                        {new Date(todo.due_date).toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </h3>
                      <h3 className="font-mono text-xs font-bold">
                        {new Date(todo.due_date).toLocaleTimeString("ja-JP", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hourCycle: "h24",
                        })}
                      </h3>
                    </>
                  ) : (
                    <h3 className="font-mono text-sm font-bold">
                      {new Date(todo.due_date).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </h3>
                  )}
                </div>
                <button
                  className="p-2 text-original"
                  onClick={() => onDelete(todo.id)}
                >
                  <FaTrashAlt style={{ fontSize: "14px" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* {todos.map((todo, index) => (
        <div key={todo.id}>
          <div
            className={`mx-1 my-2 flex justify-between border shadow rounded ${
              activeTask === todo.id ? "bg-neutral-700 text-white" : ""
            }`}
          >
            <div
              className="flex justify-start items-center w-full cursor-default"
              onClick={() => setActiveTask(todo.id)}
            >
              <input
                className={`ml-2 mr-1 radio ${
                  activeTask === todo.id ? "border-white" : "border-gray"
                }`}
                name="radio-9"
                type="radio"
                checked={false}
                onChange={() => onCheck(todo.id)}
                disabled
              />
              <p className="text-sm">{todo.title}</p>
            </div>
            <div className="mr-3 flex items-center z-10">
              <h3 className="font-mono text-sm font-bold">3/25</h3>
              <button
                className="p-2 text-black"
                onClick={() => onDelete(todo.id)}
              >
                <FaTrashAlt
                  style={{
                    fontSize: "14px",
                    color: activeTask === todo.id ? "white" : "inherit",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      ))} */}
    </>
  );
}
