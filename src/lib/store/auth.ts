import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      signIn: async (email: string, password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const users = JSON.parse(localStorage.getItem('medbridge_users') || '[]');
        const user = users.find((u: User & { password: string }) => u.email === email && u.password === password);
        if (user) {
          const { password: _, ...userData } = user;
          set({ user: userData, isAuthenticated: true });
          return true;
        }
        return false;
      },
      signUp: async (name: string, email: string, password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const users = JSON.parse(localStorage.getItem('medbridge_users') || '[]');
        if (users.find((u: User & { password: string }) => u.email === email)) {
          return false;
        }
        const newUser = { id: Date.now().toString(), name, email, password };
        users.push(newUser);
        localStorage.setItem('medbridge_users', JSON.stringify(users));
        const { password: _, ...userData } = newUser;
        set({ user: userData, isAuthenticated: true });
        return true;
      },
      signOut: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateProfile: (data: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: 'medbridge_auth',
    }
  )
);
