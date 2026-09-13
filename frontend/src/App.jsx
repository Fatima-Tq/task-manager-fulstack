import {useEffect,useState} from "react";
const API_URL="http://localhost:5000/api/tasks";
function App(){const[tasks,setTasks]=useState([]),[title,setTitle]=useState(""),[loading,setLoading]=useState(true),[error,setError]=useState("");
async function loadTasks(){try{setError("");const r=await fetch(API_URL);if(!r.ok)throw Error();setTasks(await r.json())}catch(e){setError("Backend se connection nahi ho raha. Check karo backend running hai.")}finally{setLoading(false)}}
useEffect(()=>{loadTasks()},[]);
async function addTask(e){e.preventDefault();if(!title.trim())return;try{const r=await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:title.trim()})});if(!r.ok)throw Error();const t=await r.json();setTasks([t,...tasks]);setTitle("")}catch(e){setError("Task add nahi ho saka.")}}
async function toggleTask(task){try{const r=await fetch(`${API_URL}/${task.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({completed:!task.completed})});if(!r.ok)throw Error();const t=await r.json();setTasks(tasks.map(x=>x.id===task.id?t:x))}catch(e){setError("Task update nahi ho saka.")}}
async function deleteTask(id){try{const r=await fetch(`${API_URL}/${id}`,{method:"DELETE"});if(!r.ok)throw Error();setTasks(tasks.filter(x=>x.id!==id))}catch(e){setError("Task delete nahi ho saka.")}}
const completed=tasks.filter(x=>x.completed).length;
return <div className="page"><div className="container"><header className="header"><div><p className="eyebrow">FULL-STACK STUDENT PROJECT</p><h1>Student Task Manager</h1><p className="subtitle">React + Node.js + SQLite</p></div><div className="stats"><strong>{completed}/{tasks.length}</strong><span>completed</span></div></header>
<form className="add-form" onSubmit={addTask}><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Enter a new task..."/><button>Add Task</button></form>{error&&<div className="error">{error}</div>}
<main className="card"><div className="card-header"><h2>My Tasks</h2><button className="refresh" onClick={loadTasks}>Refresh</button></div>{loading?<p className="empty">Loading...</p>:tasks.length===0?<p className="empty">No tasks yet. Add your first task above.</p>:<div className="task-list">{tasks.map(task=><div className={`task ${task.completed?"done":""}`} key={task.id}><button className="check" onClick={()=>toggleTask(task)}>{task.completed?"✓":""}</button><span>{task.title}</span><button className="delete" onClick={()=>deleteTask(task.id)}>Delete</button></div>)}</div>}</main>
<footer><span>Frontend: React</span><span>Backend: Node.js + Express</span><span>Database: SQLite</span></footer></div></div>}
export default App;
