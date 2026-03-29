export type ActorRole = 'EMPLOYEE' | 'MANAGER' | 'HR_ADMIN';

export interface ActorContext {
  id: string;
  role: ActorRole;
}
