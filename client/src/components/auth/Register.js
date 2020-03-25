import React, {useState} from 'react';
import axios from 'axios';


import FormField from '../FormField';

const Register = () => {
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
            console.log('passwords do not match');
        } else {
            const newUser = {
                name,
                email,
                password
            }
            
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                const body = JSON.stringify(newUser);

                const res = await axios.post('http://localhost:5000/api/users', body, config);
                
                console.log(res.data);
                
            } catch (err) {
                console.error(err); 
            }
        }
    }

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