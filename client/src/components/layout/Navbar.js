import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ logout, auth: {isAuthenticated, loading} }) => {

    const authLinks = (
        <ul>
            <li>
                <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>Logout</a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="/register">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )
    
    return(
        
        <nav>
            <Link to="/"><h1><i>LiveShows+</i></h1></Link>
            { !loading && (
                <>
                    {isAuthenticated ? authLinks : guestLinks}
                </>
            )}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const msp = state => ({
    auth: state.auth
});

export default connect(msp, { logout })(Navbar);