const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
// const { createFilePath } = require('gatsby-source-filesystem');
const { supportedLanguages } = require('./i18n');

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  // Oops
  createRedirect({
    fromPath: '/zh_TW/things-i-dont-know-as-of-2018/',
    toPath: '/zh-hant/things-i-dont-know-as-of-2018/',
    isPermanent: true,
    redirectInBrowser: true,
  });
  // Oops 2
  createRedirect({
    fromPath: '/not-everything-should-be-a-hook/',
    toPath: '/why-isnt-x-a-hook/',
    isPermanent: true,
    redirectInBrowser: true,
  });
  // Oops 3
  createRedirect({
    fromPath: '/making-setinterval-play-well-with-react-hooks/',
    toPath: '/making-setinterval-declarative-with-react-hooks/',
    isPermanent: true,
    redirectInBrowser: true,
  });

  return new Promise((resolve, reject) => {
    // Create index pages for all supported languages
    Object.keys(supportedLanguages).forEach(langKey => {
      _.each(
        ['research', 'blog', 'papers', 'books', 'thesis', 'bio', 'cv'],
        (content, _) => {
          // research is the landing page
          const url = content === 'research' ? '' : content;
          createPage({
            path: langKey === 'en' ? `/${url}` : `/${langKey}/${url}`,
            component: path.resolve(`./src/templates/${content}-index.js`),
            context: {
              langKey,
              slug: content === 'cv' ? '/cv/curriculum-vitae/' : null,
            },
          });
        }
      );
    });

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                    langKey
                    directoryName
                    maybeAbsoluteLinks
                  }
                  frontmatter {
                    title
                  }
                  fileAbsolutePath
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
          return;
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;
        const allSlugs = _.reduce(
          posts,
          (result, post) => {
            result.add(post.node.fields.slug);
            return result;
          },
          new Set()
        );

        const translationsByDirectory = _.reduce(
          posts,
          (result, post) => {
            const directoryName = _.get(post, 'node.fields.directoryName');
            const langKey = _.get(post, 'node.fields.langKey');

            if (directoryName && langKey && langKey !== 'en') {
              (result[directoryName] || (result[directoryName] = [])).push(
                langKey
              );
            }

            return result;
          },
          {}
        ); // end reduce

        const defaultLangPosts = posts.filter(
          ({ node }) => node.fields.langKey === 'en'
        );
        _.each(defaultLangPosts, (post, index) => {
          const previous =
            index === defaultLangPosts.length - 1
              ? null
              : defaultLangPosts[index + 1].node;
          const next = index === 0 ? null : defaultLangPosts[index - 1].node;

          const translations =
            translationsByDirectory[_.get(post, 'node.fields.directoryName')] ||
            [];

          createPage({
            path: post.node.fields.slug,
            component: postComponent(_.get(post, 'node.fileAbsolutePath')),
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
              translations,
              translatedLinks: [],
            },
          });

          const otherLangPosts = posts.filter(
            ({ node }) => node.fields.langKey !== 'en'
          );

          // create other lang pages
          _.each(otherLangPosts, post => {
            const translations =
              translationsByDirectory[_.get(post, 'node.fields.directoryName')];

            // Record which links to internal posts have translated versions
            // into this language. We'll replace them before rendering HTML.
            let translatedLinks = [];
            const { langKey, maybeAbsoluteLinks } = post.node.fields;
            maybeAbsoluteLinks.forEach(link => {
              if (allSlugs.has(link)) {
                if (allSlugs.has('/' + langKey + link)) {
                  // This is legit an internal post link,
                  // and it has been already translated.
                  translatedLinks.push(link);
                } else if (link.startsWith('/' + langKey + '/')) {
                  console.log('-----------------');
                  console.error(
                    `It looks like "${langKey}" translation of "${post.node.frontmatter.title}" ` +
                      `is linking to a translated link: ${link}. Don't do this. Use the original link. ` +
                      `The blog post renderer will automatically use a translation if it is available.`
                  );
                  console.log('-----------------');
                }
              }
            });

            createPage({
              path: post.node.fields.slug,
              component: postComponent(_.get(post, 'node.fileAbsolutePath')),
              context: {
                slug: post.node.fields.slug,
                translations,
                translatedLinks,
              },
            });
          });
        }); // end each
      }) // end then
    );
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (_.get(node, 'internal.type') === `MarkdownRemark`) {
    createNodeField({
      node,
      name: 'directoryName',
      value: path.basename(path.dirname(_.get(node, 'fileAbsolutePath'))),
    });

    // Capture a list of what looks to be absolute internal links.
    // We'll later remember which of them have translations,
    // and use that to render localized internal links when available.

    // TODO: check against links with no trailing slashes
    // or that already link to translations.
    const markdown = node.internal.content;
    let maybeAbsoluteLinks = [];
    let linkRe = /\]\((\/[^\)]+\/)\)/g;
    let match = linkRe.exec(markdown);
    while (match != null) {
      maybeAbsoluteLinks.push(match[1]);
      match = linkRe.exec(markdown);
    }
    createNodeField({
      node,
      name: 'maybeAbsoluteLinks',
      value: _.uniq(maybeAbsoluteLinks),
    });
  }
};

const postComponent = fileAbsolutePath => {
  switch (true) {
    case !!fileAbsolutePath.match(/\/research\/.*\.md$/):
      return path.resolve('./src/templates/research-post.js');

    case !!fileAbsolutePath.match(/\/blog\/.*\.md$/):
      return path.resolve('./src/templates/blog-post.js');

    case !!fileAbsolutePath.match(/\/papers\/.*\.md$/):
      return path.resolve('./src/templates/papers-post.js');

    case !!fileAbsolutePath.match(/\/books\/.*\.md$/):
      return path.resolve('./src/templates/books-post.js');

    case !!fileAbsolutePath.match(/\/thesis\/.*\.md$/):
      return path.resolve('./src/templates/thesis-post.js');

    case !!fileAbsolutePath.match(/\/bio\/.*\.md$/):
      return path.resolve('./src/templates/bio-post.js');

    case !!fileAbsolutePath.match(/\/cv\/.*\.md$/):
      return path.resolve('./src/templates/cv-post.js');

    default:
      return path.resolve('./src/templates/research-post.js');
  }
};
