import { ImageResponse } from "next/og";

export const alt = "ACP Designs Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background:
            "linear-gradient(135deg, #000000 0%, #0a0a0a 40%, #141414 100%)",
          color: "white",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: "white",
            }}
          >
            ACP
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 16,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              fontWeight: 500,
            }}
          >
            Designs Studio
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 104,
              fontWeight: 500,
              letterSpacing: "-0.045em",
              lineHeight: 0.98,
              color: "white",
              display: "flex",
              maxWidth: 980,
            }}
          >
            Products, not promises.
          </div>
          <div
            style={{
              fontSize: 30,
              letterSpacing: "-0.01em",
              color: "rgba(255,255,255,0.72)",
              fontWeight: 400,
              display: "flex",
              maxWidth: 900,
            }}
          >
            Property ops, automation, iOS, web, and macOS — by Carson Palmer.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 14,
            alignItems: "center",
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ display: "flex" }}>OpenClaw</span>
          <span
            style={{
              display: "flex",
              width: 4,
              height: 4,
              borderRadius: 4,
              background: "rgba(255,255,255,0.3)",
            }}
          />
          <span style={{ display: "flex" }}>Palmer Properties</span>
          <span
            style={{
              display: "flex",
              width: 4,
              height: 4,
              borderRadius: 4,
              background: "rgba(255,255,255,0.3)",
            }}
          />
          <span style={{ display: "flex" }}>HabitForge</span>
          <span
            style={{
              display: "flex",
              width: 4,
              height: 4,
              borderRadius: 4,
              background: "rgba(255,255,255,0.3)",
            }}
          />
          <span style={{ display: "flex" }}>Transfer Portal</span>
          <span
            style={{
              display: "flex",
              width: 4,
              height: 4,
              borderRadius: 4,
              background: "rgba(255,255,255,0.3)",
            }}
          />
          <span style={{ display: "flex" }}>TodoToNotes</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
