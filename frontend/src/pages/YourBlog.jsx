import { Card } from '@/components/ui/card'
import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from '@/redux/blogSlice'
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Delete, Edit, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

const YourBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog } = useSelector(store => store.blog);
  const getOwnBlog = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/blog/get-own-blogs", { withCredentials: true });
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs));
      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getOwnBlog()
  }, [])

  const formatDate = (index) => {
    const date = new Date(blog[index].createdAt);
    const formattedDate = date.toLocaleDateString("en-GB")
    return formattedDate;
  }

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/blog/delete/${id}`, { withCredentials: true })
      if (res.data.success) {
        const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
        dispatch(setBlog(updatedBlogData));
        toast.success("Blog Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className='pb-10 pt-20 md:ml-[320px] min-h-screen'>
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader className="overflow-x-auto">
                <TableRow>
                  <TableHead >Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead >Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-x-auto">
                {blog.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="flex gap-4 items-center">
                      <img src={item.thumbnail} className='w-20 rounded-md hidden md:block' alt="" />
                      <h1 onClick={() => navigate(`/blogs/${item._id}`)} className='hover:underline cursor-pointer w-[60px] md:w-full truncate'>{item.title}</h1>
                    </TableCell>
                    <TableCell >{item.category}</TableCell>
                    <TableCell >{formatDate(index)}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">
                          <BsThreeDotsVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => navigate(`/dashboard/write-blog/${item._id}`)} className="cursor-pointer"><Edit /> Edit Blog</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => deleteBlog(item._id)}><Trash2 className='text-red-500' /> Delete Blog</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default YourBlog
