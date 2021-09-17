import { createClient } from 'graphql-ws'

const wsClient = createClient({
  url: "ws://localhost:4000/graphql",
  lazy: false,
})

export function subscribe(payload) {
  let deferred: any = null;
  const pending: any = [];
  let throwMe: any = null, done = false;

  const dispose = wsClient.subscribe(payload, {
    next: (data) => {
      pending.push(data);
      deferred?.resolve(false);
    },
    error: (err: any) => {
      if (err instanceof Error) {
        throwMe = err;
      } else if (err instanceof CloseEvent) {
        throwMe = new Error(
          `Socket closed with event ${err.code} ${
            err.reason || ""
          }`.trim()
        );
      } else {
        // GraphQLError[]
        throwMe = new Error(err.map(({ message }) => message).join(", "));
      }
      deferred?.reject(throwMe);
    },
    complete: () => {
      done = true;
      deferred?.resolve(true);
    },
  });
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next() {
      if (done) return { done: true, value: undefined };
      if (throwMe) throw throwMe;
      if (pending.length) return { value: pending.shift() };
      return (await new Promise(
        (resolve, reject) => (deferred = { resolve, reject })
      ))
        ? { done: true, value: undefined }
        : { value: pending.shift() };
    },
    async return() {
      dispose();
      return { done: true, value: undefined };
    },
  };
}