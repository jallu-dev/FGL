import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
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
  const [barcodeUrl, setBarcodeUrl] = useState("");
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
          width: 40,
          margin: 1,
          color: {
            dark: colors.black,
            light: colors.white,
          },
        });
        setQrCodeUrl(qrUrl);

        // Generate Barcode using canvas (smaller for ID card)
        const canvas = document.createElement("canvas");
        JsBarcode(canvas, track_no, {
          format: "CODE128",
          width: 1,
          height: 20,
          displayValue: false,
          background: colors.white,
          lineColor: colors.black,
          margin: 0,
        });

        const barcodeUrl = canvas.toDataURL("image/png");
        setBarcodeUrl(barcodeUrl);
      } catch (error) {
        console.error("Error generating codes:", error);
      }
    };

    if (reportId) {
      generateCodes();
    }
  }, [reportId]);

  useEffect(() => {
    if (qrCodeUrl && barcodeUrl && onRenderComplete) {
      setTimeout(() => {
        onRenderComplete();
      }, 100);
    }
  }, [qrCodeUrl, barcodeUrl, onRenderComplete]);

  return (
    <div
      style={{
        width: "81.6mm", // ID card width
        height: "49.98mm", // ID card height
        overflow: "hidden",
        backgroundColor: colors.white,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: "relative",
        padding: "1mm 4mm",
        margin: "2mm",
        boxSizing: "border-box",
        color: colors.gray[800],
        // border: `2px solid ${colors.primary}`,
        borderRadius: "3mm",
      }}
    >
      <div className="flex justify-around items-center mb-2">
        {/* Header with FGL Logo */}
        <div className="relative w-[140px] h-[41px] shrink-0">
          <Image
            src="/images/fgl-color.png"
            alt="logo"
            fill
            className="object-contain"
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
                <stop offset="0%" stopColor="var(--primary-color, #9b111e)" />
                <stop offset="100%" stopColor="var(--accent-color, #d97706)" />
              </linearGradient>
            </defs>
            <text
              x="325"
              y="10"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="url(#accentToSecondary)"
              fontSize="45"
              fontFamily="Old English Text MT"
              letterSpacing="0.1em"
              fontWeight="400"
            >
              Brief Gemmological Report
            </text>
          </svg>
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

      {/* Main Content */}
      <div
        style={{ display: "flex", gap: "2.5mm", height: "calc(100% - 7mm)" }}
      >
        {/* Left Side - Report Details */}
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            fontSize: "7px",
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
                width: "60px",
              }}
            >
              REPORT ID
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
                width: "60px",
              }}
            >
              DATE
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
                width: "60px",
              }}
            >
              SPECIES
            </div>
            <div
              style={{
                color: colors.gray[900],
                fontWeight: "700",
                textTransform: "uppercase",
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
                width: "60px",
              }}
            >
              VARIETY
            </div>
            <div
              style={{
                color: colors.gray[900],
                fontWeight: "700",
                textTransform: "uppercase",
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
                width: "60px",
              }}
            >
              WEIGHT
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
                width: "60px",
              }}
            >
              MEASUREMENT
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
                width: "60px",
              }}
            >
              COLOR
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
                width: "60px",
              }}
            >
              SHAPE & CUT
            </div>
            <div style={{ color: colors.gray[800], fontWeight: "400" }}>
              {shape}
            </div>
          </div>

          {/* Comments */}
          <div style={{ marginBottom: "1.5mm", display: "flex" }}>
            <div
              className="shrink-0"
              style={{
                color: colors.gray[900],
                fontWeight: "700",
                width: "60px",
              }}
            >
              COMMENTS
            </div>
            <div
              style={{
                color: colors.gray[900],
                fontWeight: "600",
                wordBreak: "break-word",
              }}
            >
              {comments}
            </div>
          </div>
        </div>

        {/* Right Side - Image, QR Code, Barcode */}
        <div
          style={{
            flex: "0 0 18mm",
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
              width: "18mm",
              height: "18mm",
              borderRadius: "2mm",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {image_file_path ? (
              <Image
                src={image_file_path}
                alt="Gem"
                width={66} // 16mm in pixels approximately
                height={66}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "2mm",
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

          <div className="flex gap-x-1 items-end mt-3">
            {/* QR Code */}
            {qrCodeUrl && (
              <div>
                <Image
                  src={qrCodeUrl}
                  alt="QR Code"
                  width={28}
                  height={28}
                  style={{ display: "block" }}
                />
              </div>
            )}
            {/* Barcode */}
            {barcodeUrl && (
              <div>
                <Image
                  src={barcodeUrl}
                  alt="Barcode"
                  width={30}
                  height={10}
                  style={{ display: "block" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

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
