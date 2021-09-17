// import { Provider } from 'react-redux'
// import { Playground, store } from 'graphql-playground-react'
// import { websocketLink } from './websocketLink'

import GraphiQL from 'graphiql'
import { subscribe } from 'network'

const App = () => {
  // @ts-ignore
  return <GraphiQL fetcher={subscribe} defaultVariableEditorOpen />
}

export default App

