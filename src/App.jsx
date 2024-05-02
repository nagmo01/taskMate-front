import "./App.css";
import { useEffect, useState } from "react";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { FaPen } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { RxCalendar } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import trashImage from "../public/727.jpeg";
import writeImage from "../public/628.jpeg";
import settingImage from "../public/681.jpeg";
import contentImage from "../public/319.jpeg";
import { FaReact } from "react-icons/fa";
import { IconContext } from "react-icons";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EditTask from "./components/EditTask";
import TaskList from "./components/TaskList";

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const [dateValue, setDateValue] = useState("2024-01-01-11:00");
  // フォームの形変更
  const [form, setForm] = useState(false);

  // タスクを選択すると詳細フォームを開くようにするときの状態管理
  const [activeTask, setActiveTask] = useState(false);
  const getActiveTask = (todos, activeTask) => {
    return todos.find((todo) => todo.id === activeTask);
  };

  // 送信キー切り替えのラジオボタン
  const [selectedOption, setSelectedOption] = useState("Shift");
  const options = ["Shift", "Control", "Alt/Cmd", "Enter"];
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const fetch = async () => {
    const res = await axios.get("http://localhost:3001/tasks");
    setTodos(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    console.log(activeTask)
  }, [activeTask])

  function RadioButtonGroup({ options, selectedOption, onChange }) {
    return (
      <div>
        {options.map((option) => (
          <label key={option} className="mx-5">
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={onChange}
            />
            {option}
          </label>
        ))}
      </div>
    );
  }

  const [editValue, setEditValue] = useState("");

  // タスクを追加する処理。（送信ボタンorEnterのどちらかで実行される）
  const addTodo = async () => {
    if (value == "") {
      return;
    }

    // const newTodos = [
    //   ...todos,
    //   // { id: count, text: value, type: "task", completed: false },
    //   { id: count, title: value, body: bodyValue, due_date: dateValue },
    // ];
    // setTodos(newTodos);

    await axios.post("http://localhost:3001/tasks", {
      title: value,
      body: bodyValue,
      due_date: dateValue,
    });

    fetch();
    setValue("");
    setBodyValue("");
    //setDateValue(0);
  };

  // onKeyDownで実行される。押されたキーが指定したもののとき、タスク追加処理を実行する
  const handleKeyDown = (e) => {
    if (
      (selectedOption === "Shift" && e.shiftKey) ||
      (selectedOption === "Control" && e.ctrlKey) ||
      (selectedOption === "Alt/Cmd" && e.metaKey)
    ) {
      if (e.key === "Enter") {
        addTodo();
      }
    }
  };

  // const onUpdate = (id) => {
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id === id) {
  //         return { ...todo, type: "task", text: editValue };
  //       } else {
  //         return { ...todo };
  //       }
  //     })
  //   );
  // };

  // const onEditChange = (e) => {
  //   setEditValue(e.target.value);
  // };

  const onDelete = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    if (id === activeTask) {
      setActiveTask(false);
    }
    fetch();
  };

  // const onEdit = (id) => {
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id === id) {
  //         setEditValue(todo.text);
  //         return { ...todo, type: "form" };
  //       } else {
  //         return { ...todo, type: "task" };
  //       }
  //     })
  //   );
  // };

  const onCheck = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo }
      )
    );
  };

    return (
    <>
      {/* <header className="text-black bg-white shadow-md">
        <div className="navbar px-10">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <a className="btn btn-ghost text-xl font-sans">Essential Todo</a>
            <input type="checkbox" onChange={() => setForm(!form)} />
          </div>
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header> */}

      {/* メイン */}
      <div className="mx-auto rounded-md flex justify-center h-screen">
        {/* サイドバー */}
        <div className="bg-white text-original shadow-md">
          <h3 className="text-center font-bold font-sans text-lg mt-28 mb-10"></h3>
          <div className="flex justify-center text-lg font-sans font-bold">
            <div className="flex-col ms-5 me-1 pt-20 mt-1">
              <IconContext.Provider value={{ size: "23px" }}>
                <div className="py-5 flex text-start me-3">
                  <CgProfile className="self-center me-3" />
                  {/* <p className='self-center'>Account</p> */}
                </div>
                <div className="py-5 flex text-start me-3">
                  <FaCheck className="self-center me-3" />
                  {/* <p className='self-center'>Done</p> */}
                </div>
                <div className="py-5 flex text-start me-3">
                  <FaRegTrashCan className="self-center me-3" />
                  {/* <p className='self-center'>Trash</p> */}
                </div>
                <div className="py-5 flex text-start me-3">
                  <RxCalendar className="self-center me-3" />
                  {/* <p className='self-center'>Calendar</p> */}
                </div>
                <div className="py-5 flex text-start me-3">
                  <IoMdSettings className="self-center me-3" />
                  {/* <p className='self-center'>Setting</p> */}
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>

        <div className="w-14 mx-auto"></div>

        {/* フォーム＆各種メニュー */}
        <div className="w-[500px] flex-col justify-center mt-10">
          {/* フォーム入力欄 */}
          <div className="pt-10 w-full">
            <div className="flex justify-around mb-5">
              <div className=""></div>
              <h1 className="ps-10 font-bold font-mono custom-black self-center">
                Add a new task
              </h1>
              {/* フォームの切り替えトグル */}
              <div className="form-control">
                <input
                  type="checkbox"
                  onChange={() => setForm(!form)}
                  className="toggle"
                />
              </div>
            </div>

            <div className="bg-white rounded-md shadow-md">
              <div className="flex flex-col items-center justify-center duration-300 pt-5 pb-5">
                {form ? (
                  <input
                    className="ps-1 py-2 w-5/6 border border-gray border-1 rounded bg-white"
                    type="text"
                    value={value}
                    autoFocus={1}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={form ? "title" : `${selectedOption} + Enter`}
                    maxLength={30}
                  />
                ) : (
                  <div className="flex  justify-center w-5/6">
                    <input
                      className="ps-1 w-3/4 border border-gray border-1 rounded bg-white"
                      type="text"
                      value={value}
                      autoFocus={1}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder={form ? "title" : `${selectedOption} + Enter`}
                      maxLength={30}
                      onKeyDown={handleKeyDown}
                    />
                    <button
                      className="text-white font-sans rounded-md bg-black px-3 ml-1"
                      onClick={addTodo}
                    >
                      +
                    </button>
                  </div>
                )}

                <div
                  className={`overflow-y-hidden transition-all duration-300 ${
                    form
                      ? "max-h-96 w-full text-center"
                      : "max-h-0 w-full text-center"
                  }`}
                >
                  <textarea
                    className="ps-1 pt-1 h-64 w-5/6 mt-6 text-black bg-white  border rounded resize-none"
                    placeholder="## markdown"
                    value={bodyValue}
                    onChange={(e) => setBodyValue(e.target.value)}
                  />

                  {/* 日時フォームと送信ボタン */}
                  <div className="w-5/6 mt-5 mx-auto flex justify-between text-black">
                    <div className="border">
                      <DatePicker defaultValue={new Date()} />
                    </div>
                    <button
                      className="rounded py-2 px-4 border text-white bg-gray-800"
                      onClick={addTodo}
                    >
                      create
                    </button>
                  </div>
                </div>

                {/* スイッチによってフォームの形を変える */}
                {/* {form && (
                  
                )} */}
              </div>
            </div>

            {/* 送信キー切り替えのラジオボタン */}
            {/* <div>
              <RadioButtonGroup
                options={options}
                selectedOption={selectedOption}
                onChange={handleOptionChange}
              />
            </div> */}
          </div>

          {/* 各種設定ウィンドウ */}
          <div className="mt-20 pt-10">
            {form || (
            <h3 className="text-center mb-4 font-bold font-mono">Setting</h3>
            )}
            {/* <div className="h-96 bg-white shadow-md rounded-md"> */}
            <div
              className={`bg-white shadow-md rounded-md text-center overflow-y-hidden transition-all duration-300 ${
                form ? "h-0" : "h-96"
              }`}
            >
              <img
                src={settingImage}
                alt="ゴミ箱の画像"
                className="w-1/2 mx-auto"
              />
              <h3 className="text-center font-bold font-mono text-md">
                Customize your preferences here
              </h3>
              <h3 className="font-bold font-mono mt-10">
                送信キー切り替えのラジオボタン
              </h3>
              <div className="font-bold font-mono mt-5">
                <RadioButtonGroup
                  options={options}
                  selectedOption={selectedOption}
                  onChange={handleOptionChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`w-14 ${activeTask && "mx-auto"}`}></div>

        {/* タスク一覧 */}
        <div className="overflow-hidden font-sans w-[500px] text-2xl container mt-10 pb-2 mb-5 bg-white shadow-md flex-shrink rounded-md">
          <div className="flex justify-between py-3">
            <h1 className="font-bold text-3xl font-sans ms-3">Tasks</h1>
            <p className="text-sm text-gray-500 me-3 self-center">
              You have {todos.length} tasks
            </p>
          </div>
          {todos.length === 0 ? (
            <>
              <h1 className="custom-border-red text-xs font-bold text-white shadow custom-bg-black ps-2 py-1 rounded-sm">
                Today
              </h1>
              <img src={writeImage} className="w-1/2 mx-auto pt-32 mt-10" />
              <h3 className="text-center font-bold font-mono text-md mt-5 ms-5 me-5">
                Time to add your first task!
              </h3>
            </>
          ) : (
            <div className="scrollbar h-full overflow-y-auto pb-14">
              <TaskList todos={todos} activeTask={activeTask} setActiveTask={setActiveTask} onCheck={onCheck} onDelete={onDelete} />
            </div>
          )}
        </div>

        <div className="w-14 mx-auto"></div>

        {/* タスク詳細 */}

        {/* <div className="w-[450px] text-2xl container mt-24 mb-16 bg-white shadow-md flex-shrink rounded-md">
          <div className="flex justify-center pt-10">
            <h1 className="font-bold text-3xl text-center"></h1>
          </div>
          <img src={contentImage} className="w-1/2 mx-auto pt-32 mt-10" />
          <h3 className="text-center font-bold font-mono text-md mt-5 ms-5 me-5">
            Please select a task.
          </h3>
          {todos.length === 0 && <></>}
          <div></div>
        </div> */}

        <div className={`${activeTask ? 'opacity-100 w-[450px]' : 'opacity-0 w-0'} transition-opacity duration-500 text-2xl container mt-24 mb-16 bg-white shadow-md flex-shrink rounded-md`}>
          {/* {activeTask ? (
            <EditTask getActiveTask={getActiveTask(todos, activeTask)} setActveTask={setActiveTask} />
          ) : (
            <>
              <div className="flex justify-center pt-10">
                <h1 className="font-bold text-3xl text-center"></h1>
              </div>
              <img src={contentImage} className="w-1/2 mx-auto pt-32 mt-10" />
              <h3 className="text-center font-bold font-mono text-md mt-5 ms-5 me-5">
                Please select a task.
              </h3>
              {todos.length === 0 && <></>}
              <div></div>
            </>
          )} */}
          {activeTask && <EditTask todos={todos} setTodos={setTodos} setActiveTask={setActiveTask} activeTask={activeTask} />}
        </div>

        { activeTask && (
        <div className="w-14 mx-auto"></div>
        )}
      </div>
    </>
  );
}

export default App;
