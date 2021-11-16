import { rest } from "msw";
import { gql } from "@apollo/client";

import { buildClientSchema, execute } from "graphql";
import { addMocksToSchema } from "@graphql-tools/mock";

import introspection from "~/generated/introspection.json";
import type { Config } from "~/config";

// Build a schema using the introspection
const schema = buildClientSchema(introspection as any);

// Stub out our schema with fake data
const mockedSchema = addMocksToSchema({ schema });

export const initAutoHandlers = (devConfig: Config) => {
  return {
    handlers: [
      rest.post<{ query: string; variables: any }>(
        devConfig.api.url,
        async (req, res, ctx) => {
          const result = await execute({
            schema: mockedSchema,
            document: gql`
              ${req.body.query}
            `,
            variableValues: req.body.variables,
          });

          return res(ctx.json(result));
        }
      ),
    ],
  };
};
