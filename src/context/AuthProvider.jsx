import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    // localStorage.clear()

    const [userData, setUserData] = useState(null)
    const [activityLogs, setActivityLogs] = useState([])

    useEffect(() => {
        setLocalStorage()
        const {employees, activityLogs} = getLocalStorage()
        setUserData(employees)
        setActivityLogs(activityLogs)
    }, [])
    
    

    return (
        <div>
            <AuthContext.Provider value={[userData, setUserData, activityLogs, setActivityLogs]}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider