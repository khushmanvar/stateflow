import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Stateflow } from '../../components/stateflow.js';
import { Meta } from '../../components/meta.js';

export default function DocsPage({ data }) {
  const { frontmatter, body } = data.mdx;
  const { title } = frontmatter;

  return (
    <>
      <div className="mb-4 lg:hidden">
        <Stateflow isDocsPage small />
      </div>
      <h1>{title}</h1>
      <MDXRenderer>{body}</MDXRenderer>
    </>
  );
}

export const Head = ({ data }) => {
  const { slug, frontmatter } = data.mdx;
  const { title, description } = frontmatter;
  const uri = `docs/${slug}`;

  return <Meta title={title} description={description} uri={uri} />;
};

export const pageQuery = graphql`
  query PageQuery($slug: String) {
    mdx(slug: { eq: $slug }) {
      slug
      frontmatter {
        title
        description
      }
      body
    }
  }
`;
