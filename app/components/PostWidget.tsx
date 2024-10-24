import { Post, User } from "@prisma/client";

type PostWidgetProps = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  author: User;

};

export const PostWidget: React.FC<PostWidgetProps> = ({
  title, content, authorId, createdAt, author
}
) => (
  <>
    <div className="postContainer">
      <div className="authorContainer">
        <img style={{ display: 'flex', justifyContent: 'center' }} src='/public/user.svg' height="16x" width="16x" about="user" />
        <span>{author.name}</span>
        <div className="postTime">
          <span>{createdAt}</span>
        </div>
      </div>
      <div className="contentContainer">
        <h3 className="postTitle">{title}</h3>
        <p className="postContent"> {content}</p>
      </div>
    </div>
  </>
);