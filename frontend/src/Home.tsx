import { useLazyLoadQuery, useMutation, usePaginationFragment } from 'react-relay/hooks'
import { graphql } from 'babel-plugin-relay/macro'
import { HomeQuery } from '__generated__/HomeQuery.graphql'
import { useCallback } from 'react'
import { PostListPaginationQuery } from '__generated__/PostListPaginationQuery.graphql'
import { Home_posts$key } from '__generated__/Home_posts.graphql'

const Home = () => {
  const queryRef = useLazyLoadQuery<HomeQuery>(
    graphql`
      query HomeQuery {
        ...Home_posts
      }
    `,
    {}
  )

  const { data, isLoadingNext, hasNext, loadNext } = usePaginationFragment<PostListPaginationQuery, Home_posts$key>(
    graphql`
      fragment Home_posts on Query
      @refetchable(queryName: "PostListPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int!", defaultValue: 10 }
        cursor: { type: "String" }
      )
      {
        posts(first: $count, after: $cursor)
        @connection(key: "Home_posts")
        {
          edges {
            node {
              id
              title
              content
            }
          }
        }
      }
    `,
    queryRef
  )

  const [addPostCommit] = useMutation(graphql`
    mutation HomeMutation($connections: [ID!]!) {
      postAdd
      @appendNode(
        connections: $connections,
        edgeTypeName: "PostEdge"
      )
      {
        id
        title
        content
      }
    }
  `)
  const handleOnClick = useCallback(() => {
    addPostCommit({
      variables: {
        connections: ["client:root:__Home_posts_connection"]
      },
      onCompleted: (res, errors) => {
        if(errors) {
          return errors.forEach(error => console.log(error))
        }
      },
      onError: err => {
        console.log(err)
      }
    })
  }, [addPostCommit])

  return (
    <>
      <button onClick={handleOnClick}>
        +
      </button>
      <ul style={{ maxHeight: 600, overflowY: 'auto' }}>
        {data.posts.edges.map(({ node: post }) => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
      {
        isLoadingNext ? 'loading' :
        hasNext ? <button onClick={() => loadNext(10)}>Load more post</button> :
        null
      }
    </>
  )
}

export default Home