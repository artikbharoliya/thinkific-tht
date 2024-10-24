import { User } from "@prisma/client";
import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { findUserPosts } from "prisma/helpers/post";
import { PostWidget } from "~/components/PostWidget";

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

export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  const userId = params.userId || "";
  const posts = await findUserPosts(userId);
  return json({ posts });
};

export default function UserPosts() {
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
