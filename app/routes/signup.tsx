import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createAccount } from "prisma/helpers/users";
import { validateUserFormData } from "~/utils/validations";
import bcrypt from 'bcryptjs';
import { setAuthOnResponse } from "~/auth/auth";

type ActionData = {
  errors?: {
    email?: string;
    name?: string;
    password?: string;
  },
  message?: string;

};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const name = String(formData.get("name"));
  const password = String(formData.get("password"));


  const errors = validateUserFormData(email, name, password);
  if (errors) {
    return json({ errors }, { status: 400 });
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = await createAccount(email, name, hashedPassword);

  if (!user) {
    return json({ message: "User already exists, please try with another email." }, { status: 500 });
  } else {
    return setAuthOnResponse(redirect("/"), String(user?.id));
  }
}



export default function SignUp() {
  const actionResults = useActionData<ActionData>();
  const errors = actionResults?.errors || {};
  const message = actionResults?.message;
  return (
    <div className="section">
      <Form method="post" className="journalEntryForm container">
        <label>
          email: &nbsp;
        </label>
        {errors?.email && <span className="error">{errors.email}</span>}
        <input name="email" id="email" type="email" />
        <label>
          Name: &nbsp;
        </label>
        {errors?.name && <span className="error">{errors.name}</span>}
        <input name="name" id="name" />
        <label>
          Password: &nbsp;
        </label>
        {errors?.password && <span className="error">{errors.password}</span>}
        <input name="password" type="password" id="password" />
        <button type="submit" className="button-primary">Sign Up</button>
        {message && <span className="error">{message}</span>}
      </Form>
    </div>
  );
}
