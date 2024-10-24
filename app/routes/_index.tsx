import type { User } from "@prisma/client";
import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchPosts } from "prisma/helpers/post";
import { PostWidget } from "~/components/PostWidget";

export const meta: MetaFunction = () => {
  return [
    { title: "Public Journal" },
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
};

export const loader: LoaderFunction = async () => {
  const posts = await fetchPosts();
  return json({ posts });
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
      </div>
    </div>
  );
}
