import { Link } from "@remix-run/react";

export const Navbar = () => {
  return (
    <nav className="section">
      <div className="navcontainer">
        <Link to="/journal-entry" className="button-secondary">Add Journal Entry</Link>
        <Link to="/" className="button-primary">LOGIN</Link>
        <Link to="/" className="button-primary">SIGN UP</Link>
      </div>
    </nav>
  );
};
