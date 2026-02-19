import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const repo = searchParams.get("repo");

    if (!repo) {
        return NextResponse.json({ error: "Repo parameter is required" }, { status: 400 });
    }

    try {
        // Note: This uses public API access. Rate limits apply (60/hr).
        // If needed, add Authorization header with a PAT.
        const response = await fetch(`https://api.github.com/repos/${repo}/commits/main`, {
            headers: {
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "Master-Antigravity-Dashboard"
            },
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!response.ok) {
            // Try 'master' branch if main fails, some older repos might use it
            const responseMaster = await fetch(`https://api.github.com/repos/${repo}/commits/master`, {
                headers: {
                    "Accept": "application/vnd.github.v3+json",
                    "User-Agent": "Master-Antigravity-Dashboard"
                },
                next: { revalidate: 300 }
            });

            if (!responseMaster.ok) {
                return NextResponse.json({ error: "Failed to fetch from GitHub" }, { status: responseMaster.status });
            }

            const data = await responseMaster.json();
            return NextResponse.json({
                date: data.commit?.author?.date,
                message: data.commit?.message,
                sha: data.sha
            });
        }

        const data = await response.json();
        return NextResponse.json({
            date: data.commit?.author?.date,
            message: data.commit?.message,
            sha: data.sha
        });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
