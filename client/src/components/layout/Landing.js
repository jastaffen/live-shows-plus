import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return(
        <section>
            <div>
                <h1>LiveShows+</h1>
                <p>Watch full concerts by your favorite artists</p>
                <div>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </section>
    )
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

const msp = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(msp)(Landing);