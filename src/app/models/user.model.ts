export class User {
  constructor(
    public login: string,
    public password: string,
    public name: string,
    public teamNum?: number,
    public userNum?: number,
    public email?: string,
    public token?: string,
    public created_at?: string,
    public status?: string,
    public isTeammate?: boolean
  ) {}
}