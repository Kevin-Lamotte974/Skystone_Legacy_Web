export default function ShipPage() {
  return (
    <main className="min-h-screen pt-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Titre de la section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-amber-500 mb-4">
            Votre Vaisseau
          </h1>
          <p className="text-slate-300 text-lg">
            Personnalisez et améliorez votre vaisseau volant
          </p>
        </div>

        {/* Aperçu du vaisseau */}
        <div className="bg-slate-800 rounded-lg p-8 mb-12 border border-amber-600/20">
          <div className="aspect-video bg-slate-700 rounded-lg mb-8 flex items-center justify-center">
            {/* Image du vaisseau à ajouter */}
            <div className="text-slate-500">Aperçu du vaisseau</div>
          </div>

          {/* Stats du vaisseau */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-amber-500 font-cinzel text-lg mb-2">Vitesse</h3>
              <div className="h-2 bg-slate-700 rounded-full">
                <div className="h-full w-3/4 bg-amber-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <h3 className="text-amber-500 font-cinzel text-lg mb-2">Défense</h3>
              <div className="h-2 bg-slate-700 rounded-full">
                <div className="h-full w-1/2 bg-amber-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <h3 className="text-amber-500 font-cinzel text-lg mb-2">Capacité</h3>
              <div className="h-2 bg-slate-700 rounded-full">
                <div className="h-full w-2/3 bg-amber-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <h3 className="text-amber-500 font-cinzel text-lg mb-2">Énergie</h3>
              <div className="h-2 bg-slate-700 rounded-full">
                <div className="h-full w-4/5 bg-amber-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Améliorations disponibles */}
        <h2 className="text-2xl font-cinzel font-bold text-amber-500 mb-6">
          Améliorations Disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((upgrade) => (
            <div
              key={upgrade}
              className="bg-slate-800 p-6 rounded-lg border border-amber-600/20 hover:border-amber-500/50 transition-all duration-200"
            >
              <h3 className="text-xl font-cinzel text-amber-500 mb-2">
                Amélioration {upgrade}
              </h3>
              <p className="text-slate-300 mb-4">
                Une amélioration qui rendra votre vaisseau plus puissant...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-amber-500">
                  <span className="font-bold">500</span> cristaux
                </span>
                <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors duration-200">
                  Améliorer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
