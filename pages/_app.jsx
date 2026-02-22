import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import Cursor from '../components/Cursor'

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <Cursor />
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  )
}
