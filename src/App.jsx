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
        <div className='mx-2 my-2 flex justify-between'>
          <div className='flex justify-start items-center'>
            <input 
              className='ml-2 mr-1 form-checkbox' 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => onCheck(todo.id)} 
            />
            <p className='text-sm'>{todo.text}</p>
          </div>
          <div className='mr-3 flex items-center'>
            <button className='rounded-full bg-green-400 p-2 text-white mr-1' onClick={() => onEdit(todo.id)}>
              <GrUpdate className='w-3 h-3' />
            </button>
            <button className='rounded-full bg-black p-2 text-white' onClick={() => onDelete(todo.id)}>
              <FaRegTrashAlt className='w-3 h-3' />
            </button>
          </div>

        </div>
      </div>
    ) : (
        //更新画面
        <div className='flex justify-center mt-1' key={todo.id}>
          <input className='w-2/3 border border-gray rounded me-1 my-2 text-xs pl-1' type="text" value={editValue} onChange={onEditChange} />
          <button className="text-xs text-white self-center rounded-md bg-red-400 py-1 my-2 px-2" onClick={() => onUpdate(todo.id)} >
            update
          </button>
        </div>
      );
  });

  return (
    <div className='max-w-sm bg-white mx-auto rounded-md shadow-lg mt-10'>
      <div className='flex justify-between pt-3 border-4 border-blue-300'>
        <h1 className='font-bold text-xl ml-3'>Tasks</h1>
        <p className="text-xs text-gray-500 mr-3 self-center">You have {todos.length} tasks</p>
      </div>

      <div className='flex justify-center pt-5 pb-5 border-4 border-green-300'>
        <input className='pl-1 text-xs w-2/3 border border-gray border-1 rounded' type="text" value={value} onChange={onChange} placeholder='Add a new task' maxLength={20} />
        <button className="text-white rounded-md bg-black px-3 ml-1 pb-1" onClick={addTodo} >+</button>
      </div>


      <div className='text-2xl container mx-auto pb-2 border-4 border-red-300'>
          {list}
      </div>

    </div>
  )
}

export default App
