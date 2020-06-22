import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

import '../fonts/fonts-post.css';
import Bio from '../components/Bio';
import Contributors from '../components/Contributors';
import SEO from '../components/SEO';
import Signup from '../components/Signup';
import Panel from '../components/Panel';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import { rhythm, scale } from '../utils/typography';
import {
  codeToLanguage,
  createLanguageLink,
  loadFontsForCode,
  replaceAnchorLinksByLanguage,
} from '../utils/i18n';
import Brand from '../components/Brand';

const systemFont = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif`;

class Translations extends React.Component {
  render() {
    let { translations, lang, languageLink, editUrl } = this.props;

    let readerTranslations = translations.filter(lang => lang !== 'ru');
    let hasRussianTranslation = translations.indexOf('ru') !== -1;

    return (
      <div className="translations">
        <Panel style={{ fontFamily: systemFont }}>
          {translations.length > 0 && (
            <span>
              {hasRussianTranslation && (
                <span>
                  Originally written in:{' '}
                  {'en' === lang ? (
                    <b>{codeToLanguage('en')}</b>
                  ) : (
                    <Link to={languageLink('en')}>English</Link>
                  )}
                  {' • '}
                  {'ru' === lang ? (
                    <b>Русский (авторский перевод)</b>
                  ) : (
                    <Link to={languageLink('ru')}>
                      Русский (авторский перевод)
                    </Link>
                  )}
                  <br />
                  <br />
                </span>
              )}
              <span>Translated by readers into: </span>
              {readerTranslations.map((l, i) => (
                <React.Fragment key={l}>
                  {l === lang ? (
                    <b>{codeToLanguage(l)}</b>
                  ) : (
                    <Link to={languageLink(l)}>{codeToLanguage(l)}</Link>
                  )}
                  {i === readerTranslations.length - 1 ? '' : ' • '}
                </React.Fragment>
              ))}
            </span>
          )}
          {lang !== 'en' && (
            <>
              <br />
              <br />
              {lang !== 'ru' && (
                <>
                  <Link to={languageLink('en')}>Read the original</Link>
                  {' • '}
                  <a href={editUrl} target="_blank" rel="noopener noreferrer">
                    Improve this translation
                  </a>
                  {' • '}
                </>
              )}
              <Link to={`/${lang}`}>View all translated posts</Link>{' '}
            </>
          )}
        </Panel>
      </div>
    );
  }
}

class PapersPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const { title: siteTitle, githubReponame, githubUsername, siteUrl } = get(
      this.props,
      'data.site.siteMetadata'
    );
    let {
      previous,
      next,
      slug,
      translations,
      translatedLinks,
    } = this.props.pageContext;
    const lang = post.fields.langKey;

    // Replace original links with translated when available.
    let html = post.html;

    // Replace original anchor links by lang when available in whitelist
    // see utils/whitelist.js
    html = replaceAnchorLinksByLanguage(html, lang);

    translatedLinks.forEach(link => {
      // jeez
      function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      let translatedLink = '/' + lang + link;
      html = html.replace(
        new RegExp('"' + escapeRegExp(link) + '"', 'g'),
        '"' + translatedLink + '"'
      );
    });

    translations = translations.slice();
    translations.sort((a, b) => {
      return codeToLanguage(a) < codeToLanguage(b) ? -1 : 1;
    });

    loadFontsForCode(lang);
    // TODO: this curried function is annoying
    const languageLink = createLanguageLink(slug, lang);
    const enSlug = languageLink('en');
    const editUrl = `https://github.com/${githubUsername}/${githubReponame}/edit/master/src/pages/${enSlug.slice(
      1,
      enSlug.length - 1
    )}/index${lang === 'en' ? '' : '.' + lang}.md`;
    const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
      `${siteUrl}${enSlug}`
    )}`;

    return (
      <main>
        <SEO
          lang={lang}
          title={post.frontmatter.title}
          description={post.frontmatter.spoiler}
          slug={post.fields.slug}
        />
        <article>
          <header>
            <h1 style={{ color: 'var(--textTitle)' }}>
              {post.frontmatter.title}
            </h1>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: rhythm(1 / 4),
                marginTop: rhythm(-4 / 5),
              }}
            >
              {`Published ${formatPostDate(post.frontmatter.published, lang)}`}
              {` • @${post.frontmatter.at}`}
              {` • ${post.frontmatter.venue}`}
              {` • ${formatReadingTime(post.timeToRead)}`}
              {` • `}
              <Contributors
                team={post.frontmatter.contributors}
                style={{ marginLeft: rhythm(1 / 4) }}
              />
              {post.frontmatter.note ? (
                <p style={{ flexBasis: '100%', height: 0 }}>
                  <em
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.note,
                    }}
                  />
                </p>
              ) : null}
            </div>

            {translations.length > 0 && (
              <Translations
                translations={translations}
                editUrl={editUrl}
                languageLink={languageLink}
                lang={lang}
              />
            )}
          </header>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <footer>
            <p>
              {/* <a href={discussUrl} target="_blank" rel="noopener noreferrer">
                  Discuss on Twitter
                </a> */}
              {` • `}
              <a href={editUrl} target="_blank" rel="noopener noreferrer">
                Edit on GitHub
              </a>
            </p>
          </footer>
        </article>
        <aside>
          <nav>
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                listStyle: 'none',
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link
                    to={previous.fields.slug}
                    rel="prev"
                    style={{ marginRight: 20 }}
                  >
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </aside>
      </main>
    );
  }
}

export default PapersPostTemplate;

export const pageQuery = graphql`
  query PapersPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        githubReponame
        githubUsername
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        spoiler
        published
        at
        venue
        note
        contributors {
          name
          avatar
        }
      }
      fields {
        slug
        langKey
      }
    }
  }
`;
