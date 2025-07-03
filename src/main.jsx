import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import {persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'
import store from './redux/store.jsx'
import { Provider } from 'react-redux'
import 'react-loading-skeleton/dist/skeleton.css'

const persister  = persistStore(store)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <PersistGate loading = {null} persistor={persister}>
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
        <BrowserRouter>
         <App />
         <Toaster />
        </BrowserRouter>
    </GoogleOAuthProvider>
    </PersistGate>
    </Provider>
)
