import React, { useContext } from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import { AuthContext } from '../../context/AuthProvider'

const EmployeeDashboard = (props) => {
  const [userData, setUserData, activityLogs, setActivityLogs] = useContext(AuthContext)

  const updateTaskStatus = (taskTitle, newStatus) => {
    const updatedData = userData.map((employee) => {
      if (employee.id === props.data.id) {
        const updatedTasks = employee.tasks.map((task) => {
          if (task.taskTitle === taskTitle) {
            // reset statuses
            const updatedTask = { ...task, active: false, newTask: false, completed: false, failed: false }
            // apply new status
            if (newStatus === 'active') updatedTask.active = true;
            if (newStatus === 'completed') updatedTask.completed = true;
            if (newStatus === 'failed') updatedTask.failed = true;
            return updatedTask;
          }
          return task;
        });

        // Recalculate counts
        const taskCounts = {
          active: updatedTasks.filter(t => t.active).length,
          newTask: updatedTasks.filter(t => t.newTask).length,
          completed: updatedTasks.filter(t => t.completed).length,
          failed: updatedTasks.filter(t => t.failed).length,
        };

        return { ...employee, tasks: updatedTasks, taskCounts };
      }
      return employee;
    });

    setUserData(updatedData);
    localStorage.setItem('employees', JSON.stringify(updatedData));

    // Log activity
    const actionMap = {
        'active': 'accepted',
        'completed': 'completed',
        'failed': 'failed on'
    }
    const log = `${new Date().toLocaleTimeString()} - ${props.data.firstName} ${actionMap[newStatus]} the task "${taskTitle}"`
    const updatedLogs = [log, ...activityLogs].slice(0, 50)
    setActivityLogs(updatedLogs)
    localStorage.setItem('activityLogs', JSON.stringify(updatedLogs))
  };

  return (
    <div className='p-10 bg-transparent h-screen'>
        <Header changeUser={props.changeUser} data={props.data}/>
        <TaskListNumbers data={props.data} />
        <TaskList data={props.data} updateTaskStatus={updateTaskStatus} />
    </div>
  )
}

export default EmployeeDashboard