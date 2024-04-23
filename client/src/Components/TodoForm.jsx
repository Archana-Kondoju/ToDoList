import {useState} from 'react'

// eslint-disable-next-line react/prop-types
export const TodoForm = ({userId}) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value) {
          fetch(`http://localhost:3000/${userId}`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({task:value})
          }).then(res=>res.json()).then((result)=>{ 
            console.log(result);
            if(result.acknowledged===true){
              alert("task added successfully");
            }
            location.reload();
          })
          setValue('');
        }
        else{
          alert("enter yout task");
        }
      };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <div>
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='What is the task today?' />
    <button type="submit" className='todo-btn'>Add Task</button>
      </div>
  </form>
  )
}
