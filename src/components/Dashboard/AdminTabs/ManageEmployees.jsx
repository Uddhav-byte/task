import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthProvider'

const ManageEmployees = () => {
    const [userData, setUserData] = useContext(AuthContext)

    // Form state
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleAddEmployee = (e) => {
        e.preventDefault()
        const newEmployee = {
            id: Date.now(), // Generate a unique ID
            firstName,
            email,
            password,
            taskCounts: {
                active: 0,
                newTask: 0,
                completed: 0,
                failed: 0
            },
            tasks: []
        }

        const updatedData = [...userData, newEmployee]
        setUserData(updatedData)
        localStorage.setItem('employees', JSON.stringify(updatedData))

        // Reset form
        setFirstName('')
        setEmail('')
        setPassword('')
    }

    const handleDeleteEmployee = (id) => {
        const updatedData = userData.filter(emp => emp.id !== id)
        setUserData(updatedData)
        localStorage.setItem('employees', JSON.stringify(updatedData))
    }

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Add Employee Form */}
            <div className="md:w-1/3 bg-[#1c1c1c] glass p-5 rounded">
                <h2 className="text-xl font-semibold mb-4 text-emerald-400">Add New Employee</h2>
                <form onSubmit={handleAddEmployee} className="flex flex-col gap-3">
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">First Name</label>
                        <input required value={firstName} onChange={e => setFirstName(e.target.value)} type="text" placeholder="John" className="w-full text-sm py-2 px-3 rounded outline-none bg-transparent border border-gray-500 focus:border-emerald-500 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Email</label>
                        <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="john@example.com" className="w-full text-sm py-2 px-3 rounded outline-none bg-transparent border border-gray-500 focus:border-emerald-500 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Password</label>
                        <input required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="123" className="w-full text-sm py-2 px-3 rounded outline-none bg-transparent border border-gray-500 focus:border-emerald-500 transition-colors" />
                    </div>
                    <button type="submit" className="mt-4 bg-emerald-500 hover:bg-emerald-600 transition-colors py-2 rounded font-medium">Add Employee</button>
                </form>
            </div>

            {/* Employee List */}
            <div className="md:w-2/3 bg-[#1c1c1c] glass p-5 rounded overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4 text-emerald-400">Employee List</h2>
                <div className="min-w-max">
                    <div className="bg-emerald-600/50 py-2 px-4 flex justify-between rounded mb-2">
                        <h3 className="text-sm font-medium w-1/4">Name</h3>
                        <h3 className="text-sm font-medium w-1/4">Email</h3>
                        <h3 className="text-sm font-medium w-1/4">Active Tasks</h3>
                        <h3 className="text-sm font-medium w-1/4 text-center">Actions</h3>
                    </div>
                    {userData.map(emp => (
                        <div key={emp.id} className="border border-emerald-500/30 mb-2 py-2 px-4 flex justify-between items-center rounded hover:bg-emerald-500/10 transition-colors">
                            <p className="text-sm w-1/4 truncate">{emp.firstName}</p>
                            <p className="text-sm w-1/4 truncate text-gray-300">{emp.email}</p>
                            <p className="text-sm w-1/4 text-yellow-400 font-semibold">{emp.taskCounts.active}</p>
                            <div className="w-1/4 flex justify-center">
                                <button onClick={() => handleDeleteEmployee(emp.id)} className="bg-red-500/80 hover:bg-red-500 text-xs py-1 px-3 rounded transition-colors">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ManageEmployees
