import HeroCard from "./HeroCard";

const HeroSection = () => {
  return (
    <section id="home" className=" flex flex-col items-center px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          ¿No sabés qué mirar hoy?
        </h1>

        <p className="mt-4 text-base sm:text-lg">
          Encontrá películas y series según tus gustos
        </p>

        <p className="mt-2 text-sm sm:text-base">
          Elegí un género, seleccioná película o serie y dejá que nosotros te recomendemos algo
        </p>
      </div>

      <HeroCard />
    </section>
  );
};

export default HeroSection;
