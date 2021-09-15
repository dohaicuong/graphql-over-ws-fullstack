import { Benzene, makeHandler } from '@benzene/ws'
import { makeCompileQuery } from '@benzene/jit'

import { schema } from './schema'

const GQL = new Benzene({
  schema,
  compileQuery: makeCompileQuery(),
})

export const graphqlSchema = makeHandler(GQL)
