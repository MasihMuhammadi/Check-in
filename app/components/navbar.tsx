import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="mt-2 flex flex-row justify-center w-full items-center">
        <Link href="/" className=" mx-6">
          Home
        </Link>
        <Link className="mx-4 sm:mx-4 " href="/about">
          About
        </Link>
        <Link className="mx-4 sm:mx-4 " href="#">
          Services
        </Link>
        <Link className="mx-4 sm:mx-4 " href="/contact">
          Contact
        </Link>
        <Link className="mx-4 sm:mx-4 " href="/contact">
          Courses
        </Link>
      </nav>
    </>
  );
};
export default Navbar;
