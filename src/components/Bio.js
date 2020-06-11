import React from 'react';
import profilePic from '../assets/mohamed.jpg';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(1.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Mohamed Ez-zaouia`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p style={{ maxWidth: 400, marginBottom: 0 }}>
          Personal *log by <strong>Mohamed Ez-zaouia</strong>. <br />I study and
          design teaching and learning technologies for better experiences and
          outcomes.
        </p>
      </div>
    );
  }
}

export default Bio;
