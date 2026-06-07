import Link from "next/link";
import { MdChair } from "react-icons/md";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2 text-yellow-500">
        <MdChair size={30} />
        <h1 className="font-bold hidden md:text-xl sm:block">Butaca Vacia</h1>
    </Link>
  );
};

export default Logo;
