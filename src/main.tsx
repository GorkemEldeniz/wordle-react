import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/reset.css'
import './style/global.css'
import ContexProvider from './Context/Context.tsx'
import RouterWrapper from './Router/route.tsx'
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { pokemonApi } from './app/services/api.ts'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={pokemonApi}>
      <ContexProvider>
        <RouterWrapper />
      </ContexProvider>
    </ApiProvider>
  </React.StrictMode>,
)
