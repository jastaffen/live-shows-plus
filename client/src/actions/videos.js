import axios from 'axios';
import { setAlert } from './alert';
import { GET_VIDEOS, VIDEO_ERROR } from './types';

export const getVideos = (user_id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/users/user/${user_id}`);
        
        if (res.length < 1) {
            dispatch(setAlert("Add favorite artists to get the latest in live shows!"));
        } 
        
        dispatch({
            type: GET_VIDEOS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: VIDEO_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}