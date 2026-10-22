export type EventStatus = 'CONFIRMED' | 'DELAYED' | 'CANCELLED';
export type FestivalEvent = { id: string; artist: string; space: string; time: string; status: EventStatus };
