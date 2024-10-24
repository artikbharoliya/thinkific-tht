import { LoaderFunction } from "@remix-run/node";
import { redirectWithClearedCookie } from "~/auth/auth";


export const loader: LoaderFunction = async () => {
  return await redirectWithClearedCookie();
};
