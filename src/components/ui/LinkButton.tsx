import Link from "next/link"

interface LinkButtonProps {
    title : string,
    href: string
}

const LinkButton = ({title, href} : LinkButtonProps) => {
  return (
    <Link href={href} className="text-sm md:text-md font-bold rounded-full bg-linear-to-r from-gray-600 to-yellow-600 px-2 py-2 cursor-pointer hover:scale-110 hover:from-gray-500 hover:to-yellow-500 transition-all duration-300" >{title}</Link>
  )
}

export default LinkButton