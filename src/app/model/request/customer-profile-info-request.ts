
export class CustomerProfileInfoRequest {
  
  constructor(
    public authenticatedUsername: string = `${sessionStorage.getItem(`username`)}`,
    public firstname: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public birthdate: Date | string | undefined,
    public facebookUrl: string | undefined,
    public instagramUrl: string | undefined,
    public linkedinUrl: string | undefined,
    public username: string,
    public password: string,
    public confirmPassword: string) {
  }
  
  
  
}












