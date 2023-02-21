
import fs from 'fs';
import process from "process";
import path from "path";
import matter  from 'gray-matter';

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

//get posts by category
export const getPostsByCategory = (category: string): Post[] => {
const posts = getSlugs(category).map(slug => {
  const post = getPost(slug)
  return {...post}
})
return posts
}

//get single post by slug and category
export const getPost = (slug: string): Post => {
//check all categories for a name match to the given slug name 
const post = getCategories()
.map(category => [fs.readdirSync(`${root}/${category}`).join(), category])
.filter(catSlug => catSlug[0] === `${slug}.mdx`).flat()

const source = fs.readFileSync(`${root}/${post[1]}/${post[0]}`,'utf8')
    const { content, data } = matter(source)
    return {content,
        meta: {
            slug,
            excerpt: data.excerpt,
            title: data.title,
            tags: (data.tags).sort(),
            date: (data.date).toString(),
          },
    }
}

//get all post from all categories
export const getAllPosts = (): Post[] => {
const posts = getCategories().map(category => getPostsByCategory(category)).flat()
return posts
}

//get all posts by tag
export const getPostsByTag = (tag: string): Post[] => {
const posts = getAllPosts().filter(post => post.meta.tags.includes(tag))
return posts
}



