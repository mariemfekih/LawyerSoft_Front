import { Role } from "../role";

export class roleTranslator {
    static translateFrRole(role: Role): string {
      switch (role) {
        case Role.ADMIN:
          return 'Administrateur';
        case Role.LAWYER:
          return 'Avocat';
        case Role.MANAGER:
          return 'Agent';
        
      }
    }
  }
  