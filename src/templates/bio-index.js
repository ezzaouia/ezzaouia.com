import { Link, graphql } from 'gatsby';
import { formatPostDate, formatReadingTime } from '../utils/helpers';

import Bio from '../components/Bio';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Panel from '../components/Panel';
import React from 'react';
import SEO from '../components/SEO';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';

class BioIndexTemplate extends React.Component {
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

          <h1>A Brief Bio..</h1>
          <p>
            I'm a{' '}
            <a href="/cv/#publications" target="_blank">
              Ph.D. candidate
            </a>{' '}
            in Computer Science, Department of Informatics, University of Lyon.
            I'm advised by{' '}
            <a href="https://www.tabard.fr/" target="_blank">
              Aurélien Tabard
            </a>{' '}
            and{' '}
            <a href="https://perso.liris.cnrs.fr/elise.lavoue/" target="_blank">
              Elise Lavoué
            </a>
            . I'll be defending my thesis, entitled{' '}
            <strong>
              <em>
                <a href="/thesis/" target="_blank">
                  Factors for dashboards to inform the design and use of
                  teachers' practices in situ
                </a>
              </em>
            </strong>
            , in the 2nd of Septemper 2020.
          </p>
          <p>
            In 2013 —before starting my Ph.D., I graduated from the National
            Advanced Institute for Information Technology and System Analysis —
            <a href="http://ensias.um5.ac.ma/" target="_blank">
              ENSIAS
            </a>
            , French abbreviation, Mohammed V University, Rabat, Morocco, as a
            software engineer. I joined{' '}
            <a href="https://www.accenture.com" target="_blank">
              Accenture
            </a>{' '}
            Morocco, during my six months graduation project. By the end of my
            internship, I joined the company as a software engineer analyst. My
            journey at Accenture continued for two years. I had the chance to
            work with great peope and on intersting{' '}
            <a href="/cv/#appointments" target="_blank">
              projects
            </a>
            . In late 2015, I decide to quit my job to pursue a research career.
          </p>

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
                  <small>
                    {formatPostDate(node.frontmatter.date, langKey)}
                    {` • ${formatReadingTime(node.timeToRead)}`}
                  </small>
                </header>
                <p
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

export default BioIndexTemplate;

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
        fileAbsolutePath: {regex: "/bio/.*\\.md$/"} 
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
          }
        }
      }
    }
  }
`;
