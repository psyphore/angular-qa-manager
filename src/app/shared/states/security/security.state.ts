import { Me, SignIn } from '@models/security.interface';
export interface SecurityState {
  entities: Me;
  auth: SignIn;
}
