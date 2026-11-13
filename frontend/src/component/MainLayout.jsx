
import { Outlet } from 'react-router-dom'
import Nav from './Nav'

const MainLayout = ({ onLogoutSuccess }) => {
    return (
        <>
            <Nav onLogoutSuccess={onLogoutSuccess} />

            <main>
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout
