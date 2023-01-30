import { getPostsByCategory } from "@/utils";
import { GetServerSideProps } from "next";
import { Post } from "@/utils";
import Link from "next/link";

const Category = ({posts, category}: {posts: Post[], category: string}) => {
    return(
         
        <section>
            
           {posts.map(post =>(
            <div key={post.meta.slug}>
                <Link 
                href={{
                    pathname:'/posts/[slug]',
                    query: {
                        slug: post.meta.slug,
                        category,
                    }
                }} 
                as = {`/posts/${post.meta.slug}`}
               //</div> href={`/posts/${post.meta.slug}`}>{post.meta.title}</Link>
               >{post.meta.title}</Link>
                <p>{post.meta.excerpt}</p>
            <ul>
                {post.meta.tags.map(tag => (
                    <li key={tag}>
                        <Link href={`/tags/${tag}`}>{tag}</Link>
                    </li>
                ))}
            </ul>
               
            </div>
            
           ))}
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
            posts,
            category,
        },
    }
}
