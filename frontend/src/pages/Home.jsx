import RecentBlog from '@/components/RecentBlog'
import Hero from '../components/Hero'
import React, { useRef } from 'react'
import PopularAuthors from '@/components/PopularAuthors'

const Home = () => {
  // const recentBlogRef = useRef(null)

  // const scrollToRecentBlogs = () => {
  //   recentBlogRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }

  return (
    <div className='pt-20'>
      <Hero />
        <RecentBlog />
      <PopularAuthors />
    </div>
  )
}

export default Home
