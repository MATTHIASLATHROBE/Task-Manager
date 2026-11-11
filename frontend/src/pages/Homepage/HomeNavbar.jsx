import { Link } from 'react-router-dom'

const HomeNavbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 sm:px-6 md:px-12 py-4 sm:py-5 bg-black text-white border-b-2 border-gray-800">
      <h1 className="text-xl sm:text-2xl font-bold">
        <Link to="/">Task Manager</Link>
      </h1>

      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          to="/register"
          className="whitespace-nowrap bg-green-600 text-white px-3 py-2 text-sm sm:px-5 sm:text-base rounded-md hover:bg-green-700 transition-colors">
          Get Started
        </Link>

        <Link
          to="/login"
          className="whitespace-nowrap text-white px-3 py-2 text-sm sm:px-5 sm:text-base rounded-md border border-gray-600 hover:bg-slate-800 transition-colors">
          Login
        </Link>
      </div>
    </nav>
  )
}

export default HomeNavbar