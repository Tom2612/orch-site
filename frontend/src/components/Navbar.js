import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuth();

    const handleClick = () => {
        logout();
    }
    
    return (
        <header>
            <div className="container">
                <Link to='/'><h1>Orchestra Site</h1></Link>
                <Link to='/concerts'>Concerts</Link>
                <Link to='/all-groups'>All groups</Link>
                {user && <Link to='/new-concert'>New Concert</Link>}
                {user && <Link to='/groups/profile'>Profile</Link>}
                {user && <p>{user.email}</p>}
                {user && <button onClick={handleClick}>Log out</button>}
                {!user && <Link to='/new-group'>Sign up</Link>}
                {!user && <Link to='/login-group'>Log in</Link>}
                
            </div>
        </header>
    )
}

export default Navbar;