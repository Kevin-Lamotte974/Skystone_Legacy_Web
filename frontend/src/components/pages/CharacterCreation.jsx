import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/CharacterCreation.css';

function CharacterCreation() {
  const navigate = useNavigate();
  const [character, setCharacter] = useState({
    name: '',
    class: 'warrior'
  });

  const classes = [
    { id: 'warrior', name: 'Guerrier', description: 'Maître du combat rapproché' },
    { id: 'mage', name: 'Mage', description: 'Manipulateur des arcanes' },
    { id: 'archer', name: 'Archer', description: 'Expert du combat à distance' },
    { id: 'rogue', name: 'Voleur', description: 'Maître de la furtivité' }
  ];

  const handleChange = (field, value) => {
    setCharacter(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Pour l'instant, on redirige simplement vers la page d'accueil
    // La sauvegarde sera implémentée plus tard avec la base de données
    navigate('/');
  };

  return (
    <div className="character-creation-container">
      <div className="character-creation-background">
        <div className="crystal-stars"></div>
        <div className="crystal-grid"></div>
        <div className="crystal-particles"></div>
        <div className="crystal-glow"></div>
      </div>

      <div className="character-creation-content">
        <div className="droid-icon-container">
          <svg 
            className="droid-icon"
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fond lumineux */}
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              className="droid-glow"
            />
            {/* Corps principal */}
            <circle 
              cx="50" 
              cy="50" 
              r="35" 
              className="droid-body"
            />
            {/* Antennes */}
            <line 
              x1="35" 
              y1="15" 
              x2="35" 
              y2="5" 
              className="droid-antenna"
            />
            <line 
              x1="65" 
              y1="15" 
              x2="65" 
              y2="5" 
              className="droid-antenna"
            />
            {/* Œil principal */}
            <circle 
              cx="50" 
              cy="40" 
              r="12" 
              className="droid-eye"
            />
            {/* Œil interne */}
            <circle 
              cx="50" 
              cy="40" 
              r="6" 
              className="droid-eye-inner"
            />
            {/* Détails du corps */}
            <path 
              d="M30 60 Q50 80 70 60" 
              className="droid-detail"
              fill="none"
            />
            <line 
              x1="30" 
              y1="50" 
              x2="70" 
              y2="50" 
              className="droid-detail"
            />
          </svg>
        </div>

        <h1 className="character-title">Création du Droïde</h1>
        
        <form onSubmit={handleSubmit} className="character-form">
          <div className="form-section">
            <label>Nom du Droïde</label>
            <input
              type="text"
              value={character.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              className="character-input"
              placeholder="Entrez le nom de votre droïde"
            />
          </div>

          <div className="form-section">
            <label>Classe</label>
            <div className="class-selection">
              {classes.map(classOption => (
                <div
                  key={classOption.id}
                  className={`class-card ${character.class === classOption.id ? 'selected' : ''}`}
                  onClick={() => handleChange('class', classOption.id)}
                >
                  <h3>{classOption.name}</h3>
                  <p>{classOption.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="create-button">
              Créer le droïde
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/')}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CharacterCreation;
