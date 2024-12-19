import express from "express";
import prisma from "../config/database.js";

const router = express.Router();

// 게시글 생성
router.post("/", async (req, res, next) => {
  try {
    const { title, content, authorId, published } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published || false,
        author: {
          connect: { id: parseInt(authorId) },
        },
      },
    });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// 모든 게시글 조회
router.get("/", async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// 특정 게시글 조회
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true,
      },
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// 게시글 수정
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        published,
      },
    });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// 게시글 삭제
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
