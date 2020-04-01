import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, profile: {profiles, loading }}) => {

    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return(
        <>
            {loading ? 
                'loading' : 
            <>
                <h3>See other profiles</h3>
                <div>
                    {profiles.length > 0 ?
                         profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />) : 
                         <h4>No profiles found</h4> }
                </div>
            </>    }
        </>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const msp = state => ({
    profile: state.profile
})

export default connect(msp, { getProfiles })(Profiles);
