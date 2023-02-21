import { getPostsByTag } from "@/utils";
import { GetServerSideProps } from "next";
import { Post } from "@/utils";

import PostList from "@/components/PostList";

const Tag = ({posts}: {posts: Post[]}) => {
    
    return(
        <section>
            <PostList posts={posts} />
        </section>
    )
}

export default Tag;

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    let tag ='';
    if(typeof context.query.tag === 'string'){
        tag = context.query.tag;
    }
    
    const posts = getPostsByTag(tag)
    return {
        props:{
            posts
        },
    }
}
