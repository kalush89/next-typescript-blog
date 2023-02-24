
import fs from 'fs';
import process from "process";
import path from "path";
import matter  from 'gray-matter';

export interface Post {
    content: string;
    meta: PostMeta;
    category?: string;
}
  
export interface PostMeta {
    excerpt: string;
    slug?: string;
    title: string;
    tags: string[];
    date: string;
}


const root: string = path.join(process.cwd(), 'src/posts/categories');

//get categories
export const getCategories = (): string[] => {
    return fs.readdirSync('src/posts/categories', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

//get slugs
export const getSlugs = (category: string): string[] => {
    const fileNames = fs.readdirSync(`${root}/${category}`)
    return fileNames.map(fileName => fileName.split('.')[0]) 
}

//get posts by category
export const getPostsByCategory = (category: string): Post[] => {
const posts = getSlugs(category)
.map(slug => {
  const post = getPostBySlug(slug)
  return {...post}
})
return posts
}

//get single post by slug
export const getPostBySlug = (slug: string): Post => {

// get the name of the category that has the supplied slug
const category = getCategories()
.filter(category => getSlugs(category)
.includes(`${slug}`))

// get the post
const source = fs.readFileSync(`${root}/${category}/${slug}.mdx`,'utf8')
const { content, data } = matter(source)
    return {
        content,
        meta: {
            slug,
            excerpt: data.excerpt,
            title: data.title,
            tags: (data.tags).sort(),
            date: (data.date).toString(),
          },
    }
}


//get post by tag
export const getPostsByTag = (tag: string): Post[] => {
const posts = getAllPosts().filter( post => post.meta.tags.includes(tag))
return posts
}


//get all post from all categories
export const getAllPosts = (): Post[] => {
const posts = getCategories().flatMap(category => getPostsByCategory(category))
return posts
}





