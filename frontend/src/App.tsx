import React, {useState, useEffect} from 'react'
import axiosInstance from './axios'
import './App.css'

function App() {
  const path = import.meta.env.VITE_URL;
  const [response, setResponse] = useState<{ id: number, title: string; body: string }[] | null>(null);
  const [todo, setTodo] = useState<{ title: string; body: string }>({ title: '', body: '' });
  const [updatetodo, setUpdateTodo] = useState<{ title: string; body: string }>({ title: '', body: '' });
  const [visibility, setIsVisible] = useState<{ [key: number]: boolean }>({});

  const updateVisibility = (id: number) => {
    setIsVisible(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  //axios get request
  useEffect(() => {
    // get answer
    axiosInstance.get(path)
    .then((res) => {
      setResponse(res.data);
    })  
    .catch((error) => {
      console.log(error);
    });
  }, [path]);
  
  const postTodo = (e: React.FormEvent) => {
    e.preventDefault();
    // post request
    axiosInstance.post(path + '/', {
      title: todo.title,
      body: todo.body
    })
    .then((res) => {
      console.log(res.data);
      setTodo({ title: '', body: '' });
      setResponse((prev) => [...(prev || []), res.data]);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const modifyTodo = (id: number) => {
    // modify request
    axiosInstance.put(`${path}/${id}`, {
      title: updatetodo.title,
      body: updatetodo.body
    })
    .then((res) => {
      console.log(res.data);
      setUpdateTodo({ title: '', body: '' });
      setResponse((prev) => {
        if (!prev) return null;
        // Update the specific item in the response list
        return prev.map((item) => (item.id === id ? res.data : item));
      });
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const deleteTodo = (id: number) => {
    // delete request
    axiosInstance.delete(`${path}/${id}`)
    .then((res) => {
      console.log(res.data);
      setResponse((prev) => {
        // Filter out the deleted item by its id
        return prev ? prev.filter((item) => item.id !== id) : null;
      });
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  return (
    <div>
      <h1>Todo List</h1>
      <p>API URL: {path}</p>

      <form className="todo" onSubmit={postTodo}>
        <input 
          type="text" 
          placeholder="Title" 
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })} 
        />
        <textarea 
          placeholder="Body"
          value={todo.body}
          onChange={(e) => setTodo({ ...todo, body: e.target.value })}
        />
        <button className="update-button">
          Submit
        </button>
      </form>

      {/* Development */}
      {window.location.port === '5173' && ( 
        <div>
          {/* 1. todo */}
          <div className="todo">
            <div className="todo-header">
              <div>
                {visibility[0] ? (
                  <button className="update-button" onClick={() => setIsVisible({0: false})}>Update</button>
                ) : (
                  <button className="update-button" onClick={() => updateVisibility(0)}>Edit</button>
                )}
                <button className="delete-button" onClick={() => null}>Delete</button>
              </div>
              <div></div>
              <div style={{marginRight: '10px'}}>ID: 0</div>
            </div>
            {visibility[0] ? (
              <form onSubmit={() => null}>
                <h2><input type="text" placeholder="Title" onChange={(e) => setTodo({ ...todo, title: e.target.value })} /></h2>
                <hr />
                <p><input type="text" placeholder="Body" onChange={(e) => setTodo({ ...todo, body: e.target.value })}/></p>
              </form>
            ) : (
              <div>
                <h2>[ Title ] : Hello World</h2>
                <hr />
                <p>[ Body ] : Create a hello world!</p>
              </div>
            )}
          </div>
          {/* 2. todo */}
          <div className="todo">
            <div className="todo-header">
              <div>
                {visibility[1] ? (
                  <button className="update-button" onClick={() => setIsVisible({1: false})}>Update</button>
                ) : (
                  <button className="update-button" onClick={() => updateVisibility(1)}>Edit</button>
                )}
                <button className="delete-button" onClick={() => null}>Delete</button>
              </div>
              <div></div>
              <div style={{marginRight: '10px'}}>ID: 1</div>
            </div>
            {visibility[1] ? (
              <form onSubmit={() => null}>
                <h2><input type="text" placeholder="Title" onChange={(e) => setTodo({ ...todo, title: e.target.value })} /></h2>
                <hr />
                <p><input type="text" placeholder="Body" onChange={(e) => setTodo({ ...todo, body: e.target.value })}/></p>
              </form>
            ) : (
              <div>
                <h2>[ Title ] : First Todo</h2>
                <hr />
                <p>[ Body ] : Think about a new todo or nothing to do!</p>
              </div>
            )}
          </div>
        </div>
      )}
        
      {response && response.map((item, index) => (
      <>
        <div className="todo">
          <div className="todo-header">
            <div>
              {visibility[index] ? (
                <button className="update-button" onClick={() => { modifyTodo(item.id); updateVisibility(index);}}>Update</button>
              ) : (
                <button className="update-button" onClick={() => updateVisibility(index)}>Edit</button>
              )}
              <button className="delete-button" onClick={() => deleteTodo(item.id)}>Delete</button>
            </div>
            <div>Index: {index}</div>
            <div style={{marginRight: '10px'}}>ID: {item.id}</div>
          </div>
          {visibility[index] ? (
            <form>
              <h2><input type="text" placeholder="Title" 
              onChange={(e) => setUpdateTodo({ ...updatetodo, title: e.target.value })} 
              /></h2>
              <hr />
              <p><input type="text" placeholder="Body" 
              onChange={(e) => setUpdateTodo({ ...updatetodo, body: e.target.value })}
              /></p>
            </form>
          ) : (
            <div>
              <h2>[ Title ] : {item.title}</h2>
              <hr />
              <p>[ Body ] : {item.body}</p>
            </div>
          )}
        </div>
      </>
    ))}
    </div>
  )
}

export default App
