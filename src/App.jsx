import "./App.css";
import { useEffect, useState } from "react";
import writeImage from "../public/628.jpeg";
import settingImage from "../public/681.jpeg";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import EditTask from "./components/EditTask";
import TaskList from "./components/TaskList";
import SideBar from "./components/SideBar";
import DoneTaskList from "./components/DoneTaskList";

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [dateValue, setDateValue] = useState(today);
  const [timeValue, setTimeValue] = useState();
  const [done, setDone] = useState(false);

  //サインアップ関連
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  //ログイン関連
  const [status, setStatus] = useState("session");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //ローディングの管理
  const [isLoading, setIsLoading] = useState(false);

  //サインアップ
  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("https://new-api-1.onrender.com/auth", {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        confirm_success_url: "https://new-api-1.onrender.com/",
      });

      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      console.log(response);

      setStatus("session");

      alert("Registration successful!");
    } catch (error) {
      alert(error.response.data.errors.full_messages.join(", "));
    }

    setIsLoading(false);
  };

  //ログイン
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://new-api-1.onrender.com/auth/sign_in",
        {
          email: loginEmail,
          password: loginPassword,
        }
      );
      setLoginEmail("");
      setLoginPassword("");
      console.log("response");
      console.log(response);
      console.log("response.data");
      console.log(response.data);
      console.log("response.data.data");
      console.log(response.data.data);

      localStorage.setItem("uid", response.data.data["uid"]);
      localStorage.setItem("access-token", response.data.data["access-token"]);
      localStorage.setItem("client", response.data.data["client"]);

      setStatus("account");
      fetch();

      // alert("Login successful!");
    } catch (error) {
      alert(error.response.data.errors.full_messages.json(", "));
    }
    setIsLoading(false);
  };

  // ログアウト
  const handleLogout = () => {
    localStorage.setItem("uid", "");
    localStorage.setItem("access-token", "");
    localStorage.setItem("client", "");
    setStatus("session");
    setActiveTask(false);
    setDone(false);
  };

  // ログイン済みならアカウントページ、未ログインならログインページ
  const handleAccount = () => {
    if (localStorage.getItem("uid")) {
      if (status !== "account") {
        setStatus("account");
      }
      if (form === true) {
        const newFormValue = false;
        localStorage.setItem("form", JSON.parse(newFormValue));
        const storedValue = JSON.parse(localStorage.getItem("form"));
        setForm(storedValue);
      }
    } else {
      setStatus("session");
    }
  };

  // 設定画面、詳細フォームが開いている場合formをfalseにして表示させる
  const handleSetting = () => {
    if (status !== "setting") {
      setStatus("setting");
    }
    if (form === true) {
      const newFormValue = false;
      localStorage.setItem("form", JSON.parse(newFormValue));
      const storedValue = JSON.parse(localStorage.getItem("form"));
      setForm(storedValue);
    }
  };

  // DateのON/OFF
  const anyTimeValue = JSON.parse(localStorage.getItem("anytime"));
  const [anyTime, setAnyTime] = useState(anyTimeValue);

  // フォームの形変更
  const formValue = JSON.parse(localStorage.getItem("form"));
  const [form, setForm] = useState(formValue);

  // 未完了タスクを取得
  const pendingTasks = todos.filter((task) => task.done_date === null);

  const handleDateChange = (e) => {
    setDateValue(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTimeValue(e.target.value);
  };

  // タスクを選択すると詳細フォームを開くようにするときの状態管理
  const [activeTask, setActiveTask] = useState(false);

  // 送信キー切り替えのラジオボタン
  const submitKeyValue = localStorage.getItem("submitKey");
  const [selectedOption, setSelectedOption] = useState(submitKeyValue);
  const options = ["Shift", "Control", "Alt/Cmd"];
  const handleOptionChange = (e) => {
    const newSubmitKey = e.target.value;
    localStorage.setItem("submitKey", newSubmitKey);
    const storedSubmitKey = localStorage.getItem("submitKey");
    setSelectedOption(storedSubmitKey);
  };

  // 削除時の確認フォームの有無
  const confirmValue = localStorage.getItem("confirmValue");
  const [confirmOption, setConfirmOption] = useState(confirmValue);
  const confirmOptions = ["true", "false"];
  const handleConfirmChange = (e) => {
    const newConfirmValue = e.target.value;
    localStorage.setItem("confirmValue", newConfirmValue);
    const storedConfirmValue = localStorage.getItem("confirmValue");
    setConfirmOption(storedConfirmValue);
  };

  const fetch = async () => {
    const res = await axios.get("https://new-api-1.onrender.com//tasks", {
      params: {
        uid: localStorage.getItem("uid"),
      },
    });
    setTodos(res.data);
  };

  useEffect(() => {
    if (!submitKeyValue) {
      setSelectedOption("Shift");
    }
    if (!confirmOption) {
      setConfirmOption("true");
    }
    const uid = localStorage.getItem("uid");
    if (uid) {
      setStatus("account");
    }
    fetch();
  }, []);

  // タスクを追加する処理。（送信ボタンorEnterのどちらかで実行される）
  const addTodo = async () => {
    if (value == "") {
      return;
    }

    await axios.post("https://new-api-1.onrender.com//tasks", {
      title: value,
      body: bodyValue,
      due_date: anyTime ? "2200-12-31" : dateValue,
      due_time: anyTime ? "" : timeValue,
      done_date: "",
      uid: localStorage.getItem("uid"),
    });

    fetch();
    setValue("");
    setBodyValue("");
    setDateValue(today);
    setTimeValue("");
    // setAnyTime(false);
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

  const onDelete = async (id) => {
    if (confirmOption === "true") {
      const result = window.confirm("削除しますか？");
      if (result === true) {
        await axios.delete(`https://new-api-1.onrender.com/tasks/${id}`);
        if (id === activeTask) {
          setActiveTask(false);
        }
        fetch();
      }
    }
    if (confirmOption === "false") {
      await axios.delete(`https://new-api-1.onrender.com/tasks/${id}`);
      if (id === activeTask) {
        setActiveTask(false);
      }
      fetch();
    }
  };

  const onCheck = async (id) => {
    await axios.put(`https://new-api-1.onrender.com//tasks/${id}`, {
      done_date: new Date(),
    });
    fetch();
  };

  const onReturn = async (id) => {
    await axios.put(`https://new-api-1.onrender.com//tasks/${id}`, {
      done_date: "",
    });
    fetch();
  };

  //form切り替え
  const handleForm = () => {
    const newFormValue = !form;
    localStorage.setItem("form", JSON.parse(newFormValue));
    const storedValue = JSON.parse(localStorage.getItem("form"));
    setForm(storedValue);
  };

  //Date切り替え
  const handleDate = () => {
    const newDateValue = !anyTime;
    localStorage.setItem("anytime", JSON.parse(newDateValue));
    const storedDateValue = JSON.parse(localStorage.getItem("anytime"));
    setAnyTime(storedDateValue);
  };

  return (
    <>
      {/* メイン */}
      <div className="mx-auto rounded-md flex justify-center h-screen">
        {/* サイドバー */}

        <SideBar
          done={done}
          setDone={setDone}
          handleAccount={handleAccount}
          handleSetting={handleSetting}
        />

        {/* //余白 */}
        {activeTask ? (
          <div className="w-14"></div>
        ) : (
          <div className="w-14 mx-auto"></div>
        )}

        {/* フォーム＆各種メニュー */}
        <div className="w-[550px] flex-col justify-center pt-10">
          {/* フォーム入力欄 */}
          {localStorage.getItem("uid") && (
            <div className="pt-10 w-full">
              <div className="flex justify-around pb-5">
                <div className=""></div>
                <h1 className="ps-10 font-bold font-mono custom-black self-center">
                  Add a new task
                </h1>
                {/* フォームの切り替えトグル */}
                <div className="form-control">
                  <input
                    type="checkbox"
                    onChange={() => setForm(handleForm)}
                    checked={form}
                    className="toggle"
                  />
                </div>
              </div>

              <div className="bg-white rounded-md shadow-md">
                <div
                  className={`flex flex-col items-center justify-center duration-300 pt-6 ${
                    form ? "pb-6" : "pb-5"
                  }`}
                >
                  {form ? (
                    <input
                      className="outline-inherit ps-1 mt-5 py-2 w-5/6 border border-gray border-1 rounded bg-white"
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
                        className="outline-inherit ps-1 w-3/4 border border-gray border-1 rounded bg-white"
                        type="text"
                        value={value}
                        autoFocus={1}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={
                          form ? "title" : `${selectedOption} + Enter`
                        }
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
                    className={`pt-1 overflow-y-hidden transition-all duration-300 ${
                      form
                        ? "min-h-96 w-full text-center"
                        : "max-h-0 w-full text-center"
                    }`}
                  >
                    <div className="pt-4">
                      <textarea
                        className="outline-inherit ps-1 pt-1 h-64 w-5/6 text-black bg-white  border rounded resize-none"
                        placeholder="## markdown"
                        value={bodyValue}
                        onChange={(e) => setBodyValue(e.target.value)}
                      />
                    </div>

                    {/* 日時フォームと送信ボタン */}
                    <div className="w-5/6 mx-auto flex justify-between pt-7">
                      <div className="self-center">Date ON/OFF</div>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          {/* <span className="label-text">Date ON/OFF</span> */}
                          <input
                            type="checkbox"
                            className="toggle"
                            onChange={handleDate}
                            checked={!anyTime}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-5/6 pt-5 mx-auto flex justify-between text-black">
                      <label htmlFor="date-input">Date</label>
                      <input
                        id="date-input"
                        className={`${anyTime ? "text-gray-300" : ""}`}
                        type="date"
                        value={dateValue}
                        onChange={handleDateChange}
                        disabled={anyTime ? true : false}
                      />
                    </div>
                    <div className="w-5/6 pt-5 pb-5 mx-auto flex justify-between text-black">
                      <label htmlFor="time-input">Time</label>
                      <input
                        id="time-input"
                        className={`${anyTime ? "text-gray-300" : ""}`}
                        type="time"
                        value={timeValue}
                        onChange={handleTimeChange}
                        disabled={anyTime ? true : false}
                      />
                    </div>
                    <button
                      className="rounded w-5/6 py-2 px-4 mt-3 text-white bg-original"
                      onClick={addTodo}
                    >
                      create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 各種設定ウィンドウ */}
          <div className={`${form ? "" : "pt-32"}`}>
            {form || (
              <h3 className="text-center pb-4 font-bold font-mono">
                {status === "session" && <p>Login</p>}
                {status === "registration" && <p>Registration</p>}
                {status === "setting" && <p>Setting</p>}
                {status === "account" && <p>Account</p>}
              </h3>
            )}

            <div
              className={`bg-white shadow-md rounded-md text-center overflow-y-hidden transition-all duration-300 ${
                form ? "h-0" : "h-96"
              }`}
            >
              {/* <img
                  src={settingImage}
                  alt="ゴミ箱の画像"
                  className="w-1/2 mx-auto"
                />
                <h3 className="text-center font-bold font-mono text-md">
                  Customize your preferences here
                </h3> */}
              {/* <h3 className="font-bold font-mono pt-10">
                  送信キー切り替えのラジオボタン
                </h3> */}

              {status === "setting" && (
                <>
                  <div className="pt-32 mx-16 flex justify-between font-sans font-bold">
                    <h3 className="">SubmitKey</h3>
                    <div className="w-1/4 flex">
                      <select
                        value={selectedOption}
                        onChange={handleOptionChange}
                        className="form-select text-sm rounded"
                      >
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="py-14 mx-16 flex justify-between font-sans font-bold">
                    <h3 className="">DeleteConfirmation</h3>
                    <div className="w-1/4 flex">
                      <select
                        value={confirmOption}
                        onChange={handleConfirmChange}
                        className="form-select ps-1 pe-5 text-sm rounded"
                      >
                        {confirmOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
              {status === "account" && (
                <div className="flex-col py-20">
                  <h3 className="pt-16 pb-10 font-bold font-sans">
                    {localStorage.getItem("uid")}
                  </h3>
                  <button
                    onClick={handleLogout}
                    className="py-1 w-5/6 font-sans font-bold text-original"
                  >
                    Logout
                  </button>
                </div>
              )}

              {status === "session" && (
                <>
                  {isLoading ? (
                    <div className="flex flex-col pt-32">
                      <span className="loading loading-bars loading-lg"></span>
                    </div>
                  ) : (
                    <div className="flex flex-col pt-7">
                      {/* <div className="flex">
                  <h3 className="font-bold font-sans px-3 py-1 rounded-ee-md bg-original text-white">LOGIN</h3>
                  </div> */}
                      <input
                        type="email"
                        className="outline-black rounded ps-1 py-1 mt-14 mb-5 border w-5/6 mx-auto"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="Email"
                      />
                      <input
                        type="password"
                        className="outline-black rounded ps-1 py-1 mt-2 mb-5 border w-5/6 mx-auto"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Password"
                      />
                      <button
                        type="submit"
                        className="py-1 my-5 font-sans font-bold rounded w-5/6 mx-auto bg-original text-white"
                        onClick={handleLogin}
                      >
                        Login
                      </button>

                      <button
                        onClick={() => setStatus("registration")}
                        className="pt-14 font-bold font-sans"
                      >
                        Create Account
                      </button>
                    </div>
                  )}
                </>
              )}
              {status === "registration" && (
                <>
                  {isLoading ? (
                    <div className="flex flex-col pt-32">
                      <span className="loading loading-bars loading-lg"></span>
                    </div>
                  ) : (
                    <div className="flex flex-col pt-7">
                      <input
                        type="email"
                        className="outline-black rounded ps-1 py-1 mt-2 mb-5 border w-5/6 mx-auto"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                      <input
                        type="password"
                        className="outline-black rounded ps-1 py-1 mt-2 mb-5 border w-5/6 mx-auto"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                      <input
                        type="password"
                        className="outline-black rounded ps-1 py-1 mt-2 mb-5 border w-5/6 mx-auto"
                        value={passwordConfirmation}
                        onChange={(e) =>
                          setPasswordConfirmation(e.target.value)
                        }
                        placeholder="Password Confirmation"
                      />
                      <button
                        type="submit"
                        className="py-1 my-5 font-sans font-bold rounded w-5/6 mx-auto bg-original text-white"
                        onClick={handleSignUp}
                      >
                        Create
                      </button>

                      <button
                        onClick={() => setStatus("session")}
                        className="pt-10 pb-5 font-bold font-sans"
                      >
                        Login to your account
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className={`w-16 ${activeTask && "mx-auto"}`}></div>

        {/* タスク一覧 */}
        {localStorage.getItem("uid") && (
          <div className="font-sans w-[550px] text-2xl container mt-10 pb-2 mb-5 bg-white shadow-md rounded-md">
            <div className="flex justify-between py-3">
              {localStorage.getItem("uid") ? (
                <h1 className="font-bold text-3xl font-sans ms-3">Tasks</h1>
              ) : (
                <h1 className="font-bold text-3xl font-sans ms-3">Sample</h1>
              )}
              <p className="text-sm text-gray-500 me-3 self-center">
                You have {pendingTasks.length} tasks
              </p>
            </div>
            {pendingTasks.length === 0 ? (
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
              <div className="scrollbar overflow-y-auto">
                <TaskList
                  pendingTasks={pendingTasks}
                  activeTask={activeTask}
                  setActiveTask={setActiveTask}
                  onCheck={onCheck}
                  onDelete={onDelete}
                  done={done}
                />
              </div>
            )}
          </div>
        )}

        {activeTask ? (
          <div className="w-16"></div>
        ) : (
          <div className="w-14 mx-auto"></div>
        )}

        {done ? (
          <>
            <DoneTaskList
              todos={todos}
              onDelete={onDelete}
              onReturn={onReturn}
              setDone={setDone}
              confirmOption={confirmOption}
            />
            <div className="w-14"></div>
          </>
        ) : (
          // タスク詳細
          <div
            className={`${
              activeTask && done === false
                ? "opacity-100 w-[550px]"
                : "opacity-0 w-0"
            } transition-opacity duration-1000 text-2xl container px-3 mt-10 mb-5 bg-white shadow-md flex-shrink rounded-md`}
          >
            <div className="flex justify-end pt-1">
              <button
                className="me-3 self-center font-sans text-gray-400 text-4xl font-normal"
                onClick={() => setActiveTask(false)}
              >
                ×
              </button>
            </div>
            {/* <h1 className="font-bold text-3xl font-sans ps-1 pt-4 pb-5 border-b-4 border-original">View</h1> */}
            {activeTask && (
              <EditTask
                todos={todos}
                setTodos={setTodos}
                setActiveTask={setActiveTask}
                activeTask={activeTask}
              />
            )}
          </div>
        )}

        {activeTask && <div className="w-14 mx-auto"></div>}
      </div>
    </>
  );
}

export default App;
