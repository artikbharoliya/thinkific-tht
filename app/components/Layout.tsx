import { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Navbar />
    <div style={{ margin: "1rem 2rem" }}>{children}</div>
  </>
);
