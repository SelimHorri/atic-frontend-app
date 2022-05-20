
import { UserRoleBasedAuthority } from "./user-role-based-authority";

export class Credential {
  
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public role: UserRoleBasedAuthority | string,
    public isEnabled: boolean,
    public isAccountNonExpired: boolean,
    public isAccountNonLocked: boolean,
    public isCredentialsNonExpired: boolean) {
  }
  
  
  
}







