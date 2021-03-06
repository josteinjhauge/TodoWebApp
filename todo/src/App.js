import React, {useState} from 'react';
import './index.css';
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import {nanoid} from 'nanoid'

function App(props) {

  const [tasks, setTasks] = useState(props.tasks)

  function addTask(name) {
    const newTask = {id: "todo-" + nanoid(), name: name, completed: false}
    setTasks([...tasks, newTask])
  }

  function toggleTaskComplete(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    })
    setTasks(updatedTasks)
  }

  function deleteTask(id) {
    console.log(id)
    const remainingTaks = tasks.filter(task => id !== task.id);
    setTasks(remainingTaks)
  }

  const taskList = tasks.map(task => (
    <Todo 
      id={task.id}
      name={task.name}
      completed={task.completed} 
      key={task.id}
      toggleTaskComplete={toggleTaskComplete}
      deleteTask={deleteTask}
      />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${taskList.length} ${tasksNoun} remaining`
  
  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">
       {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
       {taskList}
      </ul>
    </div>
  );
}

export default App;
