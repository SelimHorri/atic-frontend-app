
export class RegisterRequest {
  
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public birthdate: Date,
    public username: string,
    public password: string,
    public confirmPassword: string,
    public role: string) {
    
  }
  
  
  
}










