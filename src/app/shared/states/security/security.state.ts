import { Me, SignIn } from '@models/security.interface';
export interface SecurityState {
  ids: number[];
  entities: Me;
  auth: SignIn;
}
