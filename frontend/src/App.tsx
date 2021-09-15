import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { relay } from 'providers/relay'
import Home from 'Home'
import { Suspense } from 'react'

const App = () => {
  return (
    <RelayEnvironmentProvider environment={relay}>
      <Suspense fallback='loading...'>
        <Home />
      </Suspense>
    </RelayEnvironmentProvider>
  )
}

export default App
