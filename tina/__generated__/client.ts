import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '45fd9d4be84639d9bd6a4cc305f17b06e1d4559d', queries,  });
export default client;
  