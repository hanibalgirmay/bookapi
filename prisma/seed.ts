import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const book1 = await prisma.book.upsert({
        where: {
            id: 1,
            title: "The Shadow Work Journal: A Guide to Integrate and Transcend your Shadows",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 17.46,
            writer: "Keila Shaheen",
            tag: "FICTION",
        },
        create: {
            title: "The Shadow Work Journal: A Guide to Integrate and Transcend your Shadows",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 17.46,
            writer: "Keila Shaheen",
            tag: "FICTION",
        },
        update: {
            id: 1,
            title: "The Shadow Work Journal: A Guide to Integrate and Transcend your Shadows",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 17.46,
            writer: "Keila Shaheen",
            tag: "FICTION",
        }
    });
    const book2 = await prisma.book.upsert({
        where: {
            id: 2,
            title: "Iron Flame (The Empyrean, 2)",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 18.43,
            writer: "Rebecca Yarros",
            tag: "NON_FICTION",
        },
        create: {
            title: "Iron Flame (The Empyrean, 2)",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 18.43,
            writer: "Rebecca Yarros",
            tag: "NON_FICTION",
        },
        update: {
            id: 2,
            title: "Iron Flame (The Empyrean, 2)",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 18.43,
            writer: "Rebecca Yarros",
            tag: "NON_FICTION",
        }
    });
    const book3 = await prisma.book.upsert({
        where: {
            id: 3,
            title: "Holly",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 18.53,
            writer: "Stephen King",
            tag: "SCIENCE",
        },
        create: {
            title: "Holly",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 18.53,
            writer: "Stephen King",
            tag: "SCIENCE",
        },
        update: {
            id: 3,
            title: "Holly",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 18.53,
            writer: "Stephen King",
            tag: "SCIENCE",
        }
    });
    const book4 = await prisma.book.upsert({
        where: {
            id: 4,
            title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 13.79,
            writer: "James Clear",
            tag: "SCIENCE",
        },
        create: {
            title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 13.79,
            writer: "James Clear",
            tag: "SCIENCE",
        },
        update: {
            id: 4,
            title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 13.79,
            writer: "James Clear",
            tag: "SCIENCE",
        }
    });
    const book5 = await prisma.book.upsert({
        where: {
            id: 5,
            title: "Elon Musk",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 16.99,
            writer: "Walter Isaacson",
            tag: "ESSAY",
        },
        create: {
            title: "Elon Musk",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 16.99,
            writer: "Walter Isaacson",
            tag: "ESSAY",
        },
        update: {
            id: 5,
            title: "Elon Musk",
            cover_image: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
            point: 16.99,
            writer: "Walter Isaacson",
            tag: "ESSAY",
        }
    });
}

main()
.catch((e) => console.error(e))
.finally(async () => {
await prisma.$disconnect();
});