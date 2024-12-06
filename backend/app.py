from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Enregistrer le blueprint d'authentification
app.register_blueprint(auth_bp, url_prefix='/api/auth')

if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)
