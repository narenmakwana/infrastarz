export class User {
  userId: number;
  email: string;
  username: string;
  password: string;
  rememberMe: boolean;
  resetCode: string;
  firstName: string;
  lastName: string;
  userType: string;
  loginAttempts: number = 0;
  disabled = false;
  lastLogin: string;
  createdTime: string;
  // List<Location> locations;


  constructor(data?: any) {
    if(!data) {
      data = {};
    }
    this.userId = data.userId || 0;
    this.email = data.email || '';
    this.username = data.username || '';
    this.password = data.password || '';
    this.rememberMe = data.rememberMe || false;
    this.resetCode = data.resetCode || null;
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.userType = data.userType || 'USER';
    this.loginAttempts = data.loginAttempts || 0;
    this.disabled = data.disabled || false;
    this.lastLogin = data.lastLogin || '';
    this.createdTime = data.createdTime || '';
  }
}
