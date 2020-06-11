import React from 'react';
import { rhythm, scale } from '../utils/typography';

import Image from './Image';

function Contributors({ team = [], style = {} }) {
  let more = null;
  const avatarStyles = {
    marginBottom: 0,
    width: rhythm(1),
    height: rhythm(1),
    borderRadius: '50%',
    border: '0.5px solid #eee5',
    backgroundColor: 'var(--bg-secondary)',
    marginLeft: rhythm(-1 / 8),
    overflow: 'hidden',
  };
  // get only the 5 first members.
  if (team && team.length > 5) {
    team = team.slice(0, 5);
    more = (
      <span
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...avatarStyles,
        }}
      >
        •••
      </span>
    );
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        paddingLeft: rhythm(1 / 8),
        ...style,
      }}
    >
      {(team || []).map(member =>
        member.avatar ? (
          <span key={member.name} style={avatarStyles}>
            <Image
              style={{
                width: rhythm(1),
                height: rhythm(1),
              }}
              name={member.avatar}
            />
          </span>
        ) : (
          <small
            key={member.name}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              ...avatarStyles,
            }}
          >
            {member.name
              .split(' ')
              .map(n => n[0])
              .join('')}
          </small>
        )
      )}
      {more}
    </div>
  );
}

export default Contributors;
