import React, { useEffect, useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import writeImage from "../../public/628.jpeg";
import { FaCheck } from "react-icons/fa6";

export default function TaskList({
  pendingTasks,
  activeTask,
  setActiveTask,
  onDelete,
  onCheck,
  done,
}) {



  // タスク一覧を時系列順に並び変えておく
  pendingTasks.sort((a, b) => {
    const dateDiff = new Date(a.due_date) - new Date(b.due_date);
    if (dateDiff !== 0) {
      return dateDiff;
    }

    if (a.due_time === null && b.due_time === null) {
      if (a.created_at < b.created_at) return 1;
      if (a.created_at > b.created_at) return -1;
    }

    if (a.due_time === null) {
      return -1;
    }

    if (b.due_time === null) {
      return 1;
    }

    // return new Date(`2000-01-01 ${b.due_time}`) - new Date(`2000-01-01 ${a.due_time}`);
    if (a.due_time > b.due_time) return 1;
    if (a.due_time < b.due_time) return -1;
  });


  const today = new Date().toISOString().split("T")[0];
  const oneWeekLater = new Date(Date.now() + 604800000)
    .toISOString()
    .split("T")[0];


  // タスク一覧が入った連想配列todosをそれぞれ日付ごとにkey:[{}, {}]って形の連想配列にする
  const groupedTasks = pendingTasks.reduce((groups, task) => {
    const { due_date } = task;

    // if (!groups["Late"]) groups["Late"] = [];

    // 当日を含む直近1週間のタスクを日別に分ける
    if (due_date >= today && due_date < oneWeekLater) {
      const key = due_date;
      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
    }
    // 期日なしタスクは'Anytime'に格納
    else if (due_date === "2200-12-31") {
      if (!groups["Anytime"]) groups["Anytime"] = [];
      groups["Anytime"].push(task);
    }

    // 今後の期日が設定されているタスクは 'Upcoming' に格納
    else if (due_date >= oneWeekLater) {
      if (!groups["Upcoming"]) groups["Upcoming"] = [];
      groups["Upcoming"].push(task);
    }

    // 前日以下の期日が設定されているタスクは 'Late' に格納
    else {
      if (!groups["Late"]) groups["Late"] = [];
      groups["Late"].push(task);
    }

    return groups;
  }, {});


  // Todayを読み込み時にスクロールするようにする
  const targetRef = useRef(null);
  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);



  return (
    <>
      {Object.entries(groupedTasks).map(([key, tasks]) => (
        <div key={key}>
          {today === key ? (
            <h3
              ref={targetRef}
              className="bg-original text-white font-sans text-xs font-bold ps-2 py-1 rounded-sm"
            >
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
                activeTask === todo.id ? "border border-original bg-zinc-50" : ""
              }`}
            >
              <div
                className="flex justify-start items-center w-full cursor-default"
                onClick={() => (done || setActiveTask(todo.id))}
              >
                <button
                  className="ms-2 me-1 rounded-full border border-gray-300 p-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                  onCheck(todo.id)
                }}
                />
                <p className="text-sm">{todo.title}</p>
              </div>
              <div className="me-3 flex items-center">
                {/* <h3 className="font-mono text-sm font-bold">{todo.due_date}</h3> */}

                <div>
                  {todo.due_date === today && (
                    // todayのタスク
                    <>
                      {todo.due_time && (
                        <h3 className="font-mono text-sm font-bold">
                          {todo.due_time
                            .split("T")[1]
                            ?.split(":")
                            .slice(0, 2)
                            .join(":")}
                        </h3>
                      )}
                    </>
                  )}

                  {todo.due_date === "2200-12-31" && (
                    // anytimeのタスク
                    <>
                      <h3 className="font-mono text-sm font-bold"></h3>
                    </>
                  )}

                  {todo.due_date < today && (
                    // Lateのタスク
                    <>
                        <h3 className="font-mono text-sm font-bold">
                          {new Date(todo.due_date).toLocaleDateString("ja-JP", {
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </h3>
                    </>
                  )}

                  {(todo.due_date > today ) && (todo.due_date <= oneWeekLater ) && (
                    // 今日以降で1週間以内のタスク
                    <>
                    {todo.due_time && (
                      <h3 className="font-mono text-sm font-bold">
                      {todo.due_time
                        .split("T")[1]
                        ?.split(":")
                        .slice(0, 2)
                        .join(":")}
                    </h3>
                    )}
                    </>
                  )}

                  {(todo.due_date > oneWeekLater) && (todo.due_date !== "2200-12-31" ) && (
                    // 1週間以上先のタスク
                    <>
                    <h3 className="font-mono text-sm font-bold">
                          {new Date(todo.due_date).toLocaleDateString("ja-JP", {
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </h3>
                    </>
                  )}

                </div>

                {/* <button
                  className="py-2 ps-3 text-original"
                  onClick={() => onCheck(todo.id)}
                >
                  <FaCheck style={{ fontSize: "14px" }} />
                </button> */}

                <button
                  className="py-2 ps-3 text-original"
                  onClick={() => onDelete(todo.id)}
                >
                  <FaTrashAlt style={{ fontSize: "14px" }} />
                </button>

              </div>


              
            </div>
          ))}
        </div>
      ))}

    </>
  );
}
