import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import { Edit, Eye, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Comments = () => {
  const [allComments, setAllComments] = useState([]);
  const navigate = useNavigate();

  const getTotalComments = async () => {
    try {
      const res = await axios.get(`https://blog-application-full-stack.onrender.com/api/v1/comment/my-blogs/comments`, { withCredentials: true });
      if (res.data.success) {
        setAllComments(res.data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTotalComments();
  }, [])

  return (
    <div className='pb-10 pt-20 md:ml-[320px] min-h-screen'>
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
            <Table >
              <TableCaption>A list of your recent comments.</TableCaption>
              <TableHeader className="overflow-x-auto">
                <TableRow>
                  <TableHead>Blog Title</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-x-auto">
                {allComments.map((comment, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <h1 className='w-[60px] truncate md:w-full'>{comment.postId.title}</h1>
                      </TableCell>
                    <TableCell className="whitespace-normal break-words max-w-sm">{comment?.content}</TableCell>
                    <TableCell className="whitespace-normal break-words max-w-sm">{comment?.userId?.firstName}</TableCell>
                    <TableCell className="text-right flex gap-3 items-center justify-center">
                      <Eye
                        className="cursor-pointer"
                        onClick={() => navigate(`/blogs/${comment.postId._id}`)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </Card>
      </div>
    </div>
  )
}

export default Comments
