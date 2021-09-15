/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type HomeMutationVariables = {
    connections: Array<string>;
};
export type HomeMutationResponse = {
    readonly postAdd: {
        readonly id: string;
        readonly title: string;
        readonly content: string;
    } | null;
};
export type HomeMutation = {
    readonly response: HomeMutationResponse;
    readonly variables: HomeMutationVariables;
};



/*
mutation HomeMutation {
  postAdd {
    id
    title
    content
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "connections"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "Post",
  "kind": "LinkedField",
  "name": "postAdd",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeMutation",
    "selections": [
      (v1/*: any*/)
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HomeMutation",
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "filters": null,
        "handle": "appendNode",
        "key": "",
        "kind": "LinkedHandle",
        "name": "postAdd",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          },
          {
            "kind": "Literal",
            "name": "edgeTypeName",
            "value": "PostEdge"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "fc90f90db9c5a5be003bcbb76517b1a9",
    "id": null,
    "metadata": {},
    "name": "HomeMutation",
    "operationKind": "mutation",
    "text": "mutation HomeMutation {\n  postAdd {\n    id\n    title\n    content\n  }\n}\n"
  }
};
})();
(node as any).hash = '686f7beda5a158e82d03198039b7bfd3';
export default node;
