import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import profilePic from '../assets/mohamed.jpg';
import { rhythm } from '../utils/typography';

function Bio({}) {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          description
        }
      }
    }
  `);

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
      <p
        style={{ maxWidth: 400, marginBottom: 0 }}
        dangerouslySetInnerHTML={{
          __html: data.site.siteMetadata.description,
        }}
      />
    </div>
  );
}

export default Bio;
