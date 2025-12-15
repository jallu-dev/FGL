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
      <div style={{ border: "4px solid #e3c16f", paddingBottom: 15 }}>
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
                <stop offset="0%" stopColor="var(--primary-color, #9b111e)" />
                <stop
                  offset="50%"
                  stopColor="var(--secondary-color, #d97706)"
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
            {/* 1st block - Dot Leader Style */}
            <div
              style={{
                display: "flex",
                gap: "5px 0",
                alignSelf: "self-start",
                marginLeft: 105,
                fontSize: "14px",
                flexDirection: "column",
                width: 350,
              }}
            >
              {/* report id */}
              <div style={{ display: "flex" }}>
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
                    backgroundColor: "white",
                  }}
                >
                  {reportId}
                </div>
              </div>

              {/* date */}
              <div style={{ display: "flex" }}>
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
                    backgroundColor: "white",
                  }}
                >
                  {`${new Date(created_at).getDate()} ${
                    months[new Date(created_at).getMonth()]
                  } ${new Date(created_at).getFullYear()}`}
                </div>
              </div>

              {/* object description */}
              <div style={{ display: "flex" }}>
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
                    backgroundColor: "white",
                  }}
                >
                  {description}
                </div>
              </div>

              {/* transparency */}
              <div style={{ display: "flex" }}>
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
                    backgroundColor: "white",
                  }}
                >
                  {transparency}
                </div>
              </div>
            </div>

            {/* 2nd block - Species & Variety */}
            <div
              style={{
                display: "flex",
                gap: "5px 0",
                alignSelf: "self-start",
                marginLeft: 105,
                fontSize: "14px",
                flexDirection: "column",
                width: 350,
              }}
            >
              <div style={{ display: "flex" }}>
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
                    backgroundColor: "white",
                  }}
                >
                  {species}
                </div>
              </div>

              <div style={{ display: "flex" }}>
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
                    backgroundColor: "white",
                  }}
                >
                  {variety}
                </div>
              </div>
            </div>

            {/* 3rd block - Weight & Measurement */}
            <div
              style={{
                display: "flex",
                gap: "5px 0",
                alignSelf: "self-start",
                marginLeft: 105,
                fontSize: "14px",
                flexDirection: "column",
                width: 350,
              }}
            >
              <div style={{ display: "flex" }}>
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
                    backgroundColor: "white",
                  }}
                >
                  {weight}
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    textTransform: "capitalize",
                    flexShrink: 0,
                  }}
                >
                  measurement
                </div>
                <DotLeader />
                <div
                  style={{
                    color: colors.gray[800],
                    fontWeight: "400",
                    flexShrink: 0,
                    backgroundColor: "white",
                  }}
                >
                  {measurement}
                </div>
              </div>
            </div>

            {/* 4th block - Color, Shape & Phenomenon */}
            <div
              style={{
                display: "flex",
                gap: "5px 0",
                alignSelf: "self-start",
                marginLeft: 105,
                fontSize: "14px",
                flexDirection: "column",
                width: 350,
              }}
            >
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    color: colors.gray[900],
                    fontWeight: "600",
                    textTransform: "capitalize",
                    flexShrink: 0,
                  }}
                >
                  color
                </div>
                <DotLeader />
                <div
                  style={{
                    color: colors.gray[800],
                    fontWeight: "400",
                    flexShrink: 0,
                    backgroundColor: "white",
                  }}
                >
                  {colour}
                </div>
              </div>

              <div style={{ display: "flex" }}>
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
                    backgroundColor: "white",
                  }}
                >
                  {shape}
                </div>
              </div>

              {phenomenon && (
                <div style={{ display: "flex" }}>
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
                      backgroundColor: "white",
                    }}
                  >
                    {phenomenon}
                  </div>
                </div>
              )}
            </div>

            {/* 5th block - Comments */}
            <div
              style={{
                display: "flex",
                gap: "5px 0",
                alignSelf: "self-start",
                marginLeft: 105,
                fontSize: "14px",
                flexDirection: "column",
                width: 350,
              }}
            >
              {comments?.split("*").map((item, i) => (
                <div key={i} style={{ display: "flex" }}>
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
                      backgroundColor: "white",
                    }}
                  >
                    • {item || "\u200b"}
                  </div>
                </div>
              ))}
            </div>

            {/* 6th block - Remarks */}
            {remarks && (
              <div
                style={{
                  display: "flex",
                  alignSelf: "self-start",
                  marginLeft: 105,
                  fontSize: "14px",
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
                    backgroundColor: "white",
                  }}
                >
                  {remarks}
                </div>
              </div>
            )}

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
                    fontFamily: "serif",
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
                      style={{
                        position: "absolute",
                        right: "30px",
                        top: "30px",
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
                94/3, Sally Hajiar Mawatha, Chinafort, Beruwala, 12070, Sri
                Lanka
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
            gemological testing at the time of examination. Terms & conditions
            on the reverse side
          </p>
        </div>
      </div>

      {/* custom borders */}
      {/* <div
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
      ></div> */}
    </div>
  );
};

export default GemologicalReport;
