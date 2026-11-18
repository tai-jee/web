import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

const URL = "https://ws.audioscrobbler.com/2.0";

export const GET: APIRoute = async ({ cache }) => {
    const params = new URLSearchParams({
        method: "user.getrecenttracks",
        user: "bbqbeanburger",
        limit: "1",
        extended: "1",
        format: "json",
        api_key: env.LASTFM_API_KEY,
    });

    const url = `${URL}?${params.toString()}`;

    cache.set({
        maxAge: 30,
        swr: 60,
        tags: ["lastfm"],
    });

    const response = await fetch(url);
    const data = (await response.json()) as any;

    return Response.json(data.recenttracks?.track[0], {
        headers: { "Cache-Control": "max-age=30" },
    });
};
