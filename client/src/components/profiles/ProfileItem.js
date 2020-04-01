import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profile: { user: { _id, name, avatar } } }) => {
    return(
        <div>
            <img src={avatar} alt={`avatar of ${name}`} />
            <div>
                <h2>{name}</h2>
                <Link to={`/profile/${_id}`}>View Profile</Link>
            </div>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;