import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Blockchain from './Blockchain'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Blockchain />
  </StrictMode>,
)
