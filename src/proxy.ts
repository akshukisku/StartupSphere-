import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const approvalStatus = request.cookies.get("approval_status")?.value;

  const { pathname } = request.nextUrl;

  // =========================
  // Public Routes
  // =========================
  const publicRoutes = [
    "/",
    "/about",
    "/contact",
    "/login",
    "/signup",
  ];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // =========================
  // Authentication
  // =========================
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // =========================
  // Pending Users
  // =========================
  if (
    approvalStatus === "pending" &&
    pathname !== "/pending"
  ) {
    return NextResponse.redirect(
      new URL("/pending", request.url)
    );
  }

  // =========================
  // Rejected Users
  // =========================
  if (
    approvalStatus === "rejected" &&
    pathname !== "/rejected"
  ) {
    return NextResponse.redirect(
      new URL("/rejected", request.url)
    );
  }

  // =========================
  // Approved Users cannot access
  // Pending / Rejected pages
  // =========================
  if (
    approvalStatus === "approved" &&
    (pathname === "/pending" ||
      pathname === "/rejected")
  ) {
    switch (role) {
      case "founder":
        return NextResponse.redirect(
          new URL("/founder", request.url)
        );

      case "investor":
        return NextResponse.redirect(
          new URL("/investor", request.url)
        );

      case "mentor":
        return NextResponse.redirect(
          new URL("/mentor", request.url)
        );

      case "admin":
        return NextResponse.redirect(
          new URL("/admin", request.url)
        );

      default:
        return NextResponse.redirect(
          new URL("/", request.url)
        );
    }
  }

  // =========================
  // Role Protection
  // =========================
  if (
    pathname.startsWith("/founder") &&
    role !== "founder"
  ) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  if (
    pathname.startsWith("/investor") &&
    role !== "investor"
  ) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  if (
    pathname.startsWith("/mentor") &&
    role !== "mentor"
  ) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  if (
    pathname.startsWith("/admin") &&
    role !== "admin"
  ) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/founder/:path*",
    "/investor/:path*",
    "/mentor/:path*",
    "/admin/:path*",
    "/pending",
    "/rejected",
  ],
};