---
title: How to Build a Citation Plugin for Gatsby
date: '2020-06-28'
spoiler: 
---

<a href="gatsbyjs.org">Gatsby</a> leverages the power <a href="https://github.com/remarkjs/remark">Remark</a> to process markdown. This is materialized through Gatsby's plugins, particularly the ones of type *transformation*.

At the time of my writing there are only two Gatsby's plugins that handle latex alike citation. They come, however, with several limitations. One is that they don't support different citations' templates, such as, apa, vancouver. They didn't either support different citations, such as citing by authors names, reference numbers, etc.

I thought it would be nice to build my own citation plugin for my blog. This will to include citations directly in markdown. I thought it would nice to demonstrate how easy it is to build a plugin for our Gatsby. We need some knowledge in Javascript and Nodejs.  

```bash{13-18}
➜  ezzaouia.com git:(master) ✗ tree -L 1
.
├── LICENSE-code-snippets
├── LICENSE-posts
├── LICENSE-website
├── README.md
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── i18n.js
├── node_modules
├── package.json
├── plugins
    └── gatsby-remark-citation
        ├── index.js
        ├── node_modules
        ├── package.json
        └── yarn.lock
├── public
├── src
├── static
└── yarn.lock
```

