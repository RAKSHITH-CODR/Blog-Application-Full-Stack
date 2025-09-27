import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Bookmark, MessageSquare, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { setBlog } from '@/redux/blogSlice';
import CommentBox from '@/components/CommentBox';

const BlogView = () => {
    const params = useParams();
    const blogId = params.blogId;
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const { blog } = useSelector(store => store.blog);
    const selectedBlog = blog.find(blog => blog._id === blogId)
    const [blogLike, setBlogLike] = useState(selectedBlog?.likes?.length || 0);
    const [liked, setLiked] = useState(selectedBlog.likes?.includes(user._id) || false)

    const changeTimeFormat = (isDate) => {
        const date = new Date(isDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate;
    }

    const handleShare = (blogId) => {
        const blogUrl = `${window.location.origin}/blogs/${blogId}`;

        if (navigator.share) {
            navigator.share({
                title: 'Check out this blog!',
                text: 'Read this amazing blog post',
                url: blogUrl,
            }).then(() => console.log('Shared successfully!')
            ).catch((error) => console.log('Error sharing:', error));
        } else {
            navigator.clipboard.writeText(blogUrl).then(() => {
                toast.success("Blog URL copied to clipboard!")
            })
        }
    }

    const likeOrDislikeHandler = async () => {
        if (!user) {
            toast.error("You must be logged in to like blogs");
            return;
        }
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.get(`https://blog-application-full-stack.onrender.com/api/v1/blog/${selectedBlog?._id}/${action}`,
                { withCredentials: true })
            if (res.data.success) {
                const updatedLikes = liked ? blogLike - 1 : blogLike + 1;
                setBlogLike(updatedLikes);
                setLiked(!liked);
            }
            const updatedBlogData = blog.map(p => p._id === selectedBlog._id ? {
                ...p,
                likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
            } : p
            )
            toast.success(res.data.message);
            dispatch(setBlog(updatedBlogData));
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(
                    `https://blog-application-full-stack.onrender.com/api/v1/blog/get-published-blog/${blogId}`
                );
                if (res.data.success) {
                    setSelectedBlog(res.data.blog);
                    setBlogLike(res.data.blog.likes?.length || 0);
                    if (user) {
                        setLiked(res.data.blog.likes?.includes(user._id));
                    }
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch blog");
            }
        };

        // Try Redux first
        const fromRedux = blog?.find(b => b._id === blogId);
        if (fromRedux) {
            setSelectedBlog(fromRedux);
            setBlogLike(fromRedux.likes?.length || 0);
            if (user) setLiked(fromRedux.likes?.includes(user._id));
        } else {
            fetchBlog();
        }

        window.scrollTo(0, 0);
    }, [blogId, blog, user]);

    return (
        <div className='pt-14'>
            <div className='max-w-6xl mx-auto p-10'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/blogs">
                                Blogs
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{selectedBlog?.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Blog header */}
                <div className="my-8">
                    <h1 className='text-4xl font-bold tracking-tight mb-4'>{selectedBlog?.title}</h1>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src={selectedBlog?.author?.photoUrl} alt={selectedBlog?.author?.name} />
                                <AvatarFallback>
                                    {selectedBlog?.author?.firstName?.charAt(0)}{selectedBlog?.author?.lastName?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='font-medium'>{selectedBlog?.author?.firstName} {selectedBlog?.author?.lastName}</p>
                                <p className='text-muted-foreground text-sm'>{selectedBlog?.author?.occupation}</p>
                            </div>
                        </div>
                        <div className='text-sm text-muted-foreground'>Published on {changeTimeFormat(selectedBlog?.createdAt)}</div>
                    </div>
                </div>
                {/* featured image */}
                <div className="mb-8 rounded-lg overflow-hidden">
                    <img src={selectedBlog?.thumbnail} alt="thumbnail" width={1000} height={500} className='w-full object-cover' />
                    <p className='text-sm text-muted-foreground'>{selectedBlog?.subtitle}</p>
                </div>
                <p dangerouslySetInnerHTML={{ __html: selectedBlog?.description }} />
                <div className="mt-10">
                    <div className="flex flex-wrap gap-2 mb-8">
                        <Badge variant="secondary" className="dark:bg-gray-800">Next.js</Badge>
                        <Badge variant="secondary" className="dark:bg-gray-800">Web Development</Badge>
                        <Badge variant="secondary" className="dark:bg-gray-800">React</Badge>
                        <Badge variant="secondary" className="dark:bg-gray-800">JavaScript</Badge>
                    </div>
                    {/* enagagement */}
                    <div className="flex items-center justify-between border-y dark:border-gray-800 border-gray-300 py-4 mb-8">
                        <div className="flex items-center space-x-4">
                            <div onClick={likeOrDislikeHandler} variant="ghost" className="flex items-center gap-1 cursor-pointer">
                                {
                                    liked ? <FaHeart className='cursor-pointer text-red-600' /> :
                                        <FaRegHeart className='cursor-pointer hover:text-gray-600 dark:text-white' />
                                }
                                <span>{blogLike}</span>
                            </div>
                            <Button variant="ghost" className="flex items-center gap-1 cursor-pointer">
                                <MessageSquare className='h-4 w-4' />
                                <span>1 Comments</span>
                            </Button>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant={"ghost"} size={"sm"} className="cursor-pointer">
                                <Bookmark className='h-4 w-4' />
                            </Button>
                            <Button onClick={() => handleShare(selectedBlog._id)} variant={"ghost"} size={"sm"} className="cursor-pointer">
                                <Share2 className='h-4 w-4' />
                            </Button>
                        </div>
                    </div>
                </div>
                <CommentBox selectedBlog={selectedBlog} />
            </div>
        </div>
    )
}

export default BlogView
