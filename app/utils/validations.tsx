
export const validateJournalEntryData = (email: string, title: string, content: string) => {
  const errors: {
    email?: string;
    title?: string;
    content?: string;
  } = {};

  if (!email || !email.includes("@")) {
    errors.email = "Email is required.";
  }
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