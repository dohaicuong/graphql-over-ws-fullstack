import { extendType, objectType } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import cuid from 'cuid'

const posts = [
  { id: cuid(), title: `Hello Graphql ${cuid()}`, content: 'GraphQL over WS' },
]

export const PostQuery = extendType({
  type: 'Query',
  definition: t => {
    t.nonNull.connectionField('posts', {
      type: 'Post',
      resolve: (_, args) => {
        return connectionFromArray(posts, args) as any
      }
    })
  }
})

export const PostMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('postAdd', {
      type: 'Post',
      resolve: () => {
        const newPost = {
          id: cuid(), 
          title: `Hello Graphql ${cuid()}`,
          content: 'GraphQL over WS'
        }
        posts.push(newPost)

        return newPost
      }
    })
  }
})

export const Post = objectType({
  name: 'Post',
  definition: t => {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.nonNull.string('content')
  }
})