import { ImageResponse } from "next/og";

type Tile = {
  name: string;
  city: string;
  units: number;
  accent: string; // hex, used for left bar + glow
  eyebrow: string;
};

const TILES: Record<string, Tile> = {
  "pinnacle-park": {
    name: "Pinnacle Park",
    city: "Tuscaloosa, AL",
    units: 50,
    accent: "#f5a524",
    eyebrow: "Palmer Portfolio",
  },
  "first-and-main": {
    name: "First and Main",
    city: "Northport, AL",
    units: 30,
    accent: "#38bdf8",
    eyebrow: "Palmer Portfolio",
  },
  "the-station": {
    name: "The Station",
    city: "Northport, AL",
    units: 16,
    accent: "#c084fc",
    eyebrow: "Palmer Portfolio",
  },
  "forest-lake": {
    name: "Forest Lake",
    city: "Tuscaloosa, AL",
    units: 12,
    accent: "#34d399",
    eyebrow: "Palmer Portfolio",
  },
};

export const runtime = "nodejs";
export const revalidate = false;

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/tile/[slug]">,
) {
  const { slug } = await ctx.params;
  const tile = TILES[slug];

  if (!tile) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #111111 55%, #1a1a1a 100%)",
          color: "white",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            display: "flex",
            width: "14px",
            height: "100%",
            background: tile.accent,
          }}
        />

        {/* Content column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "40px 48px",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 500,
            }}
          >
            {tile.eyebrow}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 76,
                fontWeight: 600,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "white",
                display: "flex",
              }}
            >
              {tile.name}
            </div>
            <div
              style={{
                marginTop: 18,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                fontSize: 24,
                color: "rgba(255,255,255,0.75)",
                fontWeight: 400,
              }}
            >
              <span style={{ display: "flex" }}>{tile.city}</span>
              <span
                style={{
                  display: "flex",
                  width: 4,
                  height: 4,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.4)",
                }}
              />
              <span style={{ display: "flex" }}>
                {tile.units} unit{tile.units === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 500,
      headers: {
        // Deliberately not `immutable` — the URL is stable but the rendered
        // output can change (property data edits, visual tweaks), and the CDN
        // needs to pick those up on redeploy. SWR lets the edge serve instantly
        // while refreshing in the background; browsers revalidate every hour.
        "Cache-Control":
          "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
