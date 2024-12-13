export default function MapPage() {
  return (
    <main className="min-h-screen pt-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Titre de la section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-amber-500 mb-4">
            Carte du Monde
          </h1>
          <p className="text-slate-300 text-lg">
            Explorez les îles flottantes et découvrez leurs secrets
          </p>
        </div>

        {/* Grille des îles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Carte d'île exemple */}
          {[1, 2, 3, 4, 5, 6].map((island) => (
            <div
              key={island}
              className="bg-slate-800 rounded-lg overflow-hidden border border-amber-600/20 hover:border-amber-500/50 transition-colors duration-200"
            >
              <div className="h-48 bg-slate-700 relative">
                {/* Image de l'île à ajouter */}
                <div className="absolute bottom-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm">
                  Niveau {Math.floor(Math.random() * 20) + 1}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-cinzel text-xl font-bold text-amber-500 mb-2">
                  Île {island}
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  Une île mystérieuse flottant dans les cieux, abritant d'anciens secrets...
                </p>
                <button className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors duration-200">
                  Explorer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
