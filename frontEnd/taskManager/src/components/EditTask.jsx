import React from 'react'
import { useLocation } from 'react-router-dom'
import TaskForm from './TaskForm';

export default function EditTask({updateTask}) {
    const loaction = useLocation();
    const {task} = loaction.state || {}
    
  return (
   <TaskForm header={"Update Task"} item = {task} updateTask={updateTask}/>
  )
}
