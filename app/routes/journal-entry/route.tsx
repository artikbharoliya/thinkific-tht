import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createPost } from "prisma/helpers/post";
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
  const email = String(formData.get("email"));
  const errors = validateJournalEntryData(email, title, content);
  if (errors) {
    return json({ errors }, { status: 400 });
  }
  try {
    await createPost(title, content, email);
  } catch (error) {
    return json({ message: "Error submitting journal entry." }, { status: 500 });
  }
  return redirect("/");
}



export default function JournalEntry() {
  const actionResults = useActionData<ActionData>();
  const errors = actionResults?.errors || {};
  return (
    <div className="section">
      <Form method="post" className="journalEntryForm container">
        <label>
          email: &nbsp;
        </label>
        {errors?.email && <span className="error">{errors.email}</span>}
        <input name="email" id="email" type="email" />
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
