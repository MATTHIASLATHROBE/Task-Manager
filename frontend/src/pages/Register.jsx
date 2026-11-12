import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authServices';

const Register = () => {

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const navigate = useNavigate()

    const togglePassword = () => {
        setPasswordVisible((prev) => !prev)
    }

   const handleSubmit = async(e) => {
    e.preventDefault()

    if (!formData.password || !formData.confirmPassword) {
        setError("Please enter and confirm your password.")
        return
    }

    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.")
        return
    }
    setError("")
    try {
    const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
    });
    setError("");

    setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    alert(response.message);
    navigate('/dashboard')
    } catch (error) {
        setError(error.message);
    }

    }

    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

    const toggleConfirmPassword = () => {
        setConfirmPasswordVisible((prev) => !prev)
    }


    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-8">

            <section className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-6 sm:p-8">

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">
                        Create Your Account
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Join us and start organizing your tasks.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your full name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    name: e.target.value
                                }))
                            }
                            className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white outline-none focus:border-green-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            required
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
                        <label htmlFor="password" className="text-sm font-medium">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                placeholder="Create a password"
                                required
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        password: e.target.value
                                    }))
                                }
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

                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        confirmPassword: e.target.value
                                    }))
                                }
                                className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 pr-16 text-white outline-none focus:border-green-500"
                            />

                            <button
                                type="button"
                                onClick={toggleConfirmPassword}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-green-500 hover:text-green-400"
                            >
                                {confirmPasswordVisible ? "Hide" : "Show"}
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
                        className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
                    >
                        Create Account
                    </button>
                    <p className="text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-green-500 hover:text-green-400 transition-colors"
                        >
                            Log in
                        </Link>
                    </p>
                </form>

            </section>

        </main>
    )
}

export default Register