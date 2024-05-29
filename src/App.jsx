import { useEffect, useState } from 'react'
import Navbar from './component/Navbar'
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showChecked, setshowChecked] = useState(true)
  const [mode, setmode] = useState("dark")

  
  const saveToLS = ()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }  

  useEffect(() => {
    let todosString = localStorage.getItem("todos");
    if(todosString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);
    }
  }, [])
  

  const HandleAdd = () => {
    setTodos([...todos,{id:uuidv4(),todo, iscompleted:false}])
    setTodo("");
    saveToLS();
  }
  const HandleChange = (e) => {
    setTodo(e.target.value);
  }
  const HandleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos);
    saveToLS();

  }
  
  const HandleDelete = (e,id) => {
     let newTodos = todos.filter(item=>
    {
      return item.id!==id;
    })
    setTodos(newTodos);
    saveToLS();

  }
  const HandleEdit = (e,id) => {
    let t = todos.filter(i=>{
     return i.id == id
    })
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>
      {
        return item.id!==id;
      })
      setTodos(newTodos);
      saveToLS();
  }
  const onShowChecked = () => {
    setshowChecked(!showChecked);
  }

  const changeMode = () => {
    mode==="light"?setmode("dark"):setmode("light");
    console.log(mode);
  }
  
  
  return (
    <>
        <Navbar mode={mode} changeMode={changeMode} />
      <div className={mode==="dark"?"bg-violet-300 container mx-auto rounded-xl p-4 my-8 min-h-96 max-w-screen-xl":"bg-blue-950 text-white container mx-auto rounded-xl p-4 my-8 min-h-96 max-w-screen-xl"}>
        <div className='flex flex-col items-center'>
          <h2 className='font-bold text-3xl m-2'>Add Task</h2>
          <div className='min-w-full flex justify-center items-center'>
            <input onChange={HandleChange} placeholder='Enter your task here..' value={todo} type="text" className={mode==="dark"?"w-1/2 rounded-md p-1 my-2":"w-1/2 rounded-md p-1 my-2 bg-sky-900"} />
            <button onClick={HandleAdd}  className='bg-violet-900 hover:bg-violet-950 text-white w-16 h-9 px-2 rounded-md mx-5 font-bold text-sm cursor-pointer' disabled={todo.length<=3} > Save </button></div>
        </div>
          <div>
          <input type="checkbox"  onChange={onShowChecked} className='ml-5 min-h-4 min-w-4 mr-2 mt-10' checked={showChecked} />Show completed task</div>
        <div className=" ml-5 flex flex-col items-center">
        <h1 className='font-bold text-2xl ml-3.5 my-5'>Your Todos</h1>
          <div className='todos flex flex-col w-3/4 items-center'>
            {todos.length===0 && <div className='font-bold text-lg text-orange-700 m-4'>Nothing to show!! Add some task to display..</div> }
        {todos.map(item=>{
            return (showChecked || !item.iscompleted)&& <div key={item.id} className="flex justify-between items-center w-full p-2 m-2 bg-purple-400 rounded-md ">
               <input type="checkbox" className='min-h-4 min-w-4 mr-4'  name={item.id} onChange={HandleCheckbox} checked={item.iscompleted}  />
              <div className={item.iscompleted?"line-through text-lg":"text-lg"}>{item.todo}</div>
              <div className='buttons flex h-full'>
                <button onClick={(e)=>{HandleEdit(e,item.id)}} className='bg-violet-900 hover:bg-violet-950 text-white py-1 px-2 rounded-md m-1 font-bold text-lg '><RiEdit2Fill /></button>
                <button onClick={(e)=>{HandleDelete(e,item.id)}} className='bg-violet-900 hover:bg-violet-950 text-white py-1 px-2 rounded-md m-1 font-bold text-lg'><MdDelete /></button>
              </div>
            </div>
        })}
        </div>
        </div>
      </div>
    </>
  )
}

export default App
