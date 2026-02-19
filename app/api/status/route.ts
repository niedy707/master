import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout

        const response = await fetch(url, {
            method: "HEAD",
            signal: controller.signal,
            cache: "no-store",
        });

        clearTimeout(timeoutId);

        if (response.ok || response.status < 500) {
            return NextResponse.json({ status: "online" });
        } else {
            return NextResponse.json({ status: "offline", code: response.status });
        }
    } catch (error) {
        return NextResponse.json({ status: "offline", error: "Connection failed" });
    }
}
