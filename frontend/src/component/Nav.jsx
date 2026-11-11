import {Link} from 'react-router-dom'

const Navbar = () => {
    return(
        <nav className="flex justify-between items-center px-8 py-5 
             bg-black text-white">
            <h1 className="text-2xl font-bold">Task Manager</h1>

            <div className="flex gap-6 f  flex-col sm:flex-row">
                <Link className="hover:text-gray-400 transition-colors" to="/">Home</Link>
                <Link className="hover:text-gray-400 transition-colors" to="/login">Login</Link>
                <Link className="hover:text-gray-400 transition-colors" to="/tasks">My Tasks</Link>
            </div>
        </nav>
    )
}

export default Navbar