import RecentBlog from '@/components/RecentBlog'
import React, { useRef } from 'react'
import PopularAuthors from '@/components/PopularAuthors'
import Hero from '@/components/Hero'

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
