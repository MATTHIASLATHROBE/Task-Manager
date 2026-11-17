
import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const MainLayout = ({ authUser, onLogoutSuccess }) => {
    return (
        <>
            <Nav
                authUser={authUser}
                onLogoutSuccess={onLogoutSuccess}
            />

            <main>
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
