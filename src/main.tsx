import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/reset.css'
import './style/global.css'
import ContexProvider from './Context/Context.tsx'
import RouterWrapper from './Router/route.tsx'
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { userApi } from './app/services/api.ts'
import { Toaster } from 'react-hot-toast'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={userApi}>
      <Toaster position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000
        }} />
      <ContexProvider>
        <RouterWrapper />
      </ContexProvider>
    </ApiProvider>
  </React.StrictMode>,
)
