import { Role } from '../models/type/role';

export class User {
  id: number;
  cin: string;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  email: string;
  role: Role;
  birthDate: Date;
  //country: string;
  city: string;
  gender: boolean;

  active?: boolean;
  notLocked?: boolean;

  profileImage?: string;
  lastLoginDate?: Date;
  lastLoginDateDisplay?: Date;
  joinDate?: Date;
  authorities?: string[];
 /* fees: Fee[];
  privileges: Privilege[];
  appointments: Appointment[];
  cases: Case[];*/
}
