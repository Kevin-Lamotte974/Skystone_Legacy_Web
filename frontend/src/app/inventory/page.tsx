export default function InventoryPage() {
  return (
    <main className="min-h-screen pt-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Titre de la section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-amber-500 mb-4">
            Inventaire
          </h1>
          <p className="text-slate-300 text-lg">
            Gérez vos cristaux et ressources collectés
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800 p-6 rounded-lg border border-amber-600/20">
            <h3 className="text-amber-500 font-cinzel text-lg mb-2">Cristaux Collectés</h3>
            <p className="text-3xl font-bold text-white">247</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-amber-600/20">
            <h3 className="text-amber-500 font-cinzel text-lg mb-2">Îles Explorées</h3>
            <p className="text-3xl font-bold text-white">12</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-amber-600/20">
            <h3 className="text-amber-500 font-cinzel text-lg mb-2">Puissance Totale</h3>
            <p className="text-3xl font-bold text-white">1,842</p>
          </div>
        </div>

        {/* Grille d'inventaire */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <div
              key={item}
              className="bg-slate-800 p-4 rounded-lg border border-amber-600/20 hover:border-amber-500/50 transition-all duration-200 cursor-pointer group"
            >
              <div className="aspect-square bg-slate-700 rounded-lg mb-2 flex items-center justify-center">
                {/* Image du cristal à ajouter */}
                <div className="w-12 h-12 bg-amber-500/20 rounded-full"></div>
              </div>
              <h4 className="text-amber-500 font-cinzel text-sm mb-1 group-hover:text-amber-400">
                Cristal {item}
              </h4>
              <p className="text-slate-400 text-xs">Niveau {Math.floor(Math.random() * 10) + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
