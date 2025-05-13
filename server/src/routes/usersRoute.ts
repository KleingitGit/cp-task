import { Router } from "express";
import { UsersController } from "../controllers/usersController";
import {
  createUserSchema,
  deleteUserSchema,
  getUsersSchema,
} from "../schemas/users";
import { ZodError } from "zod";

export const usersRouter = Router();

const usersController = new UsersController();

const OK_STATUS = 200;
const BAD_REQUEST_STATUS = 400;
const INTERNAL_ERROR_STATUS = 500

usersRouter.get("/", async (req, res) => {
  try {
    const parsedPage = getUsersSchema.parse(req.query.page);
    const result = await usersController.get(parsedPage);

    res.status(OK_STATUS).json(result);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(BAD_REQUEST_STATUS).json({ error: "Invalid Input" });
    } else {
      res.status(INTERNAL_ERROR_STATUS).json({ error: "Failed to fetch users" });
    }
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const parsedUser = createUserSchema.parse(req.body);
    const created = await usersController.create(parsedUser);

    res.status(OK_STATUS).json(created);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(BAD_REQUEST_STATUS).json({ error: "Invalid Input" });
    } else {
      res.status(INTERNAL_ERROR_STATUS).json({ error: "Failed to create user" });
    }
  }
});

usersRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const parsedId = deleteUserSchema.parse(id);
    const deleted = await usersController.delete(parsedId);

    res.status(OK_STATUS).json(deleted);
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(BAD_REQUEST_STATUS).json({ error: "Invalid Input" });
    } else {
      res.status(INTERNAL_ERROR_STATUS).json({ error: "Failed to delete user" });
    }
  }
});
