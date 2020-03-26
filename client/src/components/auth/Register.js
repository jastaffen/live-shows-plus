import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import FormField from '../FormField';

const Register = ({ setAlert, register }) => {
    const [signup, setSignup] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const { name, email, password, password2 } = signup;

    const handleChange = e => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('passwords do not match', 'danger');
        } else {
            register({ name, email, password });
            // console.log('SUCCESS');
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <FormField type="text" value={name} 
            name="name" handleChange={handleChange} />
            <FormField type="text" value={email}
            name="email" handleChange={handleChange} />
            <FormField type="password" value={password}
            name="password" handleChange={handleChange} />
            <FormField type="password" value={password2}
            name="password2" handleChange={handleChange} />
            <button type="submit" onClick={handleSubmit}>Register</button>
            <p>
                Already have an account? <Link to='/login'>Login</Link>
            </p>
        </form>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
}

export default connect(null, { setAlert, register })(Register);