import { Link, graphql } from 'gatsby';
import { formatPostDate, formatReadingTime } from '../utils/helpers';

import Bio from '../components/Bio';
import Contributors from '../components/Contributors';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Panel from '../components/Panel';
import React from 'react';
import SEO from '../components/SEO';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';

class PapersIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const langKey = this.props.pageContext.langKey;

    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <main>
        <SEO />
        {langKey !== 'en' && (
          <Panel>
            These articles have been{' '}
            <a
              href="https://github.com/ezzaouia/ezzaouia.com#contributing-translations"
              target="_blank"
              rel="noopener noreferrer"
            >
              translated by the community
            </a>
            .
          </Panel>
        )}

        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug;
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: rhythm(1),
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link
                    style={{ boxShadow: 'none' }}
                    to={node.fields.slug}
                    rel="bookmark"
                  >
                    {title}
                  </Link>
                </h3>
                <small
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  Published{' '}
                  {formatPostDate(node.frontmatter.published, langKey)}
                  {` • @${node.frontmatter.at}`}
                  {` • ${node.frontmatter.venue}`}
                  {` • ${formatReadingTime(node.timeToRead)}`}
                  {` • `}
                  <Contributors
                    team={node.frontmatter.contributors}
                    style={{ marginLeft: rhythm(1 / 8) }}
                  />
                </small>
              </header>
              <em
                dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }}
              />
              <p dangerouslySetInnerHTML={{ __html: node.frontmatter.paper }} />
            </article>
          );
        })}
      </main>
    );
  }
}

export default PapersIndexTemplate;

export const pageQuery = graphql`
  query($langKey: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { 
        langKey: { eq: $langKey } }, 
        fileAbsolutePath: {regex: "/papers/.*\\.md$/"} 
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            langKey
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
            paper
            published
            at
            venue
            contributors {
              name
              avatar
            }
          }
        }
      }
    }
  }
`;
