import '../styles/globals.css'
import {AuthProvider} from "../context/auth/login";
import {ErrorStateProvider} from "../context/error/error";
import {Error} from "../components/error";

function MyApp({ Component, pageProps }) {
  return (
      <ErrorStateProvider>
          <AuthProvider>
            <Component {...pageProps} />
            <Error />
          </AuthProvider>
      </ErrorStateProvider>
  )
}

export default MyApp
