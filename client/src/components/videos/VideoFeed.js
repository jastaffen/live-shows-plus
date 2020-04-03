import React, { useEffect } from 'react';
import VideoItem from './VideoItem';
import { connect } from 'react-redux';
import { getVideos } from '../../actions/videos';
import PropTypes from 'prop-types'

const VideoFeed = ({ id, getVideos, videos: { loading, videoFeed } }) => {
    useEffect(() => {
        getVideos(id)
    }, [getVideos, id])
    // debugger;
    return(
        <div>
            {!loading && 
                Object.keys(videoFeed)
                    .map(subject => 
                        <div>
                            {subject}
                            {videoFeed[subject].map(video => {
                                return <VideoItem key={video.id} video={video} />
                            })}
                        </div>
            )}
        </div>
    )
}

VideoFeed.propTypes = {
    id: PropTypes.string.isRequired,
    getVideos: PropTypes.func.isRequired,
    videos: PropTypes.object.isRequired
}

const msp = state => ({
    profile: state.profile,
    videos: state.videos
})

export default connect(msp, { getVideos })(VideoFeed);   