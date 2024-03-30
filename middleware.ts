import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export { auth as default } from "./auth";

const ADMIN_ONLY_ROUTES = ["/edit", "/new-post"];

function isAccessAdminRoutes(pathname: string) {
  return ADMIN_ONLY_ROUTES.some((segment) => {
    return pathname.includes("/issue-list" + segment);
  });
}

export async function middleware(req: NextRequest, res: NextResponse) {
  const session = await auth();
  const userRole = session?.user?.role;

  if (userRole === undefined || userRole === "user") {
    if (isAccessAdminRoutes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/issue-list", req.url));
    }
  }

  return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
