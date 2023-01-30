import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getCategories, getPostBySlug, getPostsByCategory, getSlugs } from '@/utils'

import Categories from '@/components/Categories'
import styles from '@/styles/Home.module.css'


export default function Home({categories}: {categories:string[]}) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Just a simple blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      
        <Categories categories={categories} />
      
      
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
 const categories = getCategories();
 //const slugs = getSlugs('mdx');
 //const posts = getPostBySlug('mdx-crash-course','mdx')
 //const catFiles = getPostsByCategory('mdx');
 //const posts = cats.map(cat => getPostsForCategory(cat)).flat()
 return{
    props:{
      categories
    }
  }

}
