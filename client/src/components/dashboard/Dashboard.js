import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile])

    return loading && profile === null ? 
    <Spinner /> : 
    <>
        <h1>Dashboard</h1>
        <p>{`Welcome ${user && user.name}`}</p>
        { profile !== null ? 
        <>
            <DashboardActions />
        </> : 
        <>
            <p>You have not yet set up a profile, please
                add some info
                <Link to='/create-profile'>Create Profile</Link>
            </p>
        </>}
    </>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const msp = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(msp, { getCurrentProfile })(Dashboard);