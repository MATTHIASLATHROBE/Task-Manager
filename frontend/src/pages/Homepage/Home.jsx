import { Link } from 'react-router-dom'

const Home = () => {
    return(
           <main className=" bg-black text-white">
               <section className="min-h-screen max-w-5xl mx-auto px-4 sm:px-6 py-16">
                    <article className="flex flex-col items-center text-center gap-1">
                       <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
                            <span className="text-green-500">Take Control</span>
                            {" "}of Your Tasks
                        </h1>

                       <p className="text-sm sm:text-base md:text-lg text-gray-300 text-center">
                            Organize your day, track your progress.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Link className="bg-green-600 px-5 py-0.5 rounded-lg font-medium hover:bg-green-700 transition-colors" to="/register">
                                Get Started
                            </Link>
                            <button className="border border-gray-500 text-white px-5 py-0.5 rounded-lg hover:text-gray-400 transition">
                                Learn More
                            </button>
                        </div>
                    </article>

                    <article className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-12 sm:mt-16 items-stretch">
                        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 sm:p-8 hover:border-green-600 transition-colors">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2">
                                Manage Tasks</h2>
                            <p  className="text-sm text-gray-400 leading-relaxed">
                                Create and organize your tasks.</p>
                        </section>

                        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 sm:p-8 hover:border-green-600 transition-colors">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2">
                                Track Progress</h2>
                            <p  className="text-sm text-gray-400 leading-relaxed">
                                See your completed tasks.</p>
                        </section>
                    </article>
                </section>
           </main>
    )
}

export default Home