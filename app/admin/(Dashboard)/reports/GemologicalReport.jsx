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

const GemologicalReport = ({ reportData, onRenderComplete, reportId }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [barcodeUrl, setBarcodeUrl] = useState("");
  const server = process.env.SERVER || "www.fgl.lk";
  const email = process.env.EMAIL || "info@fgl.lk";

  // Define colors as constants to ensure they're applied
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
    description,
    species,
    variety,
    weight,
    measurement,
    colour,
    shape,
    transparency,
    comments,
    origin,
    remarks,
    phenomenon,
    created_at,
    text_color,
    track_no,
    image_file_path,
  } = reportData;

  useEffect(() => {
    const generateCodes = async () => {
      try {
        const verifyUrl = `${server}/verify?id=${reportId}`;

        // Generate QR code
        const qrUrl = await QRCode.toDataURL(verifyUrl, {
          width: 120,
          margin: 1,
          color: {
            dark: colors.black,
            light: colors.white,
          },
        });
        setQrCodeUrl(qrUrl);

        // Generate Barcode using canvas
        const canvas = document.createElement("canvas");
        JsBarcode(canvas, track_no, {
          format: "CODE128",
          width: 2,
          height: 60,
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
        width: "297mm",
        height: "210mm",
        overflow: "hidden",
        backgroundColor: colors.white,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: "relative",
        padding: "17px",
        margin: "7px",
        boxSizing: "border-box",
        color: colors.gray[800],
      }}
    >
      {/* Header */}
      <div className="flex items-center mb-6">
        <svg
          width="850"
          height="80"
          viewBox="0 0 650 80"
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
              <stop offset="50%" stopColor="var(--secondary-color, #d97706)" />
              <stop offset="100%" stopColor="var(--accent-color, #e3c16f)" />
            </linearGradient>
          </defs>
          <text
            x="175"
            y="45"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="url(#accentToSecondary)"
            fontSize="45"
            fontFamily="Old English Text MT"
            letterSpacing="0.1em"
            fontWeight="400"
          >
            Gemstone Report
          </text>
        </svg>
      </div>

      {/* Main Content */}
      <div style={{ display: "flex", gap: "32px" }}>
        {/* Left Column */}
        <div
          style={{
            display: "flex",
            flex: "1",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Left Column - Details */}
          <div
            style={{
              flex: 1,
              display: "flex",
              gap: "20px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "150px 1fr",
                gap: "5px 24px",
                alignSelf: "self-start",
                marginLeft: "50px",
                fontSize: "14px",
              }}
            >
              <div style={{ color: colors.gray[900], fontWeight: "600" }}>
                REPORT ID
              </div>
              <div style={{ color: colors.gray[800], fontWeight: "500" }}>
                {reportId}
              </div>

              <div style={{ color: colors.gray[900], fontWeight: "600" }}>
                DATE
              </div>
              <div style={{ color: colors.gray[800], fontWeight: "400" }}>
                {`${new Date(created_at).getDate()} ${
                  months[new Date(created_at).getMonth()]
                } ${new Date(created_at).getFullYear()}`}
              </div>

              <div style={{ color: colors.gray[900], fontWeight: "600" }}>
                OBJECT DESCRIPTION
              </div>
              <div style={{ color: colors.gray[800], fontWeight: "400" }}>
                {description}
              </div>
              <div style={{ color: colors.gray[900], fontWeight: "600" }}>
                TRANSPARENCY
              </div>
              <div style={{ color: colors.gray[800], fontWeight: "400" }}>
                {transparency}
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "150px 1fr",
                gap: "8px 24px",
                alignSelf: "self-start",
                marginLeft: "50px",
                fontSize: "14px",
              }}
            >
              <div style={{ color: colors.gray[900], fontWeight: "600" }}>
                SPECIES
              </div>
              <div
                style={{
                  color: colors.gray[800],
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                {species}
              </div>

              <div style={{ color: colors.gray[900], fontWeight: "600" }}>
                VARIETY
              </div>
              <div
                style={{
                  color: colors.gray[800],
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                {variety}
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "150px 1fr",
                gap: "8px 24px",
                alignSelf: "self-start",
                marginLeft: "50px",
                fontSize: "14px",
              }}
            >
              <div style={{ color: colors.gray[900], fontWeight: "600" }}>
                WEIGHT
              </div>
              <div style={{ color: colors.gray[800], fontWeight: "400" }}>
                {weight}
              </div>

              <div style={{ color: colors.gray[900], fontWeight: "600" }}>
                MEASUREMENT
              </div>
              <div style={{ color: colors.gray[800], fontWeight: "400" }}>
                {measurement}
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "150px 1fr",
                gap: "8px 24px",
                alignSelf: "self-start",
                marginLeft: "50px",
                fontSize: "14px",
              }}
            >
              <div style={{ color: colors.gray[900], fontWeight: "600" }}>
                COLOUR
              </div>
              <div style={{ color: colors.gray[800], fontWeight: "400" }}>
                {colour}
              </div>

              <div style={{ color: colors.gray[900], fontWeight: "600" }}>
                SHAPE & CUT
              </div>
              <div style={{ color: colors.gray[800], fontWeight: "400" }}>
                {shape}
              </div>
              {phenomenon && (
                <div style={{ color: colors.gray[900], fontWeight: "600" }}>
                  PHENOMENON
                </div>
              )}
              {phenomenon && (
                <div style={{ color: colors.gray[800], fontWeight: "400" }}>
                  {phenomenon}
                </div>
              )}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "150px 1fr",
                gap: "8px 24px",
                alignSelf: "self-start",
                marginLeft: "50px",
                fontSize: "14px",
              }}
            >
              <div style={{ color: colors.gray[900], fontWeight: "600" }}>
                COMMENTS
              </div>
              <ul style={{ color: colors.gray[800], fontWeight: "500" }}>
                {comments?.split("*").map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "150px 1fr",
                gap: "8px 24px",
                alignSelf: "self-start",
                marginLeft: "50px",
                fontSize: "14px",
              }}
            >
              {remarks && (
                <div style={{ color: colors.gray[900], fontWeight: "600" }}>
                  REMARKS
                </div>
              )}
              {remarks && (
                <div style={{ color: colors.gray[800], fontWeight: "400" }}>
                  {remarks}
                </div>
              )}
            </div>
            <div
              style={{
                marginLeft: "50px",
              }}
              className="flex flex-col gap-y-1 items-start"
            >
              {origin && (
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  ORIGIN
                </div>
              )}
              {origin && (
                <div
                  style={{
                    color: colors.gray[800],
                    fontWeight: "400",
                    fontSize: 14,
                  }}
                >
                  Gemmological testing revealed characteristics corresponding to
                  those of a&nbsp;{variety} from :
                </div>
              )}
              {origin && (
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    fontSize: "16px",
                    alignSelf: "center",
                    fontFamily: "serif",
                  }}
                >
                  {origin}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Right Column - Gem Image */}
          <div
            style={{
              backgroundColor: colors.gray[100],
              width: "132px",
              height: "132px",
              position: "relative",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "5px",
              border: `2px solid ${colors.gray[200]}`,
              alignSelf: "center",
            }}
          >
            {image_file_path ? (
              <Image
                src={image_file_path}
                alt="Gem"
                width="132"
                height="132"
                style={{
                  borderRadius: "8px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: colors.primary,
                  borderRadius: "50%",
                }}
              ></div>
            )}
          </div>
          {/* Right Column - Gem Image Instruction*/}
          <p
            style={{
              fontSize: "8px",
              color: colors.gray[500],
              textAlign: "center",
              lineHeight: "1.3",
              margin: 0,
            }}
            className="font-serif"
          >
            This image is only for representation purposes.
            <br />
            Colour or Size may vary from Original.
          </p>
          {/* Right Column - Species,  */}
          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
              marginBottom: "5px",
            }}
          >
            <h3
              style={{
                color: text_color,
                fontWeight: "bold",
                fontSize: "18px",
                letterSpacing: "0.1em",
                margin: 0,
              }}
            >
              {species.toUpperCase()}
            </h3>
          </div>
          {/* Right Column - Variety,  */}
          <div
            style={{
              textAlign: "center",
              marginTop: "5px",
              marginBottom: "15px",
            }}
          >
            <h3
              style={{
                color: text_color,
                fontWeight: "bold",
                fontSize: "18px",
                letterSpacing: "0.1em",
                margin: 0,
              }}
            >
              {variety.toUpperCase()}
            </h3>
          </div>

          {/* Right Column - Logo and Gemologist, QR */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "end",
              marginBottom: "50px",
              marginTop: "40px",
              padding: "0 30px",
            }}
          >
            {/*GEMA Logo */}
            <div>
              <Image
                src="/images/GemACropped.svg"
                alt="logo"
                height={100}
                width={100}
              />
            </div>
            {/* Gemologist Info */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "128px",
                  borderTop: `1px solid ${colors.gray[400]}`,
                  marginBottom: "8px",
                }}
              ></div>
              <div style={{ fontSize: "14px" }}>
                <div style={{ fontWeight: "400", color: colors.gray[800] }}>
                  Gemmologist
                </div>
                <div style={{ fontWeight: "600", color: colors.gray[900] }}>
                  M. Shahmi Rinsan
                </div>
                <div style={{ fontSize: "12px", color: colors.gray[600] }}>
                  FGA (GEM-A), Dip.PGSL
                </div>
              </div>
            </div>
            {/* Left Column - QR and Bar codes and more info*/}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="flex gap-10 items-end">
                {qrCodeUrl && (
                  <div>
                    <Image
                      src={qrCodeUrl}
                      alt="Verification QR Code"
                      width="60"
                      height="60"
                    />
                  </div>
                )}

                {barcodeUrl && (
                  <div
                    style={{ position: "absolute", right: "40px", top: "25px" }}
                  >
                    <Image
                      src={barcodeUrl}
                      alt="Verification QR Code"
                      width="60"
                      height="60"
                    />
                  </div>
                )}
              </div>

              <div style={{ textAlign: "center" }} className="font-serif">
                <div
                  style={{
                    fontSize: "12px",
                    color: colors.gray[600],
                  }}
                >
                  Verify this report at
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: colors.gray[600],
                  }}
                >
                  {server}
                </div>
                <div style={{ fontSize: "12px", color: colors.gray[600] }}>
                  or Scan QR code
                </div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: colors.gray[600],
              marginTop: "35px",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                color: colors.gray[800],
                marginBottom: "4px",
              }}
            >
              <div className="flex justify-center items-center">
                <Image
                  src="/images/fgl-color.svg"
                  alt="logo"
                  width={1563} // double your display size
                  height={400}
                  className="h-[60px] w-auto" // scale down with CSS
                  priority // optional: loads immediately
                />
              </div>
            </div>
            <div className="font-serif" style={{ color: colors.gray[600] }}>
              94/3, Sally Hajiar Mawatha, Chinafort, Beruwala, 12070, Sri Lanka
            </div>
            <div className="font-serif" style={{ color: colors.gray[600] }}>
              +94 76 354 9226 &nbsp;&nbsp; {email}
            </div>
            <div></div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div
        style={{
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: colors.gray[500],
            margin: 0,
          }}
          className="font-serif"
        >
          The conclusion of this report represents our findings through
          gemmological testing at the time of examination. Terms & conditions on
          the reverse side
        </p>
      </div>

      {/* custom borders */}
      <div
        className="h-1 absolute top-2.5 left-2.5"
        style={{
          backgroundImage: "linear-gradient(to right, #9b111e, #e3c16f, #fff)",
          width: "297mm",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="w-1 absolute top-2.5 left-2.5"
        style={{
          backgroundImage: "linear-gradient(to bottom, #9b111e, #e3c16f, #fff)",
          height: "210mm",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div
        className="h-1 absolute bottom-7 right-6"
        style={{
          backgroundImage: "linear-gradient(to left, #9b111e, #e3c16f, #fff)",
          width: "297mm",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className="w-1 absolute bottom-7 right-6"
        style={{
          backgroundImage: "linear-gradient(to top, #9b111e, #e3c16f, #fff)",
          height: "210mm",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};

export default GemologicalReport;
