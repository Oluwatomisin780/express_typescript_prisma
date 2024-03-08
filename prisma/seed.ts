import { db } from '../src/utils/db.server';

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};
async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );
  const author = await db.author.findFirst({
    where: {
      firstName: 'john',
    },
  });

  await Promise.all(
    getBooks().map((book) => {
      const { isFiction, title, datePublished } = book;
      return db.book.create({
        data: {
          title,
          isFiction,
          datePublished,
          authorId: 3,
        },
      });
    })
  );
}
seed();
function getAuthors(): Array<Author> {
  return [
    {
      firstName: 'john',
      lastName: 'doe',
    },
    {
      firstName: 'tunmise',
      lastName: 'lanre',
    },
    {
      firstName: 'tomi',
      lastName: 'oye',
    },
  ];
}

function getBooks(): Array<Book> {
  return [
    {
      title: 'rich',
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: 'moneey',
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: 'wealth',
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: 'rich',
      isFiction: false,
      datePublished: new Date(),
    },
  ];
}
