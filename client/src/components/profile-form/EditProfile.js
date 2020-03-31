import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';

import FormField from '../FormField';

const EditProfile = ({ createProfile, getCurrentProfile, history, profile: {profile, loading} }) => {
    const [formData, setFormData] = useState({
        status: '',
        bio: '',
        location: '',
        favoriteArtist: '',
        favoriteArtists: []
    });

    useEffect(() => {
        getCurrentProfile();
        setFormData({
            status: loading || !profile.status ? '' : profile.status,
            bio: loading ||!profile.bio ? '' : profile.bio,
            location: loading || !profile.location ? '' : profile.location,
            favoriteArtists: loading || !profile.favoriteArtists ? '' : profile.favoriteArtists,
            favoriteArtist: ''
        })
    }, [loading])

    const addFavoriteArtist = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            favoriteArtists: [...formData.favoriteArtists, formData.favoriteArtist],
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
        let favArtistsSansArtist = formData.favoriteArtists.filter(art => art !== e.target.id);
        setFormData({
            ...formData,
            favoriteArtists: favArtistsSansArtist
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    }

    const { status, bio, location, favoriteArtists, favoriteArtist } = formData;

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
                <button onClick={handleSubmit}>Edit Profile</button>
            </form>
            <div>
                <ul>
                    {favoriteArtists ? favoriteArtists.map(artist => 
                    <li key={artist}>{artist}
                        <button id={artist} onClick={deleteArtist}>x</button>
                    </li>
                    ) : null}
                </ul>
            </div>
            
        </div>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const msp = state => ({
    profile: state.profile
})

export default connect(msp, { createProfile, getCurrentProfile })(withRouter(EditProfile));