
export class Customer {
  
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public birthdate: Date | string,
    public facebookUrl: string | null,
    public instagramUrl: string | null,
    public linkedinUrl: string | null,
    public userImageId: string | null,
    public credentialId: number) {
  }
  
  
  
}











