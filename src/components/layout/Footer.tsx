import Logo from "./navbar/Logo";

const Footer = () => {
  return (
    <footer className="border-t bg-zinc-950 border-yellow-600/20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-8 text-center">
        <Logo />

        <p className=" text-sm text-gray-300">
          Encontrá películas y series según tus gustos.
        </p>

        <div className="text-sm text-gray-400">
          Esta aplicación utiliza la API de{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-yellow-400 hover:text-yellow-300"
          >
            TMDB
          </a>
          . Los datos e imágenes son proporcionados por TMDB, pero esta
          aplicación no está respaldada ni certificada por TMDB.
        </div>

        <p className="text-xs text-gray-300">
          &copy; {new Date().getFullYear()} Butaca Vacia
        </p>
      </div>
    </footer>
  );
};

export default Footer;
