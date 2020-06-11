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

class ResearchIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const langKey = this.props.pageContext.langKey;

    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        {/* <aside>
          <Bio />
        </aside> */}
        <main>
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

          <h1>Research Interest</h1>
          <p>
            Studying people and collaborating with them to design better ways,
            methods, technologies, that serve needs, and improve experiences and
            outcomes of life learning, teaching, and practice; along with
            distilling the social, pedagogical, and technical underpinnings.
            Education technologies carry forth an individual's and group's
            inter-personal characteristics, contingencies, beliefs, feelings,
            values, behaviors. Such technologies convey experiences, elicit
            responses, evoke emotions, and catalyze reflections. It is critical
            to consider the social, pedagogical, and technical ramifications
            when informing the design and use of teaching and learning
            technologies.
          </p>
          <h1>Current Research</h1>
          <p>These are the projects that I'm currently focusing on:</p>
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
                    Started {formatPostDate(node.frontmatter.date, langKey)}
                    {` • ${formatReadingTime(node.timeToRead)}`}
                    {` • #${node.frontmatter.papers} papers`}
                    {` • `}
                    <Contributors
                      team={node.frontmatter.contributors}
                      style={{ marginLeft: rhythm(1 / 8) }}
                    />
                  </small>
                </header>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description,
                  }}
                />
                <blockquote
                  dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }}
                />
              </article>
            );
          })}
        </main>
        <Footer />
      </Layout>
    );
  }
}

export default ResearchIndexTemplate;

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
        fileAbsolutePath: {regex: "/research/.*\\.md$/"} 
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
            description
            papers
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
