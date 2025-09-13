import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { LuSend } from "react-icons/lu";
import axios from 'axios';
import { setComment } from '@/redux/commentSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'sonner';
import BlogCard from './BlogCard';
import { setBlog } from '@/redux/blogSlice';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Edit, Trash2 } from 'lucide-react';

const CommentBox = ({ selectedBlog }) => {
    const { user } = useSelector(store => store.auth);
    const { comment } = useSelector(store => store.comment);
    const [content, setContent] = useState("");
    const { blog } = useSelector(store => store.blog);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setContent(inputText);
        } else {
            setContent("");
        }
    }

    const commentSubmit = async () => {
        try {
            const res = await axios.post(`https://blog-application-full-stack.onrender.com/api/v1/comment/${selectedBlog?._id}/create`, { content }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            if (res.data.success) {
                let updatedCommentData

                if (comment?.length > 0) {
                    updatedCommentData = [...comment, res.data.comment];
                } else {
                    updatedCommentData = [res.data.comment];
                }
                dispatch(setComment(updatedCommentData));

                const updatedBlogData = blog.map(blog => blog._id === selectedBlog._id ? { ...blog, comments: updatedCommentData } : blog)
                dispatch(setBlog(updatedBlogData));
                setContent("");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast("Comment Not added");
        }
    }

    const deleteComment = async (commentId) => {
        try {
            const res = await axios.delete(`https://blog-application-full-stack.onrender.com/api/v1/comment/${commentId}/delete`, { withCredentials: true })
            if (res.data.success) {
                const updatedCommentData = comment.filter((item) => item._id !== commentId);
                dispatch(setComment(updatedCommentData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Comment Not Deleted");
        }
    }

    const editCommentSubmit = async (commentId) => {
        try {
            const res = await axios.put(`https://blog-application-full-stack.onrender.com/api/v1/comment/${commentId}/edit`, { content: editedContent }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            if (res.data.success) {
                const updatedCommentData = comment.map((item) => item._id === commentId ? { ...item, content: editedContent } : item);
                dispatch(setComment(updatedCommentData));
                toast.success(res.data.message);
                setEditCommentId(null);
                setEditedContent("");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to edit comment");
        }
    }

    const likeComment = async (commentId) => {
        try {
            const res = await axios.get(`https://blog-application-full-stack.onrender.com/api/v1/comment/${commentId}/like`, { withCredentials: true });
            if (res.data.success) {
                const updatedComment = res.data.updatedComment;
                const updatedCommentData = comment.map((item) => item._id === commentId ? updatedComment : item);
                dispatch(setComment(updatedCommentData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log("Error liking comment", error);
            toast.error("Something went wrong");
        }
    }

    const handleReply = async (commentId) => {
        try {
            const res = await axios.post(`https://blog-application-full-stack.onrender.com/api/v1/comment/${commentId}/reply`, { content }, { withCredentials: true });
            if (res.data.success) {
                const updatedCommentData = comment.map((item) => item._id === commentId ? res.data.updatedComment : item);
                dispatch(setComment(updatedCommentData));
                toast.success(res.data.message);
                setReplyingTo(null);
                setContent("");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to reply to comment");
        }
    }

    useEffect(() => {
        const getAllComments = async () => {
            try {
                const res = await axios.get(`https://blog-application-full-stack.onrender.com/api/v1/comment/${selectedBlog?._id}/comment/all`)
                const data = res.data.comments;
                dispatch(setComment(data));
            } catch (error) {
                console.log(error);

            }
        }
        if (selectedBlog?._id) getAllComments();
    }, [selectedBlog])
    return (
        <div>
            <div className='flex gap-4 mb-4 items-center'>
                <Avatar>
                    <AvatarImage src={user.photoUrl} alt={user.name} className="object-cover" />
                    <AvatarFallback>
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <h3 className='font-semibold'>{user.firstName} {user.lastName}</h3>
            </div>
            <div className="flex gap-3">
                <Textarea
                    placeholder="Leave a comment..."
                    className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    value={content}
                    onChange={changeEventHandler}
                />
                <Button onClick={commentSubmit} className="mt-3 cursor-pointer">
                    <LuSend />
                </Button>
            </div>
            {
                comment?.length > 0 ? <div className='mt-7 bg-gray-100 dark:bg-gray-800 p-5 rounded-md'>
                    {
                        comment?.map((item, index) => {
                            return <div key={index} className="mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-3 items-start">
                                        <Avatar>
                                            <AvatarImage src={item?.userId?.photoUrl} className="object-cover" />
                                            <AvatarFallback>{item?.userId?.firstName?.charAt(0)}{item?.userId?.lastName?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="mb-2 space-y-1 md:w-[400px]">
                                            <h1 className='font-semibold'>{item?.userId?.firstName} {item?.userId?.lastName} <span className='text-sm ml-2 font-light dark:text-gray-400'>yesterday</span></h1>
                                            {
                                                editCommentId === item._id ? (
                                                    <>
                                                        <Textarea
                                                            value={editedContent}
                                                            onChange={(e) => setEditedContent(e.target.value)}
                                                            className="mb-2 bg-gray-200 dark:bg-gray-700"
                                                        />
                                                        <div className='flex py-1 gap-2'>
                                                            <Button onClick={() => editCommentSubmit(item?._id)} className="cursor-pointer">Save</Button>
                                                            <Button variant="outline" onClick={() => setEditCommentId(null)} className="cursor-pointer">Cancel</Button>
                                                        </div>
                                                    </>
                                                ) : <p>{item?.content}</p>
                                            }


                                            <div className="flex gap-5 items-center">
                                                <div className="flex gap-2 items-center">
                                                    <div onClick={() => likeComment(item._id)} className="flex gap-1 items-center cursor-pointer">
                                                        {
                                                            item.likes.includes(user._id) ? <FaHeart className='cursor-pointer text-red-600' /> :
                                                                <FaRegHeart className='cursor-pointer hover:text-gray-600 dark:text-white' />
                                                        }
                                                        <span>{item?.numberOfLikes}</span>
                                                    </div>
                                                </div>
                                                <p onClick={() => handleReply(item._id)} className="text-sm cursor-pointer">Reply</p>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        user._id === item?.userId?._id ?
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="cursor-pointer">
                                                    <BsThreeDotsVertical />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => {
                                                        setEditCommentId(item._id);
                                                        setEditedContent(item.content);
                                                    }} className="cursor-pointer"><Edit /> Edit Blog</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => deleteComment(item._id)}><Trash2 className='text-red-500' /> Delete Comment</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu> : null
                                    }
                                </div>
                            </div>
                        })
                    }
                </div> : null
            }
        </div>
    )
}

export default CommentBox
