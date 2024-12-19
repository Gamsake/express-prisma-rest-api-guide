import express from "express";
import prisma from "../config/database.js";

const router = express.Router();

// 사용자 생성
router.post("/", async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// 모든 사용자 조회
router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// 특정 사용자 조회
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        posts: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// 사용자 정보 수정
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, name } = req.body;
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        email,
        name,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// 사용자 삭제
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
