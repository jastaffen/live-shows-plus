import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({profile: 
    { bio, status, location, favoriteArtists, 
        user: 
        { name, avatar}
    }}) => {
    
    
    return(
        <div>
            <h1>{name}</h1>
            <h4>{location && location}</h4>
            <img src={avatar} alt={avatar} />
            <h3>{status}</h3>
            <p>{bio}</p>
            Favorite Artists: 
            <ul>
                {favoriteArtists.map(artist => (
                    <li key={artist}>{artist}</li>
                ))}
            </ul>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop;