import type { Post, User } from "@prisma/client";
import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchPosts } from "prisma/helpers/post";
import { fetchUsers } from "prisma/helpers/users";
import { PostWidget } from "~/components/PostWidget";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type LoaderData = {
  posts: {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: string;
    author: User;
  }[];
  users: User[]
};

export const loader: LoaderFunction = async () => {
  const posts = await fetchPosts();
  const users = await fetchUsers();

  return json({ posts, users });
};

export default function Index() {
  const data = useLoaderData<LoaderData>();
  return (
    <div className="section">
      <div className="container">
        {
          data.posts.map((post) => (
            <PostWidget
              key={post.id}
              title={post.title}
              content={post.content}
              id={post.id}
              authorId={post.authorId}
              createdAt={new Date(post.createdAt).toLocaleString()}
              author={post.author}
            />
          ))
        }
        <h2>Posts</h2>
        {/* todo: render posts in a user-friendly way */}
        <pre>{JSON.stringify(data.posts, null, 2)}</pre>
        <h2>Users:</h2>
        <pre>{JSON.stringify(data.users, null, 2)}</pre>
      </div>
    </div>
  );
}
