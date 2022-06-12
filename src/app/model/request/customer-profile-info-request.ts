
export class CustomerProfileInfoRequest {
  
  constructor(
    public authenticatedUsername: string = `${sessionStorage.getItem(`username`)}`,
    public firstname: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public birthdate: Date | string | null | undefined,
    public facebookUrl: string | null | undefined,
    public instagramUrl: string | null | undefined,
    public linkedinUrl: string | null | undefined,
    public username: string,
    public password: string,
    public confirmPassword: string) {
  }
  
  
  
}












