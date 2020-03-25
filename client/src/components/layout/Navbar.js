import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        
    <nav>
            <Link to="/"><h1><i>LiveShows+</i></h1></Link>
        <ul>

            <li><Link to="/register">Sign Up</Link></li>

            <li><Link to="/login">Login</Link></li>
            
        </ul>
    </nav>
    )
}

export default Navbar;