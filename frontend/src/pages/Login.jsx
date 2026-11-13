import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginUser } from '../services/authServices'

const Login = ({ onLoginSuccess }) => {

    const [passwordVisible, setPasswordVisible] = useState(false)
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const togglePassword = () => {
    setPasswordVisible((prev) => !prev)
    }

    const [formData, setFormData] = useState({
    email: "",
    password: ""
    })

const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoggingIn(true);

    try {
        const response = await loginUser(formData);

        console.log(response.message);

        await onLoginSuccess();

        setFormData({
            email: "",
            password: ""
        });

        navigate('/dashboard');

    } catch (error) {
        setError(error.message);

    } finally {
        setIsLoggingIn(false);
    }
};

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">

            <section className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-6 sm:p-8">

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">
                        Welcome Back
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Log in to continue managing your tasks.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    email: e.target.value
                                }))
                            }
                            className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white outline-none focus:border-green-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password</label>

                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                required
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        password: e.target.value
                                    }))}
                                className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 pr-16 text-white outline-none focus:border-green-500"
                            />

                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-green-500 hover:text-green-400"
                            >
                                {passwordVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoggingIn ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-sm text-gray-400 text-center">
                        Don't have an account?
                        <Link to="/register" className="text-green-500 hover:text-green-400 ml-1">
                            Register
                        </Link>
                    </p>
                </form>
            </section>
        </main>
    )
}

export default Login