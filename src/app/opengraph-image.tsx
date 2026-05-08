import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "ACP Designs Studio — Property portfolio, apps, automation systems, and ideas.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // A dedicated 1200-wide version is kept under the 500 KB ImageResponse bundle.
  const bgData = await readFile(join(process.cwd(), "public/og-background.jpg"));
  const bgBase64 = `data:image/jpeg;base64,${bgData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#000",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Background photo */}
        <img
          src={bgBase64}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Gradient overlay — keep the photo visible at top, darken toward
            bottom for legible text */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.92) 100%)",
          }}
        />

        {/* Foreground content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 72px",
            width: "100%",
            color: "white",
          }}
        >
          {/* Top row */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 42,
                fontWeight: 600,
                letterSpacing: 0,
                color: "white",
              }}
            >
              ACP
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 14,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
                fontWeight: 500,
              }}
            >
              Designs Studio
            </div>
          </div>

          {/* Bottom block */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 108,
                fontWeight: 500,
                letterSpacing: 0,
                lineHeight: 0.96,
                color: "white",
                maxWidth: 980,
                textShadow: "0 2px 24px rgba(0,0,0,0.6)",
              }}
            >
              Built for real work.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                fontSize: 26,
                letterSpacing: 0,
                color: "rgba(255,255,255,0.88)",
                fontWeight: 400,
                maxWidth: 900,
                textShadow: "0 1px 12px rgba(0,0,0,0.55)",
              }}
            >
              Property portfolio, apps, automation systems, and ideas.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
