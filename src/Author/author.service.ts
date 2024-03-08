import { db } from '../utils/db.server';

type Author = {
  id: number;
  firstName: string;
  lastName: string;
  created_At: Date;
};
export const listAuthor = async (): Promise<Author[]> => {
  return db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      created_At: true,
    },
  });
};

export const getAuthor = async (id: number): Promise<Author | null> => {
  return db.author.findUnique({
    where: {
      id,
    },
  });
};

export const createAuthor = async (
  author: Omit<Author, 'id'>
): Promise<Author> => {
  const { lastName, firstName } = author;
  return db.author.create({
    data: {
      firstName,
      lastName,
    },
  });
};

export const updateAuthor = (
  author: Omit<Author, 'id'>,
  id: number
): Promise<Author> => {
  return db.author.update({
    where: {
      id,
    },
    data: {
      ...author,
    },
  });
};

export const deleteAuthor = async (id: number): Promise<void> => {
  await db.author.delete({
    where: { id },
  });
};
