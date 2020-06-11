import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';

function Brand({ style = {} }) {
  return (
    <h2
      style={{
        ...scale(1 / 2),
        marginBottom: 0,
        marginTop: 0,
        ...style,
      }}
    >
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'none',
          color: 'var(--textTitle)',
          display: 'flex',
          alignItems: 'center',
        }}
        to={'/'}
      >
        <div
          style={{
            width: rhythm(1.1),
            height: rhythm(1.1),
            backgroundColor: 'var(--blue)',
            borderRadius: '50%',
            margin: 0,
          }}
        />
        <span
          style={{
            fontWeight: 300,
            position: 'relative',
            left: rhythm(-1),
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            backgroundColor: 'transparent',
            backgroundImage: `repeating-linear-gradient(
                to bottom,
                #007acc,
                #007acc 1px,
                transparent 1px,
                transparent 2px
              )`,
          }}
        >
          M
        </span>
        <span
          style={{
            fontSize: rhythm(1),
            fontWeight: 700,
            position: 'relative',
            left: rhythm(-1),
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            backgroundColor: 'transparent',
            backgroundImage: `repeating-linear-gradient(
                to bottom,
                rgb(0, 175, 224),
                rgb(0, 175, 224) 1px,
                transparent 1px,
                transparent 2px
              )`,
          }}
        >
          E
        </span>
      </Link>
    </h2>
  );
}

export default Brand;
