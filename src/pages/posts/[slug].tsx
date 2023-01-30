import { GetServerSideProps } from "next";
import { getPost, PostMeta } from "@/utils";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import Head from "next/head";

import "highlight.js/styles/base16/atelier-cave.css";

interface MDXPost {
    source: MDXRemoteSerializeResult<Record<string, unknown>>;
    meta: PostMeta;
  }

const Post = ({post}:{post:MDXPost}) => {
    console.log(post)
    return (
        <section>
            <Head>
                <title>{post.meta.title}</title>
            </Head>
            <MDXRemote {...post.source} />
        </section>
    )
}

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
    let slug ='';
    let category = '';
    if(typeof context.query.slug === 'string' && typeof context.query.category === 'string'){
        slug = context.query.slug;
        category = context.query.category;
    }
    
    const { content, meta} = getPost(slug, category)
    const MDXSource = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [
              rehypeHighlight,
            ],
          },
    });
    
    return {
        props:{
            post:{source: MDXSource, meta}
        }
    }
}
