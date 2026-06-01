import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
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
            "linear-gradient(145deg, rgb(22 20 16) 0%, rgb(33 30 24) 100%)",
          borderRadius: 14,
          border: "2px solid rgb(86 72 46)",
          color: "rgb(242 201 116)",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: "-0.06em",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          textAlign: "center",
          lineHeight: 1,
          textShadow: "0 1px 0 rgb(45 36 20)",
        }}
      >
        KB
      </div>
    ),
    {
      ...size,
    },
  );
}
