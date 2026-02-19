import { NextResponse, NextRequest } from "next/server";
import { getSessionUser } from "./libs/auth";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
	console.log("Proxying to API route:", request.url);

	if (request.url.includes("/exercices")) {
		const session = await getSessionUser();
		if (!session) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: "/exercices",
};
