import React from 'react';

const FormField = ({type, value, name, handleChange, required, minLength }) => {

    const placeholder = () => {
        return name === 'password2' ? 'Confirm Password' : 
        `${name[0].toUpperCase()}${name.slice(1)}`
    }

    return (
        <div>
            <input type={type} name={name} 
            value={value} 
            placeholder={placeholder()} 
            onChange={handleChange} minLength={minLength} />
        </div>
    )
}

export default FormField;