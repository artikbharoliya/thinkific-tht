import { Link } from "@remix-run/react";

type NavbarProps = {
  userId: string | null;
};

export const Navbar = ({ userId }: NavbarProps) => {
  return (
    <nav className="section nav">
      <div className="navcontainer">
        <Link to="/journal-entry" className="button-secondary">Add Journal Entry</Link>
        {userId ?
          <Link to="/logout" className="button-primary">LOGOUT</Link> :
          <>
            <Link to={"/login"} className="button-primary">LOGIN</Link>
            <Link to="/signup" className="button-primary">SIGN UP</Link>
          </>
        }
      </div>
    </nav>
  );
};
