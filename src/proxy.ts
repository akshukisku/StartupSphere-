import { NextRequest, NextResponse } from "next/server";

// Exact-match public routes (no prefix matching — avoids the "/" swallowing everything bug)
const PUBLIC_ROUTES = new Set([
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
]);

// Auth pages that a logged-in user shouldn't be able to revisit
const AUTH_ONLY_ROUTES = new Set(["/login", "/signup"]);

type Role = "founder" | "investor" | "admin";

// Single source of truth for role -> dashboard and role -> protected prefix
const ROLE_CONFIG: Record<Role, { dashboard: string; prefix: string }> = {
  founder: { dashboard: "/founder/dashboard", prefix: "/founder" },
  investor: { dashboard: "/investor/dashboard", prefix: "/investor" },
  admin: { dashboard: "/admin/dashboard", prefix: "/admin" },
};

function isValidRole(role: string | undefined): role is Role {
  return !!role && role in ROLE_CONFIG;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("role")?.value;

  const isPublicRoute = PUBLIC_ROUTES.has(pathname);

  // --- Public routes ---
  if (isPublicRoute) {
    // Logged-in users shouldn't see login/signup again — bounce to their dashboard
    if (accessToken && AUTH_ONLY_ROUTES.has(pathname)) {
      const dashboard = isValidRole(role)
        ? ROLE_CONFIG[role].dashboard
        : "/";
      return NextResponse.redirect(new URL(dashboard, request.url));
    }
    return NextResponse.next();
  }

  // --- Everything else requires auth ---
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    // Optional: remember where they were headed
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // --- Role-scoped route protection ---
  if (!isValidRole(role)) {
    // Authenticated but role is missing/corrupt — treat as unauthorized
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  for (const [roleName, { prefix }] of Object.entries(ROLE_CONFIG)) {
    if (pathname.startsWith(prefix) && role !== roleName) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};