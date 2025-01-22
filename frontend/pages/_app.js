import '../styles/globals.css';
import '../styles/cards.css';
import { AudioProvider } from '../context/AudioContext';
import { GameProvider } from '../context/GameContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <AudioProvider>
      <GameProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GameProvider>
    </AudioProvider>
  );
}

export default MyApp;