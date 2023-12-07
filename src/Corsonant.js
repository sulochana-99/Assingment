import React, { useEffect, useState } from 'react';


function Corsonant() {
  const [todos, setToDos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users/1/todos');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setToDos(data);
      } catch (error) {
        setError('Error fetching todos');
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const toggleCompletion = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setToDos(updatedTodos);
  };

  const addTask = () => {
    
    if (newTask.trim() !== '') {
      const newTodo = {
        id: todos.length + 1,
        title: newTask,
        completed: false,
      };
    
      setToDos([...todos, newTodo]);
      setNewTask('');
    }
    else{
      alert("The task Should not be Empty");
    }
  };

  const deleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setToDos(updatedTodos);
  };

  const editTask = (id) => {
    setEditId(id);
    const taskToEdit = todos.find((todo) => todo.id === id);
    setEditedTask(taskToEdit.title);
  };

  const updateTask = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editedTask || todo.title } : todo
    );
    setToDos(updatedTodos);
    setEditId(null);
    setEditedTask('');
  };

  const filteredTodos = showCompleted ? todos.filter((todo) => todo.completed) : todos;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task"
          style={{
            padding: "8px",
            fontSize: "16px",
            marginBottom: "10px",
            marginRight: "10px",
          }}
        />
        <button onClick={addTask} style={{ padding: "8px 12px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",}}>Add Task</button>
      </div>
      <div>
        <button onClick={() => setShowCompleted(!showCompleted)} style={{ padding: "8px 12px",
          fontSize: "16px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginLeft: "30px",
          marginBottom:"20px" }}>
          {showCompleted ? 'Show All Tasks' : 'Show Completed Tasks'}
        </button>
        
      </div>
      
     
      {filteredTodos.length === 0 ? (
  <div>No tasks found</div>
) : (
  <ul className="list-group" >
    {filteredTodos.map((todo) => (
      <li 
        key={todo.id}
        className={`list-group-item ${
          todo.completed ? 'list-group-item-success' : 'list-group-item-danger'
        }`}
        style={{cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'  ,marginLeft:"20px"}}
      >
        {editId === todo.id ? (
          <>
            <input
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              placeholder="Edit Task"
            />
            <button className="btn btn-secondary"  style={{marginInlineStart:"20px"}} onClick={() => updateTask(todo.id)}>
              Update
            </button>
          </>
        ) : (
          <>
            <strong style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</strong> -{' '}
            <div>
              <button className="btn btn-light" onClick={() => toggleCompletion(todo.id)}>
                {todo.completed ? 'Completed' : 'Not Completed'}
              </button>
              <button className="btn btn-danger" style={{marginInlineStart:"20px"}}  onClick={() => deleteTask(todo.id)}>
                Delete
              </button>
              <button className="btn btn-secondary" style={{marginInlineStart:"20px"}} onClick={() => editTask(todo.id)}>
                Edit
              </button>
            </div>
          </>
        )}
      </li>
    ))}
  </ul>
)}
    </div>
    
  );

}

export default Corsonant;
