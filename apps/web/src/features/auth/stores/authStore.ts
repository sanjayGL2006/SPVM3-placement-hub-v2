import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole, Department, Course } from '../../../shared/types/global.types';
import { PREDEFINED_USERS, PredefinedUser } from '../../../shared/constants/credentials';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  demoLogin: (userRoleOrEmail: string) => boolean;
  logout: () => void;
  updateCurrentUser: (partial: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: PREDEFINED_USERS[0] as unknown as User, // Default to Principal for instant rich view
      token: 'jwt_demo_token_principal_2026',
      isAuthenticated: true,

      login: (email: string, password: string) => {
        const found = PREDEFINED_USERS.find(
          u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
        );

        if (!found) {
          return { success: false, error: 'Invalid email or password. Please verify credentials or use demo quick-login.' };
        }

        const userObj: User = {
          id: found.id,
          email: found.email,
          name: found.name,
          role: found.role,
          department: found.department,
          course: found.course,
          section: found.section,
          academicYear: found.academicYear,
          avatar: found.avatar,
          permissions: found.permissions,
        };

        set({
          user: userObj,
          token: `jwt_token_${found.id}_${Date.now()}`,
          isAuthenticated: true,
        });

        return { success: true };
      },

      demoLogin: (userRoleOrEmail: string) => {
        const found = PREDEFINED_USERS.find(
          u => u.role === userRoleOrEmail || u.email.toLowerCase() === userRoleOrEmail.toLowerCase() || u.id === userRoleOrEmail
        );

        if (found) {
          const userObj: User = {
            id: found.id,
            email: found.email,
            name: found.name,
            role: found.role,
            department: found.department,
            course: found.course,
            section: found.section,
            academicYear: found.academicYear,
            avatar: found.avatar,
            permissions: found.permissions,
          };

          set({
            user: userObj,
            token: `jwt_token_${found.id}_${Date.now()}`,
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateCurrentUser: (partial: Partial<User>) => {
        const current = get().user;
        if (current) {
          set({ user: { ...current, ...partial } });
        }
      },
    }),
    {
      name: 'placement_pro_auth',
    }
  )
);
