import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { startsWith, isEqual, get } from 'lodash';
import { rhythm, scale } from '../utils/typography';

function Navbar({ location }) {
  const data = useStaticQuery(graphql`
    query NavbarQuery {
      site {
        siteMetadata {
          navbar {
            name
            to
          }
        }
      }
    }
  `);
  const links = get(data, 'site.siteMetadata.navbar', []);
  const pathname = get(location, 'pathname', '');

  const isPathnameActive = (pathname, link) => {
    return (
      (startsWith(pathname, link) && !isEqual(link, '/')) ||
      (isEqual(pathname, '/') && isEqual(link, '/')) ||
      (startsWith(pathname, '/research/') && isEqual(link, '/'))
    );
  };

  return (
    <nav style={{ marginBottom: rhythm(1 / 2) }}>
      <ul
        style={{
          ...scale(1 / 4),
          display: 'flex',
          flexWrap: 'wrap',
          listStyleType: 'none',
        }}
      >
        {links.map(link => (
          <li
            key={link.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: rhythm(1),
            }}
          >
            <span
              style={
                isPathnameActive(pathname, link.to)
                  ? {
                      fontSize: rhythm(0.7),
                      color: 'var(--textNormal)',
                      transition: 'color 0.3s ease',
                      marginRight: rhythm(0.25),
                    }
                  : {
                      fontSize: rhythm(2 * 0.7),
                      marginRight: rhythm(0.20),
                      color: 'var(--theme-color)',
                    }
              }
            >
              {isPathnameActive(pathname, link.to) ? ' ⊙ ' : ' • '}
            </span>
            <Link to={link.to} partiallyActive={true}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
