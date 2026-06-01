import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(circle at 15% 18%, rgb(72 60 34) 0%, transparent 34%), linear-gradient(135deg, rgb(18 17 14) 0%, rgb(29 27 22) 100%)",
          color: "rgb(244 226 176)",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgb(219 176 91)",
          }}
        >
          {profile.initials}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "rgb(248 236 201)",
              maxWidth: "980px",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              fontSize: 38,
              lineHeight: 1.2,
              color: "rgb(235 199 118)",
              maxWidth: "900px",
            }}
          >
            {profile.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "rgb(214 180 109)",
          }}
        >
          <span>{profile.location}</span>
          <span>Portfolio</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
