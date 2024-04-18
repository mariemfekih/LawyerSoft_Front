import { Role } from '../models/type/role';

export class User {
  id: number;
  cin: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  role: Role;
  birthDate: Date;
  //country: string;
  city: string;
  gender: boolean;
  profileImage?: string;
  lastLoginDate?: Date;
  lastLoginDateDisplay?: Date;
  joinDate?: Date;
  authorities?: string[];
  active?: boolean;
  notLocked?: boolean;
 /* fees: Fee[];
  privileges: Privilege[];
  appointments: Appointment[];
  cases: Case[];*/
}
