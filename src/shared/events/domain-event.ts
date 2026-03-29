export interface DomainEvent<T> {
  readonly eventType: string;
  readonly occurredAt: Date;
  readonly payload: T;
}

export function createEvent<T>(eventType: string, payload: T): DomainEvent<T> {
  return { eventType, occurredAt: new Date(), payload };
}
