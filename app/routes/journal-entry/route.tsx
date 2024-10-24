import { User } from "@prisma/client";
import { ActionFunctionArgs, json, LoaderFunction, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { createPost } from "prisma/helpers/post";
import { findUserById } from "prisma/helpers/users";
import { getUserDataFromRequest } from "~/auth/auth";
import { validateJournalEntryData } from "~/utils/validations";

type ActionData = {
  errors?: {
    email?: string;
    title?: string;
    content?: string;
  },
  message?: string;

};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = String(formData.get("title"));
  const content = String(formData.get("content"));
  const userId = Number(formData.get("userId")) || null;
  const errors = validateJournalEntryData(title, content);
  if (errors) {
    return json({ errors }, { status: 400 });
  }
  try {
    await createPost(title, content, userId);
  } catch (error) {
    return json({ message: "Error submitting journal entry." }, { status: 500 });
  }
  return redirect("/");
}

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserDataFromRequest(request);
  const user = await findUserById(Number(userId));
  return json(user);
};



export default function JournalEntry() {
  const actionResults = useActionData<ActionData>();
  const user = useLoaderData<User>();
  const errors = actionResults?.errors || {};
  return (
    <div className="section">
      <Form method="post" className="journalEntryForm container">
        {user ?
          <>
            <h4 style={{ marginBottom: "24px" }}>
              What's on your mind, {user.name}?
            </h4>
            {errors?.email && <span className="error">{errors.email}</span>}
            <input name="userId" id="userId" type="hidden" readOnly value={user.id} />
          </> :
          <>
            <label>
              Posting anonymously
            </label>
          </>
        }
        <label>
          Title: &nbsp;
        </label>
        {errors.title && <span className="error">{errors.title}</span>}
        <input name="title" id="postTitle" />
        <label>
          Content: &nbsp;
        </label>
        {errors.content && <span className="error">{errors.content}</span>}
        <textarea name="content" id="postContent" />
        <button type="submit" className="button-primary">Post</button>
      </Form>
    </div>
  );
}
