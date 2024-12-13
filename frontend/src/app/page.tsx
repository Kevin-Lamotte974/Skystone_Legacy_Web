import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fond animé */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/50"></div>
        <div className="absolute inset-0 bg-[url('/floating-islands.jpg')] bg-cover bg-center opacity-30"></div>
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Logo et titre */}
          <div className="mb-12">
            <div className="relative inline-block">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <Image
                src="/src/assets/logo/Crystal_Skystone_Legacy.png"
                alt="Skystone Legacy"
                width={180}
                height={180}
                className="relative rounded-full border-2 border-purple-500/50"
              />
            </div>
            
            <h1 className="mt-8 text-6xl md:text-7xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 animate-text-shine">
                Skystone Legacy
              </span>
            </h1>
            
            <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Plongez dans un univers mystique où les îles flottantes recèlent des secrets millénaires.
              Devenez le héros d'une légende où chaque cristal raconte une histoire.
            </p>
          </div>

          {/* Caractéristiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: "🗺️",
                title: "Exploration",
                description: "Découvrez des îles mystérieuses et des ruines anciennes"
              },
              {
                icon: "⚔️",
                title: "Combat",
                description: "Affrontez des créatures légendaires"
              },
              {
                icon: "✨",
                title: "Magie",
                description: "Maîtrisez les pouvoirs des cristaux ancestraux"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-purple-500/20
                         hover:border-purple-500/40 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-purple-300 mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/game"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600
                       rounded-lg font-bold text-white shadow-lg shadow-purple-500/20
                       hover:shadow-purple-500/40 transition-all duration-300 group"
            >
              Commencer l'aventure
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>

            <Link
              href="/lore"
              className="inline-flex items-center px-8 py-4 border-2 border-purple-500 text-purple-400
                       rounded-lg font-bold hover:bg-purple-500/10 transition-all duration-300"
            >
              Découvrir l'histoire
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
