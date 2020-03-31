import React from 'react';

const FormField = ({type, value, name, handleChange, required, minLength }) => {

    const placeholder = () => {
        if (name === 'password2') {
            return 'Confirm Password'
        } else if (name === 'favoriteArtist') {
            return 'Add a favorite artist...'
        } else {
            return `${name[0].toUpperCase()}${name.slice(1)}`
        }
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