import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, getExpectedAdminCookieValue } from "./auth";

/** Server Component/Route Handler 전용. proxy.ts에서는 대신 request.cookies를 직접 확인함. */
export async function isAdmin(): Promise<boolean> {
  const expected = getExpectedAdminCookieValue();
  if (!expected) return false;
  const store = await cookies();
  return store.get(ADMIN_COOKIE_NAME)?.value === expected;
}
