import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, getExpectedAdminCookieValue } from "@/lib/auth";

// Next.js renamed `middleware.ts` to `proxy.ts` — see AGENTS.md / node_modules/next/dist/docs.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const expected = getExpectedAdminCookieValue();

  // ADMIN_PASSWORD가 없는 환경(운영 서버)에서는 관리자 기능이 아예 존재하지 않는 것처럼 404.
  // 콘텐츠는 로컬에서만 추가하고 git으로 배포하므로, 운영에 관리 화면을 노출할 이유가 없음.
  if (!expected) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // 로그인 자체는 인증 없이 접근 가능해야 함
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (cookieValue !== expected) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/upload"],
};
