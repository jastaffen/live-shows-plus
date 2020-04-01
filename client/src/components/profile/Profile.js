import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';

const Profile = ({ profile: { profile, loading }, getProfileById, auth, match }) => {
   
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match])

    return(
        <>
            {profile === null || loading ? <Spinner /> : <>Profile</>}
            <Link to='/profiles'>Go Back</Link>
            { auth.isAuthenticated 
            && auth.loading === false 
            && auth.user._id === profile.user._id 
            && (<Link to='/edit-profile'>Edit Profile</Link >) }
            <div>
                {!loading && <ProfileTop profile={profile} /> }
            </div>
        </>
    )
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const msp = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(msp, { getProfileById })(Profile);