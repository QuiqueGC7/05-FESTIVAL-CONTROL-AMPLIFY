import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  EventStatus: a.enum(['CONFIRMED', 'DELAYED', 'CANCELLED']),
  FestivalEvent: a
    .model({
      artist: a.string().required(),
      space: a.string().required(),
      time: a.string().required(),
      status: a.ref('EventStatus').required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});
