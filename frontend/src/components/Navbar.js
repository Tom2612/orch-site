import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuth } from '../contexts/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuth();

    const handleClick = () => {
        logout();
    }
    
    return (
        <header>
            <div className="container">
                <Link to='/'><h1>OpenGroups</h1></Link>

                <div className='nav--links'>
                    <Link to='/concerts'>Browse Concerts</Link>
                    <Link to='/all-groups'>All groups</Link>
                    {user && <Link to='/new-concert'>New Concert</Link>}
                </div>

                {user && 
                    <div className='nav--profile'>
                        <Link to='/groups/profile'>{user.email}</Link>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                }

                {!user && 
                    <div className='nav--create'>
                        <Link to='/new-group'>Sign up</Link>
                        <Link to='/login-group'>Log in</Link>
                    </div>
                }
                
            </div>
        </header>
    )
}

export default Navbar;