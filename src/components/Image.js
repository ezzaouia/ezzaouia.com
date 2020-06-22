import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

function Image({ name = '', alt = '' }) {
  const images = useStaticQuery(graphql`
    query ImagesQuery {
      allFile(filter: {absolutePath: { regex: "/assets/.*\\.jpg$/" }}) {
        edges {
          node {
            publicURL
            name
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  const image = images.allFile.edges.find(n => {
    return n.node.name === name;
  });

  return image ? (
    <Img alt={alt} fluid={image.node.childImageSharp.fluid} />
  ) : null;
}

export default Image;
