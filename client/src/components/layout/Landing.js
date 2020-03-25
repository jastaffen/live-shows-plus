import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return(
        <section>
            <div>
                <h1>LiveShows+</h1>
                <p>Watch full concerts by your favorite artists</p>
                <div>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </section>
    )
};

export default Landing;