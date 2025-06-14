import { gql } from '@apollo/client';

export const QHomePage = gql`
  query NewQuery {
    page(id: "homepage", idType: URI) {
      id
      homePageHero {
        title
        content
        buttontext
        buttonlink
      }
      homePageFeatured {
        intro
        tagline
        title
        post {
          nodes {
            ... on Page {
              id
              title
              uri
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              postMeta {
                time
                shortInfo
                category
              }
            }
          }
        }
      }
      homePagePosts {
        posts {
          nodes {
            ... on Page {
              id
              title
              uri
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              postMeta {
                 time
                shortInfo
                category
              }
            }
          }
        }
      }
    }
  }
`;