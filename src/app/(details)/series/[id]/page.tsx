import ListRecommendationSeries from "@/components/features/series/ListRecommendationSeries";
import { SeriesService } from "@/services/series.service";
import Image from "next/image";
import { FaCalendarAlt, FaTv, FaStar } from "react-icons/fa";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function SeriesDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const series = await SeriesService.getDetails(Number(id));

  return (
    <main className="min-h-screen bg-yellow-700 text-white">
      {/* Fondo Superior */}
      <div className="relative h-75 md:h-112.5">
        <Image
          src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
          alt={series.name}
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
              src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
              alt={series.name}
              width={320}
              height={480}
              className="rounded-2xl"
            />
          </div>

          {/* Info */}
          <div className="mt-8 flex-1">
            <h1 className="text-3xl font-extrabold md:text-5xl">
              {series.name}
            </h1>

            {/* Datos principales */}
            <div className="mt-5 flex flex-wrap gap-3 text-black font-semibold">
              <span className="flex items-center gap-1 rounded-full bg-yellow-500 px-3 py-1">
                <FaStar />
                {series.vote_average.toFixed(1)} / 10
              </span>

              <span className="flex items-center gap-1 rounded-full bg-yellow-500 px-4 py-2">
                <FaTv />
                {series.number_of_seasons} Temporadas
              </span>

              <span className="flex items-center gap-1 rounded-full bg-yellow-500 px-4 py-2">
                <FaCalendarAlt />
                {series.first_air_date}
              </span>
            </div>

            {/* Generos */}
            <div className="mt-5 flex flex-wrap gap-2">
              {series.genres.map((genre) => (
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

              <p className="leading-relaxed text-gray-300">{series.overview}</p>
            </div>

            {/* Info Extra */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-black/30 p-4">
                <p className="text-sm text-gray-300">Temporadas</p>

                <p className="font-semibold">{series.number_of_seasons}</p>
              </div>

              <div className="rounded-xl bg-black/30 p-4">
                <p className="text-sm text-gray-300">Episodios</p>

                <p className="font-semibold">{series.number_of_episodes}</p>
              </div>

              <div className="rounded-xl bg-black/30 p-4">
                <p className="text-sm text-gray-300">País de origen</p>

                <p className="font-semibold">
                  {series.origin_country.join(", ")}
                </p>
              </div>
            </div>

            {/* Creadores */}
            {series.created_by.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 text-xl font-bold">Creadores</h2>

                <div className="flex flex-wrap gap-2">
                  {series.created_by.map((creator) => (
                    <span
                      key={creator.id}
                      className="rounded-lg bg-black/30 px-3 py-2"
                    >
                      {creator.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Canales */}
            {series.networks.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 text-xl font-bold">Canales</h2>

                <div className="flex flex-wrap gap-4">
                  {series.networks.map((network) => (
                    <div
                      key={network.id}
                      className="flex flex-col items-center gap-3 rounded-xl bg-black/30 px-4 py-3"
                    >
                      {network.logo_path && (
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                          alt={network.name}
                          width={100}
                          height={100}
                          className="h-6 w-auto "
                        />
                      )}

                      <span className="font-medium">{network.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Productoras */}
            {series.production_companies.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 text-xl font-bold">Productoras</h2>

                <div className="flex flex-wrap gap-4">
                  {series.production_companies.map((company) => (
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
            )}

            {/* Temporadas */}
            {series.seasons.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">Temporadas</h2>

                <div className="grid gap-4 md:grid-cols-2">
                  {series.seasons.map((season) => (
                    <div key={season.id} className="rounded-xl bg-black/30 p-4">
                      <h3 className="font-semibold">{season.name}</h3>

                      <p className="text-sm text-gray-300 mt-2">
                        Episodios: {season.episode_count}
                      </p>

                      <p className="text-sm text-gray-300">
                        Estreno: {season.air_date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/*Recomandaciones */}

      <ListRecommendationSeries id={series.id}/>
    </main>
  );
}

export default SeriesDetailsPage;
