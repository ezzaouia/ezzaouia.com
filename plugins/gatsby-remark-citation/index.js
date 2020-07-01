const Cite = require('citation-js');
const visit = require('unist-util-visit');
const fs = require('fs');
const path = require('path');

module.exports = ({ markdownAST, markdownNode, getNode }, pluginOptions) => {
  let bibfile =
    markdownNode.frontmatter &&
    markdownNode.frontmatter.bibliography &&
    markdownNode.frontmatter.bibliography[0];

  if (!bibfile) return;

  if (
    !fs.existsSync(
      (bibfile = path.join(
        getNode(markdownNode.parent).dir,
        path.basename(bibfile)
      ))
    )
  )
    return;

  const cite = new Cite(fs.readFileSync(bibfile, 'utf-8'), {
    generateGraph: false,
  });

  const citeOptions = {
    format: 'html',
    template: 'apa',
    lang: 'en-US',
    ...pluginOptions.citation,
  };

  let refNbr, at, ref, citations, html, refKeys = new Set();

  visit(
    markdownAST,
    node => node.type === 'linkReference' && /@\w*/g.test(node.label),
    node => {
      citations = node.label.split(';').map(txt => {
        [_, at, ref] = txt.match(/\s*(@)(\w*)/);

        if (at === '@') {
          if (cite.data.find(entry => entry.id === ref)) {
            refKeys.add(ref);
            refNbr = [...refKeys].indexOf(ref) + 1;

            ref = txt.replace(
              /\s*@\w*\s*/,
              cite
                .format('citation', { entry: [ref], ...citeOptions })
                .slice(1, -1)
            );

            return `<cite id="cit-${refNbr}">
              <a href="#ref-${refNbr}">
                ${citeOptions.template === 'vancouver' ? refNbr : ref}
              </a>
            </cite>`;
          }
        }

        return ref;
      });

      html =
        citeOptions.template === 'vancouver'
          ? `[${citations.join('; ')}]`
          : `(${citations.join('; ')})`;

      node.type = 'html';
      node.children = undefined;
      node.value = html;
    }
  );

  visit(
    markdownAST,
    node => node.type === 'text' && node.value === '@@bibliography',
    node => {
      let bibliography = new Cite(
        [...refKeys].map(ref => cite.data.find(cit => cit.id === ref))
      ).format('bibliography', {
        entry: [...refKeys],
        ...citeOptions,
        format: 'text',
        prepend(entry) {
          return `<span id="ref-${[...refKeys].indexOf(entry.id) + 1}"></span>`;
        },
        append(entry) {
          return `<a href="#cit-${[...refKeys].indexOf(entry.id) +
            1}" class="reference-backref">↩</a>`;
        },
      });

      const html = `
        <hr>
        <h2 id="references">
          <a href="#references" class="anchor">
            <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>
          </a>
          References
        </h2>

        <div class="cite-references">
          <ul>
            ${bibliography
              .match(/[^\r\n]+/g)
              .map(ref => `<li>${ref}</li>`)
              .join('')}
          </ul>
        </div>
      `;

      node.type = 'html';
      node.children = undefined;
      node.value = html;
    }
  );

  return markdownAST;
};
