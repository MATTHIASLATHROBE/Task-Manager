const Home = () => {
    return(
           <main>
                <section className="hero">
                    <article className="hero-content">
                        <h1 className="text-4xl font-bold text-green-600 text-center">
                            Take Control of Your Tasks</h1>
                        <p>
                            Organize your day, track your progress.
                        </p>

                        <button>Get Started</button>
                        <button>Learn More</button>
                    </article>

                    <article className="hero-features">
                        <section className="feature-card">
                            <h2>Manage Tasks</h2>
                            <p>Create and organize your tasks.</p>
                        </section>

                        <section className="feature-card">
                            <h2>Track Progress</h2>
                            <p>See your completed tasks.</p>
                        </section>
                    </article>
                </section>
           </main>
    )
}

export default Home