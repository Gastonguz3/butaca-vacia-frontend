"use client";

import LinkButton from "@/components/ui/LinkButton";
import Logo from "./Logo";
import { useAuth } from "@/hooks/useAuth";
import UserMenu from "./userMenu";

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-zinc-950 h-16 ">
      <div className="flex justify-between items-center h-full w-[90%] mx-auto ">
        <Logo />
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <div className="flex gap-x-4">
            <LinkButton href="/login" title="Iniciar Sesión" />
            <LinkButton href="/register" title="Registrarse" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
