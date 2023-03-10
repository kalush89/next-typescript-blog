import { getPostsByCategory } from "@/utils";
import { GetServerSideProps } from "next";
import { Post } from "@/utils";

import PostList from "@/components/PostList";

const Category = ({posts}: {posts: Post[]}) => {
    
    return(
        <section>
            <PostList posts={posts} />
        </section>
    )
}

export default Category;

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    let category ='';
    if(typeof context.query.category === 'string'){
        category = context.query.category;
    }
    
    const posts = getPostsByCategory(category)
    return {
        props:{
            posts
        },
    }
}
