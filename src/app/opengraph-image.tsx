import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "ACP Designs Studio — Real work. Better systems. Useful systems for real property operations.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Field-manual palette, mirrored from FieldManual.module.css so the share card
// and the page it links to read as the same object.
const PAPER = "#f3efe6";
const INK = "#171817";
const MUTED = "#5d5a52";
const ORANGE = "#f04a17";
const LINE = "rgba(23, 24, 23, 0.12)";

export default async function Image() {
  const fontDir = join(process.cwd(), "src/app/og-fonts");
  const [display, body] = await Promise.all([
    readFile(join(fontDir, "BodoniModa-SemiBold.ttf")),
    readFile(join(fontDir, "Manrope-SemiBold.ttf")),
  ]);

  // Blueprint grid, drawn as discrete rules — Satori has no repeating-gradient.
  const columns = Array.from({ length: 11 }, (_, i) => (i + 1) * 100);
  const rows = Array.from({ length: 6 }, (_, i) => (i + 1) * 90);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: PAPER,
          color: INK,
          fontFamily: "Manrope",
        }}
      >
        {columns.map((x) => (
          <div
            key={`c${x}`}
            style={{
              position: "absolute",
              top: 0,
              left: x,
              width: 1,
              height: "100%",
              background: LINE,
            }}
          />
        ))}
        {rows.map((y) => (
          <div
            key={`r${y}`}
            style={{
              position: "absolute",
              left: 0,
              top: y,
              width: "100%",
              height: 1,
              background: LINE,
            }}
          />
        ))}

        {/* Left margin rail, echoing the page's vertical spine */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 56,
            width: 1,
            height: "100%",
            background: "rgba(23, 24, 23, 0.22)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "52px 64px 48px 96px",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 46,
                  height: 46,
                  background: INK,
                  color: PAPER,
                  fontSize: 17,
                  letterSpacing: "0.02em",
                }}
              >
                ACP
              </div>
              <div style={{ display: "flex", flexDirection: "column", marginLeft: 18 }}>
                <div
                  style={{
                    display: "flex",
                    fontSize: 17,
                    letterSpacing: "0.12em",
                    color: INK,
                  }}
                >
                  ACP DESIGNS STUDIO
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 12,
                    letterSpacing: "0.16em",
                    color: MUTED,
                    marginTop: 5,
                  }}
                >
                  CARSON PALMER
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 12,
                letterSpacing: "0.18em",
                color: MUTED,
                textAlign: "right",
              }}
            >
              TUSCALOOSA, AL
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: 8 }}>
            {/* Two explicit lines, matching the page hero. The accent period is a
                sibling on its own row so it cannot get flung to the far edge when
                a single wrapped row reflows. */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Bodoni",
                fontSize: 96,
                lineHeight: 1.04,
                letterSpacing: "-0.015em",
                color: INK,
              }}
            >
              <div style={{ display: "flex" }}>Real work.</div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span style={{ display: "flex" }}>Better systems</span>
                <span style={{ display: "flex", color: ORANGE }}>.</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontSize: 25,
                lineHeight: 1.4,
                color: MUTED,
                maxWidth: 760,
              }}
            >
              Useful systems for real property operations — built for people, not dashboards.
            </div>
          </div>

          {/* Proof strip */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
              borderTop: `1px solid rgba(23, 24, 23, 0.22)`,
              paddingTop: 22,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 12,
                  letterSpacing: "0.16em",
                  color: ORANGE,
                }}
              >
                PROOF, NOT PROMISES.
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 15,
                  letterSpacing: "0.09em",
                  color: MUTED,
                  marginTop: 10,
                }}
              >
                109 RENTAL UNITS · 5 COMMUNITIES · HUMAN APPROVAL BUILT IN
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: `1px solid ${ORANGE}`,
                color: ORANGE,
                padding: "12px 18px",
                fontSize: 13,
                letterSpacing: "0.14em",
                lineHeight: 1.35,
              }}
            >
              <div style={{ display: "flex" }}>APPROVED</div>
              <div style={{ display: "flex" }}>BY HUMAN</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bodoni", data: display, style: "normal", weight: 600 },
        { name: "Manrope", data: body, style: "normal", weight: 600 },
      ],
    },
  );
}
