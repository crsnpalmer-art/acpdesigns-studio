import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 30% 25%, #2a2a2a 0%, #000000 70%)",
          color: "white",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          letterSpacing: "-0.04em",
          fontSize: 70,
          fontWeight: 600,
        }}
      >
        ACP
      </div>
    ),
    { ...size },
  );
}
