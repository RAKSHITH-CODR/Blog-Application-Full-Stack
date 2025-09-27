import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import { createBlog, deleteBlog, disLikeBlog, getMyTotalLikes, getOwnBlogs, getPublishedBlogs, getSinglePublishedBlog, likeBlog, togglePublishBlog, updateBlog } from "../controllers/blog.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createBlog);
router.route("/:blogId").put(isAuthenticated, singleUpload, updateBlog);
router.route("/get-own-blogs").get(isAuthenticated, getOwnBlogs);
router.route("/delete/:id").delete(isAuthenticated, deleteBlog);
router.route('/:id/like').get(isAuthenticated, likeBlog);
router.route('/:id/dislike').get(isAuthenticated, disLikeBlog);
router.route('/my-blogs/likes').get(isAuthenticated, getMyTotalLikes);
router.route('/get-published-blogs').get(getPublishedBlogs);
router.route('/get-published-blog/:blogId').get(getSinglePublishedBlog);
router.route('/:blogId').patch(togglePublishBlog)

export default router;