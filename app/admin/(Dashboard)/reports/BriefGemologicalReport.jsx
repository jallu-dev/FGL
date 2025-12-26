import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

let months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const BriefGemologicalReport = ({ reportData, onRenderComplete, reportId }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const server = process.env.SERVER || "www.fgl.lk";

  // Define colors as constants
  const colors = {
    primary: "#9b111e",
    secondary: "#fba518",
    accent: "#1b2a41",
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    white: "#ffffff",
    black: "#000000",
  };

  const {
    weight,
    measurement,
    colour,
    shape,
    comments,
    created_at,
    track_no,
    image_file_path,
    species,
    variety,
  } = reportData;

  useEffect(() => {
    const generateCodes = async () => {
      try {
        const verifyUrl = `${server}/verify?id=${reportId}`;

        // Generate QR code (smaller for ID card)
        const qrUrl = await QRCode.toDataURL(verifyUrl, {
          width: 80,
          margin: 1,
          color: {
            dark: colors.black,
            light: colors.white,
          },
        });
        setQrCodeUrl(qrUrl);
      } catch (error) {
        console.error("Error generating codes:", error);
      }
    };

    if (reportId) {
      generateCodes();
    }
  }, [reportId]);

  useEffect(() => {
    if (qrCodeUrl && onRenderComplete) {
      setTimeout(() => {
        onRenderComplete();
      }, 100);
    }
  }, [qrCodeUrl, onRenderComplete]);

  return (
    <div
      style={{
        width: "85.6mm", // ID card width
        height: "54mm", // ID card height
        overflow: "hidden",
        backgroundColor: colors.white,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: "relative",
        padding: "2mm 4mm",
        boxSizing: "border-box",
        color: colors.gray[800],
      }}
    >
      <div className="flex justify-around items-center mb-0.5">
        {/* Header with FGL Logo */}
        <div className="relative shrink-0">
          <Image
            src="/images/fgl-color.svg"
            alt="logo"
            width={1563} // double your display size
            height={400}
            className="h-10.25 w-auto" // scale down with CSS
            priority // optional: loads immediately
          />
        </div>
        <div className="flex items-center justify-center">
          <svg
            width="850"
            height="20"
            viewBox="0 0 650 20"
            className="max-w-full"
          >
            <defs>
              <linearGradient
                id="accentToSecondary"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="var(--primary-color, #000)" />
                <stop offset="100%" stopColor="var(--accent-color, #000)" />
              </linearGradient>
            </defs>
            <text
              x="325"
              y="10"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="url(#accentToSecondary)"
              fontSize="45"
              fontWeight="600"
              style={{ textTransform: "uppercase" }}
              letterSpacing="1px"
              fontFamily="serif"
            >
              Brief Gemstone Report
            </text>
          </svg>
        </div>
      </div>
      {/* Main Content */}
      <div style={{ display: "flex", gap: "0.5mm" }}>
        {/* Left Side - Report Details */}
        <div
          style={{
            flex: "2",
            display: "flex",
            flexDirection: "column",
            fontSize: "8px",
            lineHeight: "1.1",
          }}
        >
          {/* Report ID */}
          <div style={{ marginBottom: "1.5mm", display: "flex" }}>
            <div
              className="shrink-0"
              style={{
                color: colors.gray[900],
                fontWeight: "700",
                width: "65px",
              }}
            >
              Report Id
            </div>
            <div style={{ color: colors.gray[900], fontWeight: "600" }}>
              {reportId}
            </div>
          </div>

          {/* Date */}
          <div style={{ marginBottom: "1.5mm", display: "flex" }}>
            <div
              className="shrink-0"
              style={{
                color: colors.gray[900],
                fontWeight: "700",
                width: "65px",
              }}
            >
              Date
            </div>
            <div style={{ color: colors.gray[800], fontWeight: "400" }}>
              {`${new Date(created_at).getDate()} ${
                months[new Date(created_at).getMonth()]
              } ${new Date(created_at).getFullYear()}`}
            </div>
          </div>

          {/* SPECIES */}
          <div style={{ marginBottom: "1.5mm", display: "flex" }}>
            <div
              className="shrink-0"
              style={{
                color: colors.gray[900],
                fontWeight: "700",
                width: "65px",
              }}
            >
              Species
            </div>
            <div
              style={{
                color: colors.gray[900],
                fontWeight: "700",
                fontSize: "10px",
              }}
            >
              {species}
            </div>
          </div>

          {/* VARIETY */}
          <div style={{ marginBottom: "1.5mm", display: "flex" }}>
            <div
              className="shrink-0"
              style={{
                color: colors.gray[900],
                fontWeight: "700",
                width: "65px",
              }}
            >
              Variety
            </div>
            <div
              style={{
                color: colors.gray[900],
                fontWeight: "700",
                fontSize: "10px",
              }}
            >
              {variety}
            </div>
          </div>
          {/* Weight */}
          <div style={{ marginBottom: "1.5mm", display: "flex" }}>
            <div
              className="shrink-0"
              style={{
                color: colors.gray[900],
                fontWeight: "700",
                width: "65px",
              }}
            >
              Weight
            </div>
            <div style={{ color: colors.gray[800], fontWeight: "400" }}>
              {weight}
            </div>
          </div>

          {/* Measurement */}
          <div style={{ marginBottom: "1.5mm", display: "flex" }}>
            <div
              className="shrink-0"
              style={{
                color: colors.gray[900],
                fontWeight: "700",
                width: "65px",
              }}
            >
              Measurements
            </div>
            <div style={{ color: colors.gray[800], fontWeight: "400" }}>
              {measurement}
            </div>
          </div>

          {/* Color */}
          <div style={{ marginBottom: "1.5mm", display: "flex" }}>
            <div
              className="shrink-0"
              style={{
                color: colors.gray[900],
                fontWeight: "700",
                width: "65px",
              }}
            >
              Colour
            </div>
            <div style={{ color: colors.gray[800], fontWeight: "400" }}>
              {colour}
            </div>
          </div>

          {/* Shape & Cut */}
          <div style={{ marginBottom: "1.5mm", display: "flex" }}>
            <div
              className="shrink-0"
              style={{
                color: colors.gray[900],
                fontWeight: "700",
                width: "65px",
              }}
            >
              Shape & Cut
            </div>
            <div style={{ color: colors.gray[800], fontWeight: "400" }}>
              {shape}
            </div>
          </div>

          {/* Comments */}
          <div style={{ display: "flex" }}>
            <div
              className="shrink-0"
              style={{
                color: colors.gray[900],
                fontWeight: "700",
                width: "65px",
              }}
            >
              Comments
            </div>
            <ul
              style={{
                color: colors.gray[900],
                fontWeight: "600",
                wordBreak: "break-word",
              }}
            >
              {comments?.split("/n").map((item, i) => (
                <li key={i}>{item || "\u200b"}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side - Image, QR Code, Barcode */}
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1mm",
          }}
        >
          {/* Gem Image */}
          <div
            style={{
              backgroundColor: colors.gray[100],
              width: "20mm",
              height: "20mm",
              borderRadius: "2mm",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              border: "1px solid #000",
            }}
          >
            {image_file_path ? (
              <Image
                src={image_file_path}
                alt="Gem"
                width={200} // 16mm in pixels approximately
                height={200}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "2mm",
                  overflow: "hidden",
                }}
              />
            ) : (
              <div
                style={{
                  width: "18mm",
                  height: "18mm",
                  backgroundColor: colors.primary,
                  borderRadius: "50%",
                }}
              ></div>
            )}
          </div>

          <div className="flex gap-x-0.5 items-end mt-3">
            {/* QR Code */}
            {qrCodeUrl && (
              <div className="shrink-0">
                <Image
                  src={qrCodeUrl}
                  alt="QR Code"
                  width={46}
                  height={46}
                  style={{ display: "block" }}
                />
              </div>
            )}
            <div className="shrink-0">
              <Image
                src="/images/GemACropped.svg"
                alt="logo"
                height={46}
                width={46}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div
        className="text-base text-center mb-2.5 -mt-2"
        style={{
          fontFamily: "Old English Text MT",
          color: "#bd3744",
          letterSpacing: "0.1em",
          fontWeight: "400",
        }}
      >
        Brief Gemmological Report
      </div> */}

      {/* Decorative border lines */}
      {/* <div
        style={{
          position: "absolute",
          top: "2px",
          left: "2px",
          right: "2px",
          height: "2px",
          background: colors.primary,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "2px",
          left: "2px",
          bottom: "2px",
          width: "2px",
          background: colors.primary,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "2px",
          left: "2px",
          right: "2px",
          height: "2px",
          background: colors.primary,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "2px",
          right: "2px",
          bottom: "2px",
          width: "2px",
          background: colors.primary,
        }}
      ></div> */}
    </div>
  );
};

export default BriefGemologicalReport;
