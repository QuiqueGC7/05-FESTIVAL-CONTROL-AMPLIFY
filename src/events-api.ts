import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import outputs from '../amplify_outputs.json';
import type { Schema } from '../amplify/data/resource';
import type { EventStatus, FestivalEvent } from './data';

Amplify.configure(outputs);

const client = generateClient<Schema>();

function throwOnErrors(errors: { message?: string }[] | undefined) {
  if (errors?.length) {
    throw new Error(errors.map((error) => error.message ?? 'Error desconocido').join('; '));
  }
}

function isEventStatus(value: string | null | undefined): value is EventStatus {
  return value === 'CONFIRMED' || value === 'DELAYED' || value === 'CANCELLED';
}

export async function listFestivalEvents(): Promise<FestivalEvent[]> {
  const { data, errors } = await client.models.FestivalEvent.list();
  throwOnErrors(errors);

  return data.map((event) => {
    if (!event.artist || !event.space || !event.time || !isEventStatus(event.status)) {
      throw new Error(`El evento ${event.id} contiene datos incompletos.`);
    }

    return {
      id: event.id,
      artist: event.artist,
      space: event.space,
      time: event.time,
      status: event.status,
    };
  });
}

export async function createFestivalEvent(event: FestivalEvent): Promise<void> {
  const { errors } = await client.models.FestivalEvent.create(event);
  throwOnErrors(errors);
}

export async function updateFestivalEvent(event: FestivalEvent): Promise<void> {
  const { errors } = await client.models.FestivalEvent.update(event);
  throwOnErrors(errors);
}

export async function deleteFestivalEvent(id: string): Promise<void> {
  const { errors } = await client.models.FestivalEvent.delete({ id });
  throwOnErrors(errors);
}
