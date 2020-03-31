import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createProfile } from '../../actions/profile';
import FormField from '../FormField';

const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        status: '',
        bio: '',
        location: '',
        favoriteArtist: '',
        favoriteArtists: []
    });

    const addFavoriteArtist = (e) => {
        e.preventDefault();
        // let addedArtist = formData.favoriteArtists.push(favoriteArtist);
        setFormData({
            ...formData,
            favoriteArtists: [...formData.favoriteArtists, favoriteArtist],
            favoriteArtist: ''
        });
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const deleteArtist = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        let favArtistsSansArtist = formData.favoriteArtists.filter(art => art !== e.target.id);
        setFormData({
            ...formData,
            favoriteArtists: favArtistsSansArtist
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    }

    const { status, bio, location, favoriteArtists, favoriteArtist } = formData;

    console.log(formData);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormField type="text" name="status" value={status} handleChange={handleChange} />
                <FormField type="text" name="bio" value={bio} handleChange={handleChange} />
                <FormField type="text" name="location" value={location} handleChange={handleChange} />
                <div>
                    <FormField type="text" name="favoriteArtist" value={favoriteArtist} handleChange={handleChange} />
                    <button onClick={addFavoriteArtist}>+</button>
                </div>
                <button onClick={handleSubmit}>Create Profile</button>
            </form>
            <div>
                <ul>
                    {favoriteArtists.map(artist => 
                    <li key={artist}>{artist}
                        <button id={artist} onClick={deleteArtist}>x</button>
                    </li>
                    )}
                </ul>
            </div>
            
        </div>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}



export default connect(null, { createProfile })(withRouter(CreateProfile));