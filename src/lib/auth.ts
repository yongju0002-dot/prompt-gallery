import { createHash } from "crypto";

export const ADMIN_COOKIE_NAME = "pg_admin";

export function hashAdminPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

/** ADMIN_PASSWORD가 설정되지 않았으면 관리자 기능 전체가 비활성화됨 */
export function getExpectedAdminCookieValue(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return hashAdminPassword(password);
}
