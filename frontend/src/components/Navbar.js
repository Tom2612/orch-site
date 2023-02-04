import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to='/'><h1>Orchestra Site</h1></Link>
                <Link to='/concerts'>Concerts</Link>
                <Link to='/new-concert'>New Concert</Link>
                <Link to='/new-group'>New group</Link>
            </div>
        </header>
    )
}

export default Navbar;