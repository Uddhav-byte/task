import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthProvider'

const ActivityFeed = () => {
    const [, , activityLogs] = useContext(AuthContext)

    return (
        <div className="bg-[#1c1c1c] glass p-5 rounded h-full">
            <h2 className="text-xl font-semibold mb-4 text-emerald-400">Recent Activity Logs</h2>
            
            <div className="flex flex-col gap-3 h-[70vh] overflow-y-auto pr-2">
                {activityLogs.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10">No activity recorded yet.</div>
                ) : (
                    activityLogs.map((log, idx) => {
                        // Extract time and message assuming format "HH:MM:SS AM - Message"
                        const splitIdx = log.indexOf(' - ');
                        const time = splitIdx > -1 ? log.substring(0, splitIdx) : '';
                        const msg = splitIdx > -1 ? log.substring(splitIdx + 3) : log;

                        return (
                            <div key={idx} className="flex gap-4 items-center bg-gray-800/50 p-3 rounded border-l-4 border-emerald-500">
                                <div className="text-xs text-gray-400 min-w-[80px]">{time}</div>
                                <div className="text-sm text-gray-200">{msg}</div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default ActivityFeed
