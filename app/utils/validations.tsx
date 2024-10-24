
export const validateJournalEntryData = (title: string, content: string) => {
  const errors: {
    title?: string;
    content?: string;
  } = {};

  if (!title) {
    errors.title = "Title is required.";
  }
  if (!content) {
    errors.content = "Content is required.";
  }
  if (content.length > 256) {
    errors.content = "Content must be less than 256 characters.";
  }

  return Object.keys(errors).length ? errors : null;
}

export const validateUserFormData = (email: string, name: string, password: string) => {
  const errors: {
    email?: string;
    name?: string;
    password?: string;
  } = {};
  if (!email || email?.includes('@') === false) {
    errors.email = "Email is required.";
  }
  if (!name) {
    errors.name = "Name is required.";
  }
  if (name && name.length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }
  if (!password) {
    errors.password = "Password is required.";
  }
  if (password && password.length < 6) {
    errors.password = "Password must be at least 8 characters.";
  }
  return Object.keys(errors).length ? errors : null;
}

export const validateLoginFormData = (email: string, password: string) => {
  const errors: {
    email?: string;
    password?: string;
  } = {};

  if (!email || email?.includes('@') === false) {
    errors.email = "Email is required.";
  }
  if (!password) {
    errors.password = "Password is required.";
  }

  return Object.keys(errors).length ? errors : null;
}