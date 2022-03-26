import  React,{useEffect,useState} from 'react'
// import axios from 'axios'
import './App.css';


function App() {
  const [todos,setTodos]=useState([])
  console.log(todos);
  const [todo,setTodo]=useState('')

  const [searchQuery,setsearchQuery]=useState('')


  const fetchTodos=()=>{
    fetch("http://localhost:4000/api/todos")
    .then(data=>data.json()) 
    .then(data=>setTodos(data.data.todos),)
  // axios.get("http://localhost:5000/api/todos")
  //   .then((res)=>res.json())
  //   .then((res)=>setTodos(todos))
    
    
    
    .catch(err=>console.log(err))

  }

const addTodo = () => {
  fetch(`http://localhost:4000/api/todos?searchQuery=${searchQuery}` ,{
    method:"post",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify({
text:todo
    })
  })
  .then(res=>res.json())
  .then(data=>console.log(data))
  .then(fetchTodos())
 
  .catch(err=>console.log(err))
}
  useEffect(()=>{
  fetchTodos();

  },[searchQuery])

  return (   
       <div className="App">
     {todos.map(todo=><p>{todo.text}</p>)}
    <h1>TODO LIST</h1>
    <input type="text" placeholder="search" onChange={e=>setsearchQuery(e.target.value)}/>
     <input type="text" placeholder="addtodo" onChange={e=>setTodo(e.target.value)}/>
     <button onClick={addTodo}>ADD</button>
     <ul>
       {todos.map(todo => <li>{todo.text}</li>)}
     </ul>
    
     
 
      </div>
  )
  }

export default App;