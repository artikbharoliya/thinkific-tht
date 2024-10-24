import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { findUserByEmail } from "prisma/helpers/users";
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
  const user = await findUserByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    return setAuthOnResponse(redirect("/"), String(user?.id));
  } else {
    return json({ message: "Invalid email or password." }, { status: 500 });
  }
}



export default function LogIn() {
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
          Password: &nbsp;
        </label>
        {errors?.password && <span className="error">{errors.password}</span>}
        <input name="password" type="password" id="password" />
        <button type="submit" className="button-primary">Log In</button>
        {message && <span className="error">{message}</span>}
      </Form>
    </div>
  );
}
