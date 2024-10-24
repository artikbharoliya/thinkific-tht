import { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";

type LayoutProps = {
  userId: string,
}

export const Layout = ({ userId, children }: PropsWithChildren<LayoutProps>) => (
  <>
    <Navbar userId={userId} />
    <div style={{ margin: "1rem 2rem" }}>{children}</div>
  </>
);
