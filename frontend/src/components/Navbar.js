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
                <Link to='/new-concert'>New Concert</Link>
                <Link to='/new-group'>New group</Link>
                <Link to='/all-groups'>All groups</Link>
                <Link to='/groups/63ec8e28883c248182c8fe6a'>Profile</Link>
                <Link to='/login-group'>Log in</Link>
                <button onClick={handleClick}>Log out</button>
                {user && <p>{user.email}</p>}
            </div>
        </header>
    )
}

export default Navbar;