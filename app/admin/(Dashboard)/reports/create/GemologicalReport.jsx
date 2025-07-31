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

const GemologicalReport = ({ reportData, onRenderComplete, reportId }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
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

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const verifyUrl = `${server}/verify?id=${reportId}`;
        const qrUrl = await QRCode.toDataURL(verifyUrl, {
          width: 120,
          margin: 1,
          color: {
            dark: colors.black,
            light: colors.white,
          },
        });
        setQrCodeUrl(qrUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    if (reportId) {
      generateQRCode();
    }
  }, [reportId]);

  useEffect(() => {
    if (qrCodeUrl && onRenderComplete) {
      setTimeout(() => {
        onRenderComplete();
      }, 100);
    }
  }, [qrCodeUrl, onRenderComplete]);

  const {
    date,
    description,
    species,
    variety,
    weight,
    measurement,
    colour,
    shape,
    transparency,
    comments,
    file,
    origin,
    remarks,
    phenomenon,
  } = reportData;

  return (
    <div
      style={{
        width: "297mm",
        height: "210mm",
        backgroundColor: colors.white,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: "relative",
        padding: "24px",
        boxSizing: "border-box",
        color: colors.gray[800],
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "50px",
          marginLeft: "50px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
          <div>
            <Image
              src="/images/fgl-color-official.png"
              alt="logo"
              height={130}
              width={400}
            />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div style={{ display: "flex", gap: "32px" }}>
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
          {/* Title */}
          <div>
            <h2
              style={{
                color: colors.gray[800],
                fontSize: "20px",
                fontWeight: "bold",
                margin: 0,
                letterSpacing: "0.2em",
              }}
            >
              GEMMOLOGICAL REPORT
            </h2>
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
            <div style={{ fontWeight: "300", color: colors.gray[800] }}>
              REPORT ID
            </div>
            <div style={{ color: colors.gray[900], fontWeight: "600" }}>
              {reportId}
            </div>

            <div style={{ fontWeight: "300", color: colors.gray[800] }}>
              DATE
            </div>
            <div style={{ color: colors.gray[900], fontWeight: "300" }}>
              {`${date.getDate()} ${
                months[date.getMonth()]
              } ${date.getFullYear()}`}
            </div>

            <div style={{ fontWeight: "300", color: colors.gray[800] }}>
              OBJECT DESCRIPTION
            </div>
            <div style={{ color: colors.gray[900], fontWeight: "300" }}>
              {description}
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
            <div style={{ fontWeight: "300", color: colors.gray[800] }}>
              SPECIES
            </div>
            <div
              style={{
                color: colors.gray[900],
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {species}
            </div>

            <div style={{ fontWeight: "300", color: colors.gray[800] }}>
              VARIETY
            </div>
            <div
              style={{
                color: colors.gray[900],
                fontWeight: "600",
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
            <div style={{ fontWeight: "300", color: colors.gray[800] }}>
              WEIGHT
            </div>
            <div style={{ color: colors.gray[900], fontWeight: "300" }}>
              {weight}
            </div>

            <div style={{ fontWeight: "300", color: colors.gray[800] }}>
              MEASUREMENT
            </div>
            <div style={{ color: colors.gray[900], fontWeight: "300" }}>
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
            <div style={{ fontWeight: "300", color: colors.gray[800] }}>
              COLOUR
            </div>
            <div style={{ color: colors.gray[900], fontWeight: "300" }}>
              {colour}
            </div>

            <div style={{ fontWeight: "300", color: colors.gray[800] }}>
              SHAPE & CUT
            </div>
            <div style={{ color: colors.gray[900], fontWeight: "300" }}>
              {shape}
            </div>

            <div style={{ fontWeight: "300", color: colors.gray[800] }}>
              TRANSPARENCY
            </div>
            <div style={{ color: colors.gray[900], fontWeight: "300" }}>
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
            <div style={{ fontWeight: "300", color: colors.gray[800] }}>
              COMMENTS
            </div>
            <div style={{ color: colors.gray[900], fontWeight: "600" }}>
              {comments}
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
            {origin && (
              <div style={{ fontWeight: "300", color: colors.gray[800] }}>
                ORIGIN
              </div>
            )}
            {origin && (
              <div style={{ color: colors.gray[900], fontWeight: "300" }}>
                {origin}
              </div>
            )}
            {phenomenon && (
              <div style={{ fontWeight: "300", color: colors.gray[800] }}>
                PHENOMENON
              </div>
            )}
            {phenomenon && (
              <div style={{ color: colors.gray[900], fontWeight: "300" }}>
                {phenomenon}
              </div>
            )}
            {remarks && (
              <div style={{ fontWeight: "300", color: colors.gray[800] }}>
                REMARKS
              </div>
            )}
            {remarks && (
              <div style={{ color: colors.gray[900], fontWeight: "300" }}>
                {remarks}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Gem Image */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: colors.gray[100],
              width: "150px",
              height: "150px",
              position: "relative",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              border: `2px solid ${colors.gray[200]}`,
            }}
          >
            {file ? (
              <Image
                src={file}
                alt="Gem"
                fill
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
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
          <p
            style={{
              fontSize: "12px",
              color: colors.gray[500],
              textAlign: "center",
              lineHeight: "1.3",
              margin: 0,
            }}
          >
            This image is only for representation purposes.
            <br />
            Colour or Size may vary from Original.
          </p>
          <div
            style={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "35px",
            }}
          >
            <h3
              style={{
                color: colors.black,
                fontWeight: "bold",
                fontSize: "18px",
                letterSpacing: "0.1em",
                margin: 0,
              }}
            >
              {variety.toUpperCase()}
            </h3>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "50px",
              }}
            >
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
                  <div style={{ fontWeight: "300", color: colors.gray[800] }}>
                    Gemmologist
                  </div>
                  <div style={{ fontWeight: "bold", color: colors.gray[900] }}>
                    M. SHAHMI RINSAN
                  </div>
                  <div style={{ fontSize: "12px", color: colors.gray[600] }}>
                    FGA (GEM-A), Dip.PGSL
                  </div>
                </div>
              </div>
              {/* QR Code */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {qrCodeUrl && (
                  <div style={{ marginBottom: "8px" }}>
                    <Image
                      src={qrCodeUrl}
                      alt="Verification QR Code"
                      width="80"
                      height="80"
                    />
                  </div>
                )}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "300",
                      color: colors.gray[700],
                    }}
                  >
                    Verification
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: colors.gray[600],
                      marginTop: "4px",
                    }}
                  >
                    For More Information
                  </div>
                  <div style={{ fontSize: "12px", color: colors.gray[600] }}>
                    {server}
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
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  color: colors.gray[800],
                  marginBottom: "4px",
                }}
              >
                FGL (PVT) LTD.
              </div>
              <div>
                94/3, Sally Hajiar Mawatha, Chinafort, Beruwala, 12070, Sri
                Lanka
              </div>
              <div style={{ marginTop: "4px" }}>+94 76 354 9226</div>
              <div>{email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "24px",
          right: "24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: colors.gray[500],
            margin: 0,
          }}
        >
          The conclusion of this report represents our findings through
          gemmological testing at the time of examination. Terms & conditions on
          the reverse side
        </p>
      </div>
    </div>
  );
};

export default GemologicalReport;
