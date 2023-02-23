import { GetServerSideProps, NextPageContext } from "next";
import { getPostBySlug, PostMeta } from "@/utils";
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
    
    return (
        <article>
            <Head>
                <title>{post.meta.title}</title>
            </Head>
            <MDXRemote {...post.source} />
        </article>
    )
}

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
   
    let slug ='';
   
    if(typeof context.query.slug === 'string'){
        slug = context.query.slug;
       
    }
    
    const { content, meta} = getPostBySlug(slug)
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
