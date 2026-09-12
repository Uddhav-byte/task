import React, { useState } from 'react'
import Header from '../other/Header'
import ManageTasks from './AdminTabs/ManageTasks'
import ManageEmployees from './AdminTabs/ManageEmployees'
import ActivityFeed from './AdminTabs/ActivityFeed'

const AdminDashboard = (props) => {
    const [activeTab, setActiveTab] = useState('tasks')

    return (
        <div className='min-h-screen w-full p-7 bg-transparent flex flex-col'>
            <Header changeUser={props.changeUser} />
            
            {/* Tabs */}
            <div className='flex gap-4 mt-6 border-b border-gray-600 pb-2'>
                <button onClick={() => setActiveTab('tasks')} className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${activeTab === 'tasks' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}>Manage Tasks</button>
                <button onClick={() => setActiveTab('employees')} className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${activeTab === 'employees' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}>Manage Employees</button>
                <button onClick={() => setActiveTab('activity')} className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${activeTab === 'activity' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}>Activity Logs</button>
            </div>

            {/* Tab Content */}
            <div className='flex-1 mt-6'>
                {activeTab === 'tasks' && <ManageTasks />}
                {activeTab === 'employees' && <ManageEmployees />}
                {activeTab === 'activity' && <ActivityFeed />}
            </div>
        </div>
    )
}

export default AdminDashboard