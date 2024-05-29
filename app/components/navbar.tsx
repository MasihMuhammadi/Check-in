import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="mt-2 flex flex-row justify-center w-full items-center">
        <Link href="/" className=" mx-2 lg:mx-4">
          Home
        </Link>
        <Link className="mx-2 lg:mx-4 " href="/about">
          About
        </Link>
        {/* <Link className="mx-2 lg:mx-4 " href="#">
          Services
        </Link> */}
        <Link className="mx-2 lg:mx-4 " href="/courses">
          Courses
        </Link>
        <Link className="mx-2 lg:mx-4 " href="/contact">
          Contact
        </Link>
      </nav>
    </>
  );
};
export default Navbar;
