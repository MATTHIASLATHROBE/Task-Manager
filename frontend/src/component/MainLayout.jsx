import Nav from './Nav'


const MainLayout = ({ children }) => {
    return (
        <>
            <Nav/>
            <main>{children}</main>
        </>
    )
}

export default MainLayout
