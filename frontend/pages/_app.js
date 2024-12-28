import '../styles/globals.css';
import { AudioProvider } from '../context/AudioContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <AudioProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AudioProvider>
  );
}

export default MyApp;