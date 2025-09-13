import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { LuPenLine } from "react-icons/lu";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString('en-GB');
  return (
    <>
    <div className='bg-white dark:bg-gray-800 dark:border-gray-600 p-5 rounded-2xl shadow-lg border hover:scale-105 transition-all flex flex-col'>
      <img src={blog.thumbnail} alt="" className='rounded-lg w-full h-45 object-cover' />
      <p className='text-sm mt-2 mb-3 dark:text-gray-300 text-gray-500'>
        By {blog.author.firstName} | {blog.category} | {formattedDate}
      </p>
      <h2 className='text-xl font-semibold '>{blog.title}</h2>
      <h3 className='text-gray-400 dark:text-gray-500 mt-2'>{blog.subtitle}</h3>
      <div className="flex-grow"></div>
      <Button onClick={() => navigate(`/blogs/${blog._id}`)} className='mt-4 px-4 py-2 rounded-lg text-sm cursor-pointer self-start'>
        Read More
      </Button>
    </div>
    <div className="fixed bottom-12 right-12 z-50">
        <Button 
          onClick={() => navigate('/dashboard/write-blog')} 
          className="bg-gray-800 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-300 hover:scale-105 cursor-pointer dark:text-gray-700 py-6 rounded-full shadow-lg transition"
        >
          <LuPenLine className='size-6'/>
        </Button>
      </div>
    </>
  )
}

export default BlogCard