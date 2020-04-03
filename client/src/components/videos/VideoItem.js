import React from 'react';
import PropTypes from 'prop-types';

const VideoItem = ({ video }) => {
    const { id, title, publishedAt, thumbnails } = video;
    return(
        <div style={{
            backgroundImage: `url(${thumbnails.default.url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${thumbnails.default.width}`,
            height: '100px'
        }}>
            hi
        </div>
    )
}

VideoItem.propTypes = {
    video: PropTypes.object.isRequired
}

export default VideoItem;