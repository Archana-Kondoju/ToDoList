/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { FaPenToSquare } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { signOut } from 'firebase/auth';
import { auth } from "./firebase/firebase.config";
import { useNavigate } from "react-router-dom";

export const TodoWrapper = () => {
  const navigate=useNavigate();
  const [todos, setTodos] = useState([]);
  const [isLoggedIn,setIsLoggedIn]=useState(true);

  const user=localStorage.getItem('user');
  const userData = JSON.parse(user);
  const userId = userData.uid;

  useEffect(() => {
    fetch(`http://localhost:3000/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, [userId]);
  
  const handleLogOut = async()=>{
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  }
  const deleteTodo = (id) =>{
    console.log(id);
    fetch(`http://localhost:3000/${userId}/${id}`,{
      method:'DELETE' 
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.acknowledged===true){
              alert("task deleted successfully");
            }
        location.reload();
      });    
  } 
  return (
    <div className="TodoWrapper">
      <h1 className="text">Get Things Done!</h1>
      <TodoForm userId={userId} todos={todos} />      
      {todos.length===0?<div><h2>No tasks to do!!</h2></div>:
      todos.map((todo) =>
          (<li key={todo._id} className="list-without-dot">
          <div key={todo._id} className="Todo">
      <div className='me-auto flex-item'>
        <p>{todo.task}</p>       
      </div>
        <div className='flex-item'>
        <FaPenToSquare className="edit-icon"/>
        </div>
        <div className='flex-item'>
        <FaTrash className="delete-icon" onClick={() => deleteTodo(todo._id)} />
        </div>
    </div>
        </li>
        )
      )}
       <div className='log-out'><button onClick={handleLogOut}>Log Out</button></div>
    </div>
  );
};
