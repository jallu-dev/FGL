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

  const DotLeader = () => (
    <div
      style={{
        flexGrow: 1,
        flexShrink: 1,
        minWidth: "1px",
        overflow: "hidden",
        height: 20,
        lineHeight: "1.2em",
        margin: "0 2px",
      }}
    >
      {".".repeat(200)}
    </div>
  );

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
    trade_name,
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
        padding: "15px",
        boxSizing: "border-box",
        color: colors.gray[800],
      }}
    >
      <div
        style={{
          border: "4px solid #e3c16f",
          paddingBottom: 15,
          backgroundImage: "url('/images/bg1.png')",
          backgroundPosition: "left bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "62%",
          pointerEvents: "none",
          zIndex: 0,
          position: "relative",
        }}
      >
        {/* Header */}
        <div className="flex items-center mb-6 ml-6">
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
                <stop offset="0%" stopColor="var(--primary-color, #e3c16f)" />
                <stop
                  offset="50%"
                  stopColor="var(--secondary-color, #e3c16f)"
                />
                <stop offset="100%" stopColor="var(--accent-color, #e3c16f)" />
              </linearGradient>
            </defs>
            <text
              x="160"
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
              flexShrink: "0",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            {/* 1st block  */}
            <div
              style={{
                display: "flex",
                gap: "5px 0",
                alignSelf: "self-start",
                fontSize: "14px",
                flexDirection: "column",
              }}
            >
              {/* report id */}
              <div style={{ display: "flex", marginLeft: 105, width: 350 }}>
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    textTransform: "capitalize",
                    flexShrink: 0,
                  }}
                >
                  report id
                </div>
                <DotLeader />
                <div
                  style={{
                    color: colors.gray[800],
                    fontWeight: "500",
                    flexShrink: 0,
                  }}
                >
                  {reportId}
                </div>
              </div>

              {/* date */}
              <div style={{ display: "flex", marginLeft: 105, width: 350 }}>
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    textTransform: "capitalize",
                    flexShrink: 0,
                  }}
                >
                  date
                </div>
                <DotLeader />
                <div
                  style={{
                    color: colors.gray[800],
                    fontWeight: "400",
                    flexShrink: 0,
                  }}
                >
                  {`${new Date(created_at).getDate()} ${
                    months[new Date(created_at).getMonth()]
                  } ${new Date(created_at).getFullYear()}`}
                </div>
              </div>
            </div>

            {/* 2nd block - Details */}
            <div
              style={{
                display: "flex",
                gap: "5px 0",
                alignSelf: "self-start",
                fontSize: "14px",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  color: colors.gray[900],
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "capitalize",
                  marginLeft: 50,
                }}
              >
                Details
              </div>
              {/* object description */}
              <div style={{ display: "flex", marginLeft: 105, width: 350 }}>
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    textTransform: "capitalize",
                    flexShrink: 0,
                  }}
                >
                  object description
                </div>
                <DotLeader />
                <div
                  style={{
                    color: colors.gray[800],
                    fontWeight: "400",
                    flexShrink: 0,
                  }}
                >
                  {description}
                </div>
              </div>

              <div style={{ display: "flex", marginLeft: 105, width: 350 }}>
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    textTransform: "capitalize",
                    flexShrink: 0,
                  }}
                >
                  weight
                </div>
                <DotLeader />
                <div
                  style={{
                    color: colors.gray[800],
                    fontWeight: "400",
                    flexShrink: 0,
                  }}
                >
                  {weight}
                </div>
              </div>

              <div style={{ display: "flex", marginLeft: 105, width: 350 }}>
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    textTransform: "capitalize",
                    flexShrink: 0,
                  }}
                >
                  measurements
                </div>
                <DotLeader />
                <div
                  style={{
                    color: colors.gray[800],
                    fontWeight: "400",
                    flexShrink: 0,
                  }}
                >
                  {measurement}
                </div>
              </div>

              <div style={{ display: "flex", marginLeft: 105, width: 350 }}>
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    textTransform: "capitalize",
                    flexShrink: 0,
                  }}
                >
                  shape & cut
                </div>
                <DotLeader />
                <div
                  style={{
                    color: colors.gray[800],
                    fontWeight: "400",
                    flexShrink: 0,
                  }}
                >
                  {shape}
                </div>
              </div>

              {colour?.split("/n").map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", marginLeft: 105, width: 350 }}
                >
                  <div
                    style={{
                      color: colors.gray[900],
                      fontWeight: "600",
                      textTransform: "capitalize",
                      flexShrink: 0,
                      visibility: i === 0 ? "visible" : "hidden",
                    }}
                  >
                    colour
                  </div>
                  {i === 0 ? (
                    <DotLeader />
                  ) : (
                    <div
                      style={{
                        flexGrow: 1,
                        flexShrink: 1,
                        minWidth: "1px",
                        height: 20,
                      }}
                    />
                  )}
                  <div
                    style={{
                      color: colors.gray[800],
                      fontWeight: "500",
                      flexShrink: 0,
                    }}
                  >
                    • {item || "\u200b"}
                  </div>
                </div>
              ))}

              {/* transparency */}
              <div style={{ display: "flex", marginLeft: 105, width: 350 }}>
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    textTransform: "capitalize",
                    flexShrink: 0,
                  }}
                >
                  transparency
                </div>
                <DotLeader />
                <div
                  style={{
                    color: colors.gray[800],
                    fontWeight: "400",
                    flexShrink: 0,
                  }}
                >
                  {transparency}
                </div>
              </div>
              {phenomenon && (
                <div style={{ display: "flex", marginLeft: 105, width: 350 }}>
                  <div
                    style={{
                      color: colors.gray[900],
                      fontWeight: "600",
                      textTransform: "capitalize",
                      flexShrink: 0,
                    }}
                  >
                    phenomenon
                  </div>
                  <DotLeader />
                  <div
                    style={{
                      color: colors.gray[800],
                      fontWeight: "400",
                      flexShrink: 0,
                    }}
                  >
                    {phenomenon}
                  </div>
                </div>
              )}
            </div>

            {/* 3rd block - Weight & Measurement */}
            <div
              style={{
                display: "flex",
                gap: "5px 0",
                alignSelf: "self-start",
                fontSize: "14px",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  color: colors.gray[900],
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "capitalize",
                  marginLeft: 50,
                }}
              >
                Results
              </div>
              {/* species */}
              <div style={{ display: "flex", marginLeft: 105, width: 350 }}>
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    textTransform: "capitalize",
                    flexShrink: 0,
                  }}
                >
                  species
                </div>
                <DotLeader />
                <div
                  style={{
                    color: colors.gray[800],
                    fontWeight: "500",
                    flexShrink: 0,
                  }}
                >
                  {species}
                </div>
              </div>

              {/* variety */}
              <div style={{ display: "flex", marginLeft: 105, width: 350 }}>
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    textTransform: "capitalize",
                    flexShrink: 0,
                  }}
                >
                  variety
                </div>
                <DotLeader />
                <div
                  style={{
                    color: colors.gray[800],
                    fontWeight: "500",
                    flexShrink: 0,
                  }}
                >
                  {variety}
                </div>
              </div>
              {comments?.split("/n").map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", marginLeft: 105, width: 350 }}
                >
                  <div
                    style={{
                      color: colors.gray[900],
                      fontWeight: "600",
                      textTransform: "capitalize",
                      flexShrink: 0,
                      visibility: i === 0 ? "visible" : "hidden",
                    }}
                  >
                    comments
                  </div>
                  {i === 0 ? (
                    <DotLeader />
                  ) : (
                    <div
                      style={{
                        flexGrow: 1,
                        flexShrink: 1,
                        minWidth: "1px",
                        height: 20,
                      }}
                    />
                  )}
                  <div
                    style={{
                      color: colors.gray[800],
                      fontWeight: "500",
                      flexShrink: 0,
                    }}
                  >
                    • {item || "\u200b"}
                  </div>
                </div>
              ))}
              {trade_name && (
                <div
                  style={{
                    display: "flex",
                    alignSelf: "self-start",
                    fontSize: "14px",
                    marginLeft: 105,
                    width: 350,
                  }}
                >
                  <div
                    style={{
                      color: colors.gray[900],
                      fontWeight: "600",
                      flexShrink: 0,
                    }}
                  >
                    *Trade Name
                  </div>
                  <DotLeader />
                  <div
                    style={{
                      color: colors.gray[800],
                      fontWeight: "500",
                      flexShrink: 0,
                    }}
                  >
                    {trade_name}
                  </div>
                </div>
              )}
              {remarks && (
                <div
                  style={{
                    display: "flex",
                    alignSelf: "self-start",
                    fontSize: "14px",
                    marginLeft: 105,
                    width: 350,
                  }}
                >
                  <div
                    style={{
                      color: colors.gray[900],
                      fontWeight: "600",
                      textTransform: "capitalize",
                      flexShrink: 0,
                    }}
                  >
                    remarks
                  </div>
                  <DotLeader />
                  <div
                    style={{
                      color: colors.gray[800],
                      fontWeight: "400",
                      flexShrink: 0,
                    }}
                  >
                    {remarks}
                  </div>
                </div>
              )}
            </div>

            {/* Origin Section */}
            {origin && (
              <div
                style={{
                  marginLeft: "50px",
                }}
                className="flex flex-col gap-y-1 items-start"
              >
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    fontSize: "16px",
                    textTransform: "capitalize",
                  }}
                >
                  origin
                </div>
                <div
                  style={{
                    color: colors.gray[800],
                    fontWeight: "400",
                    fontSize: 14,
                  }}
                >
                  Gemological testing revealed characteristics corresponding to
                  those of a&nbsp;{variety} from :
                </div>
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    fontSize: "16px",
                    alignSelf: "center",
                  }}
                >
                  {origin}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div
            style={{
              flex: 1,
              flexShrink: "0",
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
                border: `1px solid ${colors.black}`,
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
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                {species}
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
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                {variety}
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
                padding: "0 10px",
              }}
            >
              {/*GEMA Logo */}
              <div>
                <Image
                  src="/images/GemACropped.svg"
                  alt="logo"
                  height={120}
                  width={120}
                />
              </div>
              {/* Gemologist Info */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    marginBottom: "4px",
                  }}
                >
                  ................................................
                </div>
                <div style={{ fontSize: "14px" }}>
                  <div style={{ fontWeight: "400", color: colors.gray[800] }}>
                    Gemologist
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
                <div>
                  {qrCodeUrl && (
                    <div>
                      <Image
                        src={qrCodeUrl}
                        alt="Verification QR Code"
                        width="80"
                        height="80"
                      />
                    </div>
                  )}

                  {barcodeUrl && (
                    <div
                      style={{
                        position: "absolute",
                        right: "20px",
                        top: "20px",
                      }}
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

                <div style={{ textAlign: "center" }}>
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
                fontSize: "10px",
                color: colors.gray[600],
                marginTop: "15px",
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
                    width={1563}
                    height={400}
                    className="h-15 w-auto"
                    priority
                  />
                </div>
              </div>
              <div style={{ color: colors.gray[600] }}>
                94/3, Sally Hajiar Mawatha, Chinafort, Beruwala, 12070, Sri
                Lanka
              </div>
              <div style={{ color: colors.gray[600] }}>
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
          >
            The conclusion of this report represents our findings through
            gemological testing at the time of examination. Terms & conditions
            on the reverse side
          </p>
        </div>
      </div>
    </div>
  );
};

export default GemologicalReport;
