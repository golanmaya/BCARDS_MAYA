import './App.css'
import SearchProvider from './context/SerchContext'

import Default from './layouts/Default/Default'
export default function App() {
  return (
    <div className='App'>

      <SearchProvider>
        <Default />
      </SearchProvider>

    </div>
  )
}