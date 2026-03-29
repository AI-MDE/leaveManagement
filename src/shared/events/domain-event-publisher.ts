import { DomainEvent } from './domain-event';

export interface DomainEventPublisher {
  publish<T>(event: DomainEvent<T>): Promise<void>;
}
