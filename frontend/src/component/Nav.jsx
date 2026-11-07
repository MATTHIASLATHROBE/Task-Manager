import {Link} from 'react-router-dom'

const Navbar = () => {
    return(
        <nav>
            <h1>Task Manager</h1>

            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/tasks">My Tasks</Link>
        </nav>
    )
}

export default Navbar