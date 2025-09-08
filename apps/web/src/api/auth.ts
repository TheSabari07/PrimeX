interface UserCredentials {
  email: string;
  password: string;
}

interface RegistrationData extends UserCredentials {
  name: string;
}

interface AuthResponse {
  token: string;
}

class AuthAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || '/api/auth';

  }

  async register(data: RegistrationData): Promise<any> {
    const response = await fetch(`${this.baseURL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed.');
    }

    return response.json();
  }

  async login(credentials: UserCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed.');
    }

    const data: AuthResponse = await response.json();

    if (data.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', data.token);
      }
    }

    return data;
  }

  getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jwt');
    }
    return null;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
    }
  }
}

const authAPI = new AuthAPI();
export default authAPI;

export const { register, login } = authAPI;
