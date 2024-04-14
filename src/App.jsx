import './App.css'
import { useState } from "react"
import { GrUpdate } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";

let count = 0;

function App() {


  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');

  const [editValue, setEditValue] = useState('');


  const addTodo = () => {
    if(value == '' ) {
      return;
    }

    const newTodos = [...todos, { id: count, text: value, type: "task", completed: false}]
    setTodos(newTodos)
    setValue('')
    count += 1;
  }

  const onUpdate = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, type: "task", text: editValue }
      } else {
        return { ...todo }
      }
    }))
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onEditChange = (e) => {
    setEditValue(e.target.value)
  }


  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }


  const onEdit = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id ) {
          setEditValue(todo.text);
          return { ...todo, type: "form"};
        } else {
          return { ...todo, type: "task"};
        }
      })
    )
  }

  const onCheck = (id) => {
    setTodos(todos.map((todo) => 
      todo.id === id ?
        {...todo, completed: !todo.completed }
        :
        {...todo}
    ))
  }

  const list = todos.map((todo) => {
    return todo.type === "task" ? (
      //デフォルト
      <div key={todo.id}>
        <div className='my-1 flex justify-between border border-red-300'>
          <div className='flex justify-start border border-green-500'>
            <input className='ml-4 mr-2 form-checkbox' type="checkbox" checked={todo.completed} onChange={() => onCheck(todo.id)} />
            <p className='self-center pb-1 text-sm'>{todo.text}</p>
          </div>
          <div className='me-5 mb-3 pt-3 border border-blue-400'>
            <button className='rounded-full bg-green-400 p-3 text-white mr-1' onClick={() => onEdit(todo.id)}>
              <GrUpdate className='w-3 h-3' />
            </button>
            <button className='rounded-full bg-black p-3 text-white' onClick={() => onDelete(todo.id)}>
              <FaRegTrashAlt className='w-3 h-3' />
            </button>
          </div>

        </div>
      </div>
    ) : (
        //更新画面
        <div className='flex justify-center mt-1' key={todo.id}>
          <input className='w-2/3 border border-gray rounded me-1 my-2 text-sm pl-1' type="text" value={editValue} onChange={onEditChange} />
          <button className="text-sm text-white self-center rounded bg-red-400 py-3  my-2 px-3" onClick={() => onUpdate(todo.id)} >
            <GrUpdate />
          </button>
        </div>
      );
  });

  return (
    <div className='max-w-sm bg-white mx-auto rounded-md shadow-lg mt-10'>
      <div className='flex justify-between pt-3'>
        <h1 className='font-bold text-xl ml-3'>Tasks</h1>
        <p className="text-xs text-gray-500 mr-3 self-center">You have {todos.length} tasks</p>
      </div>
      <div className='mt-12 text-2xl container mx-auto'>
        <div className='flex justify-center mt-5 pb-5'>
          <input className='pl-1 text-xs w-2/3 border border-gray border-1 rounded' type="text" value={value} onChange={onChange} placeholder='Add a new task' />
          <button className="text-white rounded-md bg-black px-3 ml-1 pb-1" onClick={addTodo} >+</button>
        </div>

        <div className='w-full'>
          {list}
        </div>

        {/* <div className='flex justify-around mt-12 mb-5'>

          <div className='flex'>
            <p className=''>タスクの数：</p>
            <p>{todos.length}</p>
          </div>

          <div className='flex'>
            <p className=''>完了済み：</p>
            <p>{todos.filter((todo) => todo.completed === true).length}</p>
          </div>

          <div className='flex'>
            <p className=''>未完了：</p>
            <p>{todos.length - todos.filter((todo) => todo.completed === true).length}</p>
          </div>

        </div> */}
      </div>
    </div>
  )
}

export default App
