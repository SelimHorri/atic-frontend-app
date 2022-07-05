
export class WorkerProfileRequest {
  
  constructor(
    public authenticatedUsername: string = `${sessionStorage.getItem(`username`)}`,
    public firstname: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public birthdate: Date | string | null | undefined,
    public hiredate: Date | string | null | undefined,
    public username: string,
    public password: string,
    public confirmPassword: string) {
  }
  
  
  
}












