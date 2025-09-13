import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search, LogOut, User, ChartColumnBig, } from 'lucide-react'
import { FaMoon, FaRegEdit, FaSun } from 'react-icons/fa'
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { Avatar } from './ui/avatar'
import { AvatarFallback, AvatarImage } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/themeSlice'
import { toast } from 'sonner'
import axios from 'axios'
import userLogo from '../assets/user.jpg'
import { setUser } from '../redux/authSlice'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { LiaCommentSolid } from "react-icons/lia";
import ResponsiveMenu from './ResponsiveMenu'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const { theme } = useSelector(store => store.theme)
    const [searchTerm, setSearchTerm] = useState("");
    const [openNav, setOpenNav] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleNav = () => {
        setOpenNav(!openNav);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if(searchTerm.trim() !== ""){
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm("");
        }
    }

    const logoutHandler = async (e) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, { withCredentials: true })
            if (res.data.success) {
                navigate('/login')
                dispatch(setUser(null))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    }
    return (
        <div className='py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50'>
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-6'>
                {/* logo section */}
                <div className='flex items-center gap-7'>
                    <Link to={'/'}>
                        <div className='flex gap-2 items-center' >
                            <img src={Logo} className='w-7 h-7 md:w-10 md:h-10 dark:invert' />
                            <h1 className='font-bold text-2xl lg:text-4xl'>InkSpire</h1>
                        </div>
                    </Link>
                    <div className='relative hidden md:block'>
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block"
                        />
                        <Button onClick={handleSearch} className="absolute right-0 top-0 cursor-pointer">
                            <Search />
                        </Button>
                    </div>
                </div>
                {/* Nav section */}
                <nav className='flex md:gap-7 gap-4 items-center'>
                    <ul className='hidden md:flex gap-7 items-center text-xl font-semibold'>
                        <Link to={'/'}><li>Home</li></Link>
                        <Link to={'/blogs'}><li>Blogs</li></Link>
                        <Link to={'/about'}><li>About</li></Link>
                    </ul>
                    <div className='flex'>
                        <Button className='cursor-pointer' onClick={() => dispatch(toggleTheme())}>
                            {
                                theme === 'light' ? <FaMoon /> : <FaSun />
                            }
                        </Button>
                        {
                            user ? <div className='ml-7 flex gap-3 items-center'>



                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            {/* <AvatarImage src={user.profilePicture} alt={user.name} />
                                    <AvatarFallback>{user.name}</AvatarFallback> */}
                                            <AvatarImage src={user.photoUrl || userLogo} className="object-cover"/>
                                            <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align="start">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className='cursor-pointer' onClick={() => navigate('/dashboard/profile')}>
                                                <User />
                                                <span>Profile</span>
                                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className='cursor-pointer' onClick={() => navigate('/dashboard/your-blog')}>
                                                <ChartColumnBig />
                                                <span>Your Blogs</span>
                                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className='cursor-pointer' onClick={() => navigate('/dashboard/comments')}>
                                                <LiaCommentSolid />
                                                <span>Comments</span>
                                                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className='cursor-pointer' onClick={() => navigate('/dashboard/write-blog')}>
                                                <FaRegEdit />
                                                <span>Write Blog</span>
                                                <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className='cursor-pointer' onClick={logoutHandler}>
                                            <LogOut />
                                            <span>Log out</span>
                                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button onClick={logoutHandler} className='cursor-pointer hidden md:block'>Logout</Button>
                            </div> : <div className='ml-7 md:flex gap-2'>
                                <Link to={'/login'}><Button className='cursor-pointer'>Login</Button></Link>
                                <Link className='hidden md:block' to={'/signup'}><Button className='cursor-pointer'>SignUp</Button></Link>
                            </div>
                        }
                    </div>
                    {
                        openNav ? <HiMenuAlt3 onClick={toggleNav} className='w-7 h-7 md:hidden'/> : <HiMenuAlt1 onClick={toggleNav} className='w-7 h-7 md:hidden' />
                    }
                </nav>
                <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} logoutHandler={logoutHandler}/>
            </div>
        </div>
    )
}

export default Navbar
