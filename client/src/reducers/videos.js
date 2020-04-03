import { GET_VIDEOS, VIDEO_ERROR } from '../actions/types';

const initialState = {
    videoFeed: [],
    savedVideos: [],
    loading: true,
    error: ''
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_VIDEOS:
            return {
                ...state,
                loading: false,
                videoFeed: payload
            }
        case VIDEO_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state
    }
    
}