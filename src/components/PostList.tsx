import { Post } from "@/utils";
import Link from "next/link";

const PostList = ({ posts }: {posts: Post[]}) => {
   
    return(
        <>
        
            {posts.map( post => (
                <div key={post.meta.slug}>
                    <Link href={{
                            pathname:`/posts/[slug]`,
                            query: {
                                    slug: post.meta.slug
                                }
                        }} 
                        as = {`/posts/${post.meta.slug}`}>
                        {post.meta.title}
                    </Link>
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
    </>
    )

    
}

export default PostList