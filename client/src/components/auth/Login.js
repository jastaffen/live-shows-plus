import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import FormField from '../FormField';



const Login = ({ login, isAuthenticated }) => {
    console.log(isAuthenticated);
    const [log, setlog] = useState({
        email: '',
        password: ''
    });
    const { email, password } = log;

    const handleChange = e => {
        setlog({
            ...log,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        login(email, password);
    }

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return(
        <form onSubmit={handleSubmit}>
            <FormField type="text" value={email}
            name="email" handleChange={handleChange} required={"required"} />
            <FormField type="password" value={password}
            name="password" handleChange={handleChange} required={"required"} />
            <button type="submit" onClick={handleSubmit}>Login</button>
            <p>
                Don't have an account? <Link to='/register'>Sign up</Link>
            </p>
        </form>
    )
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const msp = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(msp, { login })(Login);