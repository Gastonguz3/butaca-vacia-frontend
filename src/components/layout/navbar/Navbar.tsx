import LinkButton from "@/components/ui/LinkButton";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="bg-zinc-950 h-16 ">
      <div className="flex justify-between items-center h-full w-[90%] mx-auto ">
        <Logo />
        <div className="flex gap-x-4">
          <LinkButton title="Iniciar Sesion"/>
          <LinkButton title="Registrarse"/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
