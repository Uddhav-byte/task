import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthProvider'
import CreateTask from '../../other/CreateTask'

const ManageTasks = () => {
    const [userData, setUserData, activityLogs, setActivityLogs] = useContext(AuthContext)

    const [filterEmployee, setFilterEmployee] = useState('All')
    const [filterStatus, setFilterStatus] = useState('All')

    const handleDeleteTask = (employeeId, taskTitle) => {
        const updatedData = userData.map(emp => {
            if (emp.id === employeeId) {
                const updatedTasks = emp.tasks.filter(t => t.taskTitle !== taskTitle);
                // Recalculate counts
                const taskCounts = {
                    active: updatedTasks.filter(t => t.active).length,
                    newTask: updatedTasks.filter(t => t.newTask).length,
                    completed: updatedTasks.filter(t => t.completed).length,
                    failed: updatedTasks.filter(t => t.failed).length,
                };
                return { ...emp, tasks: updatedTasks, taskCounts }
            }
            return emp
        })

        setUserData(updatedData)
        localStorage.setItem('employees', JSON.stringify(updatedData))

        // Log the activity
        const employeeName = userData.find(e => e.id === employeeId)?.firstName || 'Employee';
        const log = `${new Date().toLocaleTimeString()} - Admin deleted task "${taskTitle}" from ${employeeName}`
        const updatedLogs = [log, ...activityLogs].slice(0, 50)
        setActivityLogs(updatedLogs)
        localStorage.setItem('activityLogs', JSON.stringify(updatedLogs))
    }

    // Flatten tasks for the list
    const allTasks = userData.flatMap(emp => 
        emp.tasks.map(task => ({ ...task, employeeId: emp.id, employeeName: emp.firstName }))
    );

    // Apply filters
    const filteredTasks = allTasks.filter(task => {
        const matchEmployee = filterEmployee === 'All' || task.employeeName === filterEmployee;
        const matchStatus = filterStatus === 'All' || 
            (filterStatus === 'New' && task.newTask) ||
            (filterStatus === 'Active' && task.active) ||
            (filterStatus === 'Completed' && task.completed) ||
            (filterStatus === 'Failed' && task.failed);
        
        return matchEmployee && matchStatus;
    });

    return (
        <div className="flex flex-col gap-6">
            <CreateTask />

            <div className="bg-[#1c1c1c] glass p-5 rounded mt-4 overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-emerald-400">All Tasks List</h2>
                    <div className="flex gap-4">
                        <select value={filterEmployee} onChange={(e) => setFilterEmployee(e.target.value)} className="bg-transparent border border-gray-500 rounded py-1 px-2 text-sm outline-none focus:border-emerald-500 transition-colors">
                            <option className="text-black" value="All">All Employees</option>
                            {userData.map(emp => (
                                <option className="text-black" key={emp.id} value={emp.firstName}>{emp.firstName}</option>
                            ))}
                        </select>
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-transparent border border-gray-500 rounded py-1 px-2 text-sm outline-none focus:border-emerald-500 transition-colors">
                            <option className="text-black" value="All">All Statuses</option>
                            <option className="text-black" value="New">New</option>
                            <option className="text-black" value="Active">Active</option>
                            <option className="text-black" value="Completed">Completed</option>
                            <option className="text-black" value="Failed">Failed</option>
                        </select>
                    </div>
                </div>

                <div className="min-w-max">
                    <div className="bg-emerald-600/50 py-2 px-4 flex justify-between rounded mb-2">
                        <h3 className="text-sm font-medium w-1/5">Task Title</h3>
                        <h3 className="text-sm font-medium w-1/5">Employee</h3>
                        <h3 className="text-sm font-medium w-1/5">Date</h3>
                        <h3 className="text-sm font-medium w-1/5">Status</h3>
                        <h3 className="text-sm font-medium w-1/5 text-center">Actions</h3>
                    </div>

                    {filteredTasks.map((task, idx) => {
                        let statusText = 'Unknown';
                        let statusColor = 'text-gray-400';
                        if (task.newTask) { statusText = 'New'; statusColor = 'text-blue-400'; }
                        if (task.active) { statusText = 'Active'; statusColor = 'text-yellow-400'; }
                        if (task.completed) { statusText = 'Completed'; statusColor = 'text-green-400'; }
                        if (task.failed) { statusText = 'Failed'; statusColor = 'text-red-500'; }

                        return (
                            <div key={idx} className="border border-emerald-500/30 mb-2 py-2 px-4 flex justify-between items-center rounded hover:bg-emerald-500/10 transition-colors">
                                <p className="text-sm w-1/5 truncate" title={task.taskTitle}>{task.taskTitle}</p>
                                <p className="text-sm w-1/5 truncate">{task.employeeName}</p>
                                <p className="text-sm w-1/5 truncate">{task.taskDate}</p>
                                <p className={`text-sm w-1/5 font-semibold ${statusColor}`}>{statusText}</p>
                                <div className="w-1/5 flex justify-center gap-2">
                                    <button onClick={() => handleDeleteTask(task.employeeId, task.taskTitle)} className="bg-red-500/80 hover:bg-red-500 text-xs py-1 px-3 rounded transition-colors">Delete</button>
                                </div>
                            </div>
                        )
                    })}
                    {filteredTasks.length === 0 && (
                        <div className="text-center text-gray-400 mt-4 text-sm">No tasks found matching your filters.</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ManageTasks
