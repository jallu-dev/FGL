import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";
import BriefGemologicalReport from "./BriefGemologicalReport"; // Adjust path as needed

const generateBriefReportPDF = async (reportData, reportId, setGenerating) => {
  if (typeof document === "undefined") {
    console.error("This function can only run in a browser environment.");
    return;
  }

  let container = null;
  let root = null;

  try {
    setGenerating(true);

    // Create PDF with landscape orientation for ID card (85.6mm x 53.98mm)
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [85.6, 53.98], // ID card dimensions
      compress: true,
    });

    // Create a div element to render the brief report
    container = document.createElement("div");
    container.style.cssText = `
      width: 85.6mm;
      height: 53.98mm;
      background-color: #ffffff;
      box-sizing: border-box;
      position: fixed;
      left: -9999px;
      top: 0;
      z-index: -9999;
      overflow: hidden;
    `;
    container.id = `brief-report-${reportId}`;
    document.body.appendChild(container);

    // Create the root and render the brief report
    root = createRoot(container);

    const renderComplete = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Render timeout - component took too long to render"));
      }, 15000); // 15 second timeout

      root.render(
        <BriefGemologicalReport
          reportData={reportData}
          reportId={reportId}
          onRenderComplete={() => {
            clearTimeout(timeout);
            setTimeout(resolve, 1000); // Give extra time for rendering
          }}
        />
      );
    });

    await renderComplete;

    console.log("Brief report component rendered, generating canvas...");

    // Generate canvas from the rendered component
    const canvas = await html2canvas(container, {
      scale: 5, // Higher scale for small format to ensure quality
      useCORS: true,
      logging: false,
      allowTaint: false,
      width: Math.round(85.6 * 3.779), // 85.6mm to pixels at 96 DPI
      height: Math.round(53.98 * 3.779), // 53.98mm to pixels at 96 DPI
      backgroundColor: "#ffffff",
      foreignObjectRendering: false,
      removeContainer: false,
      imageTimeout: 15000,
      onclone: (clonedDoc, element) => {
        console.log("Cloning document for canvas generation...");

        // Ensure all styles are properly applied in the cloned document
        const clonedContainer = clonedDoc.getElementById(
          `brief-report-${reportId}`
        );
        if (clonedContainer) {
          // Force white background
          clonedContainer.style.backgroundColor = "#ffffff";
          clonedContainer.style.color = "#1f2937";

          // Ensure all text elements have proper colors
          const allElements = clonedContainer.getElementsByTagName("*");
          for (let el of allElements) {
            if (el.style.color === "" || el.style.color === "inherit") {
              el.style.color = "#1f2937";
            }
          }
        }
      },
    });

    // Check if canvas is empty (all black/white)
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Simple check for blank canvas
    let hasContent = false;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // If we find pixels that aren't pure white or pure black, we have content
      if (
        !(
          (r === 255 && g === 255 && b === 255) ||
          (r === 0 && g === 0 && b === 0)
        )
      ) {
        hasContent = true;
        break;
      }
    }

    if (!hasContent) {
      console.warn("Generated canvas appears to be blank");
    }

    const imgData = canvas.toDataURL("image/png", 1.0);

    // Get PDF dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Add image to PDF - fit to page
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");

    // Save the PDF
    const filename = `${reportId}_brief_gemstone_report.pdf`;
    pdf.save(filename);

    console.log(`Brief report PDF generated successfully: ${filename}`);
    return reportId;
  } catch (error) {
    console.error("Error generating brief report PDF:", error);

    // Provide more specific error information
    if (error.message.includes("Render timeout")) {
      console.error(
        "Brief report rendering timed out. Check if onRenderComplete is being called."
      );
    } else if (error.message.includes("Canvas")) {
      console.error(
        "Canvas generation failed. This might be due to CORS issues or unsupported CSS."
      );
    }

    throw error;
  } finally {
    // Clean up the DOM
    try {
      if (container && container.parentNode) {
        if (root) {
          root.unmount();
        }
        document.body.removeChild(container);
      }
    } catch (cleanupError) {
      console.warn("Error during cleanup:", cleanupError);
    }

    setGenerating(false);
  }
};

export default generateBriefReportPDF;
