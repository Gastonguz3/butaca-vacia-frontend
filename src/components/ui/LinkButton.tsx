interface LinkButtonProps {
    title : string
}

const LinkButton = ({title} : LinkButtonProps) => {
  return (
    <div className="text-sm md:text-md font-bold rounded-full bg-linear-to-r from-red-600 to-gray-700 px-2 py-2 cursor-pointer hover:scale-110 hover:from-red-500 hover:to-gray-600 transition-all duration-300">{title}</div>
  )
}

export default LinkButton