
const TaskStats = ({ totalTasks, completedTasks, pendingTasks }) => {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-5">
                Task Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                {/* Total Tasks */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <p className="text-gray-400 text-sm mb-2">
                        Total Tasks
                    </p>
                    <h3 className="text-3xl font-bold text-white">
                        {totalTasks}
                    </h3>
                </div>

                {/* Completed Tasks */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <p className="text-gray-400 text-sm mb-2">
                        Completed Tasks
                    </p>
                    <h3 className="text-3xl font-bold text-green-500">
                        {completedTasks}
                    </h3>
                </div>

                {/* Pending Tasks */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <p className="text-gray-400 text-sm mb-2">
                        Pending Tasks
                    </p>
                    <h3 className="text-3xl font-bold text-yellow-500">
                        {pendingTasks}
                    </h3>
                </div>

            </div>
        </section>
    )
}

export default TaskStats
