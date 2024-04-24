import "./App.css";
import { useState } from "react";
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


let count = 0;

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  //const [bodyValue, setBodyValue] = useState("");
  //const [dateValue, setDateValue] = useState(Time.now);

  // 送信キー切り替えのラジオボタン
  const [selectedOption, setSelectedOption] = useState("Shift");
  const options = ["Shift", "Control", "Alt/Cmd", "Enter"];
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

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
  const addTodo = () => {
    if (value == "") {
      return;
    }

    const newTodos = [
      ...todos,
      { id: count, text: value, type: "task", completed: false },
      //{ id: count, title: value, body: bodyValue, due_date: dateValue },
    ];
    setTodos(newTodos);
    setValue("");
    //setBodyValue("");
    //setDateValue(0);
    count += 1;
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

  const onUpdate = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, type: "task", text: editValue };
        } else {
          return { ...todo };
        }
      })
    );
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onEdit = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          setEditValue(todo.text);
          return { ...todo, type: "form" };
        } else {
          return { ...todo, type: "task" };
        }
      })
    );
  };

  const onCheck = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo }
      )
    );
  };

  const list = todos.map((todo, index) => {
    return todo.type === "task" ? (
      //デフォルト
      <div key={todo.id} className="z-10">
        {index === 0 ? (
          <h1 className="custom-border-red text-xs font-bold text-white shadow custom-bg-black ps-2 py-1 rounded-sm">
            Today
          </h1>
        ) : (
            <h1></h1>
          )}
        {index === 6 ? (
          <h1 className="custom-border-red text-xs font-bold text-white shadow custom-bg-black ps-2 py-1 rounded-sm">
            5月
          </h1>
        ) : (
            <h1></h1>
          )}
        {index === 10 ? (
          <h1 className="custom-border-red text-xs font-bold text-white shadow custom-bg-black ps-2 py-1 rounded-sm">
            Other
          </h1>
        ) : (
            <h1></h1>
          )}
        <div className="mx-1 my-2 flex justify-between border shadow rounded py-1 z-10">
          <div className="flex justify-start items-center">
            <input
              className="ml-2 mr-1 radio"
              name="radio-9"
              type="radio"
              checked={todo.completed}
              onChange={() => onCheck(todo.id)}
              disabled
            />
            <p className="text-sm">{todo.text}</p>
          </div>
          <div className="mr-3 flex items-center z-10">
            {/* <button
              className="rounded-full bg-white hover:bg-black p-2 text-black hover:text-white border border-black mr-1"
              onClick={() => onEdit(todo.id)}
            >
              <FaPen className="w-3 h-3" />
            </button>
            <button
              className="rounded-full bg-black p-2 text-white"
              onClick={() => onDelete(todo.id)}
            >
              <FaRegTrashAlt className="w-3 h-3" />
            </button> */}
            <h3 className="font-mono text-sm font-bold">3/25</h3>
          </div>
        </div>
      </div>
    ) : (
        //更新画面
        <div className="flex justify-center mt-1" key={todo.id}>
          <input
            className="w-2/3 border border-gray rounded me-1 my-2 text-xs pl-1"
            type="text"
            value={editValue}
            onChange={onEditChange}
          />
          <button
            className="text-xs text-white self-center rounded-md bg-red-400 py-1 my-2 px-2"
            onClick={() => onUpdate(todo.id)}
          >
            Enter
          </button>
        </div>
      );
  });

  return (
    <>
      <header className="text-black bg-white shadow-md">
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
      </header>

{/* メイン */}
      <div className="mx-auto rounded-md flex h-screen">

        {/* サイドバー */}
        <div className="bg-white text-original shadow-md">
          <h3 className="text-center font-bold font-sans text-lg mt-28 mb-10">
          </h3>
          <div className="flex justify-center text-lg font-sans font-bold">
            <div className='flex-col ms-5 me-1 pt-20 mt-1'>


              <IconContext.Provider value={{ size: '23px' }}>
              <div className="py-5 flex text-start me-3"><CgProfile className='self-center me-3' />
              {/* <p className='self-center'>Account</p> */}
              </div>
              <div className="py-5 flex text-start me-3"><FaCheck className='self-center me-3' />
              {/* <p className='self-center'>Done</p> */}
              </div>
              <div className="py-5 flex text-start me-3"><FaRegTrashCan className='self-center me-3' />
              {/* <p className='self-center'>Trash</p> */}
              </div>
              <div className="py-5 flex text-start me-3">
                <RxCalendar className='self-center me-3' />
                {/* <p className='self-center'>Calendar</p> */}
              </div>
              <div className="py-5 flex text-start me-3"><IoMdSettings className='self-center me-3' />
              {/* <p className='self-center'>Setting</p> */}
              </div>
              </IconContext.Provider>
            </div>
          </div>
        </div>

        <div className="w-14"></div>

        {/* フォーム＆各種メニュー */}
        <div className="w-4/12 flex-col justify-center mt-10">
          <div className="pt-32 w-full">
            <h1 className="text-center font-bold font-mono custom-black mb-5">
              Add a new task
            </h1>
            <div className="flex bg-white rounded-md shadow-md justify-center pt-5 pb-5">
              <input
                className="pl-1 text-xs w-2/3 border border-gray border-1 rounded bg-white"
                type="text"
                value={value}
                autoFocus={focus}
                onChange={onChange}
                placeholder={`${selectedOption} + Enter`}
                maxLength={20}
                onKeyDown={handleKeyDown}
              />
              <button
                className="text-white rounded-md bg-black px-3 ml-1 pb-1"
                onClick={addTodo}
              >
                +
              </button>
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

          <div className="mt-20 pt-10">
            <h3 className="text-center mb-4 font-bold font-mono">Setting</h3>
            <div className="h-96 bg-white shadow-md rounded-md">
              <img
                src={settingImage}
                alt="ゴミ箱の画像"
                className="w-1/2 mx-auto pt-16"
              />
              <h3 className="text-center font-bold font-mono text-md">
                Customize your preferences here
              </h3>
            </div>
          </div>
        </div>

        <div className="w-14"></div>

        {/* タスク一覧 */}
        <div className="w-4/12 text-2xl container mt-10 pb-2 mb-5 bg-white shadow-md flex-shrink rounded-md">
          <div className="flex justify-between py-3">
            <h1 className="font-bold text-3xl ml-3">Tasks</h1>
            <p className="text-sm text-gray-500 mr-3 self-center">
              You have {todos.length} tasks
            </p>
          </div>
          {todos.length === 0 && (
            <>
              <h1 className="custom-border-red text-xs font-bold text-white shadow custom-bg-black ps-2 py-1 rounded-sm">
                Today
              </h1>
              <img src={writeImage} className="w-1/2 mx-auto pt-32 mt-10" />
              <h3 className="text-center font-bold font-mono text-md mt-5 ms-5 me-5">
              Time to add your first task!
              </h3>
            </>
          )}
          <div>
            {list}
          </div>
        </div>


        <div className="w-14"></div>

        {/* タスク詳細 */}

        <div className="w-4/12 text-2xl container mt-24 mb-16 bg-white shadow-md flex-shrink rounded-md">
          <div className="flex justify-center pt-10">
            <h1 className="font-bold text-3xl text-center"></h1>
          </div>
              <img src={contentImage} className="w-1/2 mx-auto pt-32 mt-10" />
              <h3 className="text-center font-bold font-mono text-md mt-5 ms-5 me-5">
              Please select a task.
              </h3>
          {todos.length === 0 && (
            <>
              
            </>
          )}
          <div>
          </div>
        </div>

        <div className="w-14"></div>


      </div>
    </>
  );
}

export default App;
