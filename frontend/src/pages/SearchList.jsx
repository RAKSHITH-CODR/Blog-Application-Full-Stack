import BlogCard from '@/components/BlogCard';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { PiSmileySadLight } from "react-icons/pi";

const SearchList = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    const { blog } = useSelector(store => store.blog);

    const filteredBlogs = blog?.filter((b) =>
        (b?.title?.toLowerCase().includes(query?.toLowerCase())) ||
        (b?.category?.toLowerCase() === query?.toLowerCase()) ||
        (b?.subtitle?.toLowerCase().includes(query?.toLowerCase()))
    );


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='pt-32'>
            <div className="max-w-6xl mx-auto">
                {filteredBlogs && filteredBlogs.length > 0 ? (
                    <>
                        <h2 className='mb-5 text-2xl font-semibold'>Search results for: "{query}"</h2>
                        <div className="grid grid-cols-3 gap-7 my-10 mb-11">
                            {
                                filteredBlogs.map((blog, index) => {
                                    return <BlogCard blog={blog} key={index} />
                                })
                            }
                        </div>
                    </>
                ) : (
                    <>
                    <div className="flex flex-col gap-15 items-center">
                        <p className="relative top-20 text-center text-gray-400 text-3xl my-10">
                        No search results found for "{query}"
                    </p>
                    <PiSmileySadLight size={90} className='text-gray-400'/>
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default SearchList
