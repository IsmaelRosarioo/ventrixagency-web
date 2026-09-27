export const dynamic = "force-dynamic";

export async function GET() {
  const upstreamUrl = process.env.MAP_UPSTREAM_URL || "http://157.250.201.26:25670";
  try {
    const res = await fetch(`${upstreamUrl}/`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return new Response(`Upstream map server returned status ${res.status}`, {
        status: res.status,
      });
    }

    let html = await res.text();

    // Inject <base href="/map/"> immediately after <head> so that all relative resources
    // (./assets/..., settings.json, maps/world/..., textures.json) resolve to /map/...
    if (!html.includes('<base href="/map/">')) {
      html = html.replace("<head>", '<head>\n        <base href="/map/">');
    }

    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  } catch (error: any) {
    return new Response(`Failed to connect to BlueMap upstream: ${error?.message || error}`, {
      status: 502,
    });
  }
}
