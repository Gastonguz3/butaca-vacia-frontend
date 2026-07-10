import ListRecommendationMovie from "@/components/features/movie/ListRecommedationMovie";
import ReviewSection from "@/components/features/review/ReviewSection";
import { MoviesService } from "@/services/movies.service";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaStar } from "react-icons/fa";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function MovieDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const movie = await MoviesService.getDetails(Number(id));

  return (
    <main className="min-h-screen text-white bg-yellow-700">
      {/* Fondo Superior */}
      <div className="relative h-75 md:h-112.5">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/70 bg-linear-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Contenido */}
      <section className="relative z-10 px-4 pb-10">
        <div className="mx-auto max-w-6xl md:flex md:gap-8">
          {/* Poster */}
          <div className="-mt-32 flex justify-center md:-mt-40 md:block">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={320}
              height={480}
              className="rounded-2xl"
            />
          </div>

          {/* Info */}
          <div className="mt-8 flex-1">
            <h1 className="text-3xl font-extrabold md:text-5xl">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="mt-2 italic text-yellow-400">"{movie.tagline}"</p>
            )}

            {/* Datos Principales */}
            <div className="mt-5 flex flex-wrap gap-3 text-black font-semibold">
              <span className="flex items-center gap-1 rounded-full bg-yellow-500 px-3 py-1  ">
                <FaStar /> {movie.vote_average.toFixed(1)} / 10
              </span>

              <span className="flex items-center gap-1 rounded-full bg-yellow-500 px-4 py-2 ">
                <FaClock /> {movie.runtime} min
              </span>

              <span className="flex items-center gap-1 rounded-full bg-yellow-500 px-4 py-2 ">
                <FaCalendarAlt /> {movie.release_date}
              </span>
            </div>

            {/* Generos */}
            <div className="mt-5 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-yellow-600/20 px-3 py-1 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Sinopsis */}
            <div className="mt-8">
              <h2 className="mb-2 text-xl font-bold">Sinopsis</h2>

              <p className="leading-relaxed text-gray-300">{movie.overview}</p>
            </div>

            {/* Info Extra */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-black/30 p-4">
                <p className="text-sm text-gray-300">Presupuesto</p>

                <p className="font-semibold">
                  USD {movie.budget.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-black/30 p-4">
                <p className="text-sm text-gray-300">Recaudación</p>

                <p className="font-semibold">
                  USD {movie.revenue.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-black/30 p-4">
                <p className="text-sm text-gray-300">Estado</p>

                <p className="font-semibold">{movie.status}</p>
              </div>
            </div>

            {/* Productoras */}
            <div className="mt-8">
              <h2 className="mb-3 text-xl font-bold">Productoras</h2>

              <div className="flex flex-wrap gap-4">
                {movie.production_companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex flex-col items-center gap-3 rounded-xl bg-black/30 px-4 py-3"
                  >
                    {company.logo_path && (
                      <div className="rounded-lg bg-white p-2">
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          width={100}
                          height={100}
                          className="h-3 w-auto"
                        />
                      </div>
                    )}

                    <span className="font-medium">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Saga */}
            {movie.belongs_to_collection && (
              <div className="mt-8">
                <h2 className="mb-3 text-xl font-bold">Franquicia</h2>

                <div className="rounded-xl bg-black/30 p-4">
                  {movie.belongs_to_collection.name}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Comentarios */}
      <ReviewSection tmdbId={movie.id} mediaType="MOVIE" />

      {/*Recomendaciones */}
      <ListRecommendationMovie id={movie.id} />
    </main>
  );
}

export default MovieDetailsPage;
