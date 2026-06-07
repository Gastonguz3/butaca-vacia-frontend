interface LinkButtonProps {
    title : string
}

const LinkButton = ({title} : LinkButtonProps) => {
  return (
    <div className="text-sm md:text-md font-bold rounded-full bg-linear-to-r from-gray-600 to-yellow-600 px-2 py-2 cursor-pointer hover:scale-110 hover:from-gray-500 hover:to-yellow-500 transition-all duration-300">{title}</div>
  )
}

export default LinkButton