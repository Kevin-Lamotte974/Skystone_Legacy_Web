<h1 style="color: #0078D7; font-size: 2.5rem; border-bottom: none !important;">🌟 Skystone Legacy Web</h1>

<h2 style="color: #444; font-size: 2rem;">📝 Description</h2>
<p>
  <strong>Skystone Legacy Web</strong> est une application web interactive développée avec un backend en 
  <strong>Django</strong> et un frontend en <strong>React</strong>. Le projet repose sur une architecture moderne 
  et modulaire, offrant une base solide pour une expérience web fluide et scalable.
</p>

<h2 style="color: #444; font-size: 2rem;">🌍 Histoire</h2>
<p>
  Dans un monde fragmenté par un cataclysme inconnu, des îles volantes flottent dans le ciel, chacune abritant des mystères, des créatures uniques et des vestiges d’une civilisation disparue. 
  Les joueurs incarnent des explorateurs de la guilde des <strong>"Fragments"</strong>, voyageant entre les îles à bord de navires volants pour collecter des cristaux anciens. Ces cristaux, dotés d’une énergie mystérieuse, pourraient détenir la clé pour restaurer le monde ou découvrir les causes du cataclysme.
</p>

<h2 style="color: #444; font-size: 2rem;">✨ Caractéristiques principales</h2>
<ul style="list-style-type: square; margin-left: 20px;">
  <li><strong>Frontend</strong> : Interface utilisateur dynamique créée avec React.js.</li>
  <li><strong>Backend</strong> : API REST robuste gérée avec Django et Django REST Framework.</li>
  <li><strong>Exploration</strong> : Parcourez des îles flottantes, relevez des défis uniques et affrontez des factions rivales.</li>
</ul>

<h2 style="color: #444; font-size: 2rem;">⚙️ Prérequis</h2>
<p>Avant de commencer, assurez-vous que les outils suivants sont installés sur votre machine :</p>
<ul style="list-style-type: disc; margin-left: 20px;">
  <li><a href="https://www.python.org/downloads/">Python 3.8+</a></li>
  <li><a href="https://nodejs.org/">Node.js et npm</a></li>
  <li><a href="https://git-scm.com/">Git</a></li>
</ul>

<h2 style="color: #444; font-size: 2rem;">🚀 Installation complète</h2>
<p>Clonez le dépôt GitHub et accédez au dossier principal :</p>
<pre style="background: #272822; color: #fff; padding: 10px; border-radius: 5px; font-size: 1rem;">
<code>
git clone https://github.com/Kevin-Lamotte974/Skystone_Legacy_Web.git
cd Skystone_Legacy_Web
</code>
</pre>

<h2 style="color: #444; font-size: 2rem;">🔧 Configuration du backend (Django)</h2>
<p>Créez et activez un environnement virtuel Python pour isoler les dépendances du backend :</p>
<pre style="background: #272822; color: #fff; padding: 10px; border-radius: 5px; font-size: 1rem;">
<code>
python -m venv venv_backend
</code>
</pre>
<p><strong>Sur Windows :</strong></p>
<pre style="background: #272822; color: #fff; padding: 10px; border-radius: 5px; font-size: 1rem;">
<code>
venv_backend\Scripts\activate
</code>
</pre>
<p><strong>Sur Linux/Mac :</strong></p>
<pre style="background: #272822; color: #fff; padding: 10px; border-radius: 5px; font-size: 1rem;">
<code>
source venv_backend/bin/activate
</code>
</pre>

<p>Installez les dépendances nécessaires au backend à partir du fichier <code>requirements.txt</code> :</p>
<pre style="background: #272822; color: #fff; padding: 10px; border-radius: 5px; font-size: 1rem;">
<code>
pip install -r requirements.txt
</code>
</pre>

<p>Appliquez les migrations pour initialiser la base de données :</p>
<pre style="background: #272822; color: #fff; padding: 10px; border-radius: 5px; font-size: 1rem;">
<code>
cd backend
python manage.py makemigrations
python manage.py migrate
</code>
</pre>

<p>Démarrez le serveur de développement du backend :</p>
<pre style="background: #272822; color: #fff; padding: 10px; border-radius: 5px; font-size: 1rem;">
<code>
python manage.py runserver
</code>
</pre>

<p>Le backend sera accessible à l’adresse suivante : <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a></p>

<h2 style="color: #444; font-size: 2rem;">💻 Configuration du frontend (React)</h2>
<p>Accédez au dossier <code>frontend</code> et installez les dépendances nécessaires avec npm :</p>
<pre style="background: #272822; color: #fff; padding: 10px; border-radius: 5px; font-size: 1rem;">
<code>
cd ../frontend
npm install
</code>
</pre>

<p>Démarrez le serveur de développement React :</p>
<pre style="background: #272822; color: #fff; padding: 10px; border-radius: 5px; font-size: 1rem;">
<code>
npm run dev
</code>
</pre>

<p>Le frontend sera accessible à l’adresse indiquée dans le terminal (par défaut : <a href="http://localhost:5173">http://localhost:5173</a>).</p>
