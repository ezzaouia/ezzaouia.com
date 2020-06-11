import React from 'react';
import { Link, graphql } from 'gatsby';

import { rhythm, scale } from '../utils/typography';

class Navbar extends React.Component {
  render() {
    const links = [
      { name: 'research', to: '/' },
      { name: 'papers', to: '/papers/' },
      { name: 'blog', to: '/blog/' },
      { name: 'thesis', to: '/thesis/' },
      { name: 'bio', to: '/bio/' },
      { name: 'cv', to: '/cv/' },
    ];
    const { pathname } = this.props.location;

    return (
      <nav style={{ marginBottom: rhythm(1 / 2) }}>
        <ul style={{ ...scale(1 / 4), display: 'flex', flexWrap: 'wrap' }}>
          {links.map(link => (
            <li key={link.name}>
              <Link
                to={link.to}
                partiallyActive={true}
                activeStyle={
                  link.to === '/' && pathname !== '/'
                    ? {}
                    : {
                        backgroundImage: `
                      linear-gradient(180deg, transparent 65%, #007acc)`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                      }
                }
              >
                &nbsp;{link.name}&nbsp;
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
