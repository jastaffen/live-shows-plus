import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import profile from './profile'
import videos from './videos';

export default combineReducers({
    alert,
    auth,
    profile,
    videos
});