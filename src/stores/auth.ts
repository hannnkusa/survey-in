import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type User } from "firebase/auth";

interface CurrentUIProps extends User {
  userDetail: {
    created_at: string;
    phone_number: string;
    role: string;
    updated_at: string | null;
  } | null;
}

export type GrantedPermissionsUI =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "download"
  | string;

interface AuthStore {
  currentUser: CurrentUIProps | null;
  grantedPermissions: Record<string, GrantedPermissionsUI[]> | null;
  setCurrentUser: (data: CurrentUIProps | null) => void;
  setGrantedPermissions: (
    data: Record<string, GrantedPermissionsUI[]> | null
  ) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      currentUser: null,
      grantedPermissions: null,
      setCurrentUser: (currentUser) => set({ currentUser }),
      setGrantedPermissions: (grantedPermissions) =>
        set({ grantedPermissions }),
    }),
    { name: "auth-storage", storage: createJSONStorage(() => localStorage) }
  )
);
