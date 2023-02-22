import { Link } from 'react-router-dom';

const Navbar = () => {
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
            </div>
        </header>
    )
}

export default Navbar;