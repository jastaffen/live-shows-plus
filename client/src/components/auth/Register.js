import React, {useState} from 'react';


import FormField from '../FormField';

const Register = () => {
    const [signup, setSignup] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const handleChange = e => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            console.log('passwords do not match');
        } else {
            console.log(signup);
        }
    }

    const { name, email, password, password2 } = signup;

    return(
        <form onSubmit={handleSubmit}>
            <FormField type="text" value={name} 
            name="name" handleChange={handleChange} required={true} />
            <FormField type="text" value={email}
            name="email" handleChange={handleChange} required={true} />
            <FormField type="password" value={password}
            name="password" handleChange={handleChange} required={true} />
            <FormField type="password" value={password2}
            name="password2" handleChange={handleChange} required={true} />
            <button type="submit" onClick={handleSubmit}>Register</button>
        </form>
    )
};

export default Register;