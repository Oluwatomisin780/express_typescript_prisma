import express from 'express';
import type { Response, Request } from 'express';
import { body, validationResult } from 'express-validator';
import * as AuthService from './author.service';
import { error } from 'console';
export const authorRouter = express.Router();

authorRouter.get('', async (request: Request, response: Response) => {
  try {
    const authors = await AuthService.listAuthor();
    return response.status(200).json({
      authors,
    });
  } catch (error: any) {
    response.status(500).json(error.message);
  }
});

authorRouter.get('/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const author = await AuthService.getAuthor(id);
    if (author) {
      return response.status(200).json({
        author,
      });
    }
    return response.status(404).json({
      message: `Author with ${id} does not exist`,
    });
  } catch (error: any) {
    response.status(500).json(error.message);
  }
});

authorRouter.post(
  '/',
  body('firstName').isString(),
  body('lastName').isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const author = request.body;
      const newAuthor = await AuthService.createAuthor(author);
      return response.status(201).json({
        newAuthor,
      });
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

authorRouter.patch(
  '/:id',
  body('firstName').isString(),
  body('lastName').isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors: errors.array(),
      });
    }
    const id: number = parseInt(request.params.id);
    try {
      const author = request.body;
      const updatedData = await AuthService.updateAuthor(author, id);
      return response.status(200).json(updatedData);
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
);

authorRouter.delete('/:id', async (request: Request, response: Response) => {
  const id = parseInt(request.params.id, 10);
  try {
    await AuthService.deleteAuthor(id);
    return response.status(200).json({
      message: `author with ${id} successfully deleted`,
    });
  } catch (error: any) {
    return response.status(400).json(error.message);
  }
});
