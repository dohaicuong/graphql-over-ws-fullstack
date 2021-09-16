import { GraphQLError } from 'graphql'
import {
  Environment,
  Network,
  Observable,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from 'relay-runtime';
import { createClient } from 'graphql-ws'

const subscriptionsClient = createClient({
  url: 'ws://localhost:4000/graphql',
  lazy: false,
  connectionParams: () => {
    return {}
    // const session = getSession();
    // if (!session) {
    //   return {}
    // }
    // return {
    //   Authorization: `Bearer ${session.token}`,
    // }
  },
})

function fetchOrSubscribe(operation: RequestParameters, variables: Variables): Observable<any> {
  return Observable.create((sink) => {
    if (!operation.text) {
      return sink.error(new Error('Operation text cannot be empty'));
    }
    return subscriptionsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      {
        ...sink,
        error: (err) => {
          if (err instanceof Error) {
            return sink.error(err);
          }

          if (err instanceof CloseEvent) {
            return sink.error(
              // reason will be available on clean closes
              new Error(
                `Socket closed with event ${err.code} ${err.reason || ''}`,
              ),
            );
          }

          return sink.error(
            new Error(
              (err as GraphQLError[]).map(({ message }) => message).join(', '),
            ),
          );
        },
      },
    );
  });
}

export const network = Network.create(fetchOrSubscribe, fetchOrSubscribe);

export const relay = new Environment({
  network,
  store: new Store(new RecordSource()),
})