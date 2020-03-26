import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import FormField from '../FormField';



const Login = () => {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
    const { email, password } = login;

    const handleChange = e => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('SUCCESS');
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

export default Login;