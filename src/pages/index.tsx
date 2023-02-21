import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getAllPosts, getCategories, Post } from '@/utils'

import CategoryList from '@/components/CategoryList'
import PostList from '@/components/PostList'


import styles from '@/styles/Home.module.css'


export default function Home({categories, posts}: {categories:string[], posts:Post[]}) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Just a simple blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <CategoryList categories={categories} />
      <PostList posts={posts} />
        
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
 const categories = getCategories();
 const posts = getAllPosts();
 return{
    props:{
      categories,
      posts,
    }
  }

}
