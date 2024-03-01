import { useAuthStore } from "@/store/auth.store";

export function useCheckExistNavbar() {
  const { auth } = useAuthStore();
  const isExistNavbar = auth.isAuthenticated;
  return isExistNavbar;
}
