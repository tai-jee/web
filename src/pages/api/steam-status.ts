import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

const URL = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002";

export const GET: APIRoute = async ({ cache }) => {
    const params = new URLSearchParams({
        steamids: "76561198987068977",
        key: env.STEAM_API_KEY,
    });

    const url = `${URL}?${params.toString()}`;

    cache.set({
        maxAge: 60,
        swr: 90,
        tags: ["steam"],
    });

    const response = await fetch(url);
    const data = (await response.json()) as any;

    return Response.json(data, {
        headers: { "Cache-Control": "max-age=60, stale-while-revalidate=90" },
    });
};
