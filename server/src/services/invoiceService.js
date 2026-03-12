const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const path = require("path");

/**
 * Generate a PDF invoice buffer for an order.
 * Includes store branding, order details, item table, and QR code.
 */
const generateInvoice = async (order) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffers = [];

      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      const storeUrl = process.env.STORE_URL || "https://yourstore.com";
      const trackingUrl = `${storeUrl}/track-order/${order.trackingId}`;

      // --- QR Code ---
      const qrData = JSON.stringify({
        orderId: order.orderId,
        trackingId: order.trackingId,
        trackingUrl,
      });
      const qrImageDataUrl = await QRCode.toDataURL(qrData, {
        width: 120,
        margin: 1,
      });

      // ==================== HEADER ====================
      // Store name as logo
      doc
        .fontSize(28)
        .font("Helvetica-Bold")
        .fillColor("#D4540F")
        .text("SPICE MASALA STORE", 50, 45);

      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor("#666666")
        .text("Premium Spices & Masalas", 50, 78);

      // Invoice title on the right
      doc
        .fontSize(22)
        .font("Helvetica-Bold")
        .fillColor("#333333")
        .text("INVOICE", 400, 45, { align: "right" });

      // Divider
      doc
        .moveTo(50, 100)
        .lineTo(545, 100)
        .strokeColor("#D4540F")
        .lineWidth(2)
        .stroke();

      // ==================== ORDER INFO ====================
      let y = 120;

      doc.fontSize(10).font("Helvetica-Bold").fillColor("#333333");
      doc.text("Order ID:", 50, y);
      doc
        .font("Helvetica")
        .fillColor("#555555")
        .text(order.orderId, 140, y);

      doc.font("Helvetica-Bold").fillColor("#333333");
      doc.text("Date:", 350, y);
      doc
        .font("Helvetica")
        .fillColor("#555555")
        .text(new Date(order.createdAt).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }), 400, y);

      y += 20;
      doc.font("Helvetica-Bold").fillColor("#333333");
      doc.text("Tracking ID:", 50, y);
      doc
        .font("Helvetica")
        .fillColor("#555555")
        .text(order.trackingId, 140, y);

      doc.font("Helvetica-Bold").fillColor("#333333");
      doc.text("Status:", 350, y);
      doc
        .font("Helvetica")
        .fillColor(order.paymentStatus === "Paid" ? "#16a34a" : "#dc2626")
        .text(order.paymentStatus, 400, y);

      // ==================== CUSTOMER INFO ====================
      y += 40;
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#D4540F")
        .text("Bill To:", 50, y);

      y += 18;
      doc.fontSize(10).font("Helvetica").fillColor("#333333");
      doc.text(order.customerName || order.deliveryAddress?.fullName || "", 50, y);
      y += 15;
      doc.text(order.email || "", 50, y);
      y += 15;
      if (order.phone) {
        doc.text(`Phone: ${order.phone}`, 50, y);
        y += 15;
      }

      // Delivery address
      const addr = order.deliveryAddress || order.shippingAddress || {};
      if (addr.street) {
        doc.text(
          [addr.street, addr.apt, addr.city, addr.state, addr.zip]
            .filter(Boolean)
            .join(", "),
          50,
          y,
          { width: 250 }
        );
        y += 20;
      }

      // ==================== PRODUCT TABLE ====================
      y += 15;

      // Table header
      doc
        .rect(50, y, 495, 25)
        .fill("#D4540F");

      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .fillColor("#FFFFFF");
      doc.text("Product", 60, y + 7);
      doc.text("Qty", 340, y + 7, { width: 50, align: "center" });
      doc.text("Price", 400, y + 7, { width: 60, align: "right" });
      doc.text("Total", 470, y + 7, { width: 70, align: "right" });

      y += 25;

      // Table rows
      const items = order.items || [];
      items.forEach((item, index) => {
        const bgColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff";
        doc.rect(50, y, 495, 22).fill(bgColor);

        doc.fontSize(9).font("Helvetica").fillColor("#333333");
        doc.text(item.name || "Product", 60, y + 6, { width: 270 });
        doc.text(String(item.quantity || 1), 340, y + 6, {
          width: 50,
          align: "center",
        });
        doc.text(`₹${(item.price || 0).toFixed(2)}`, 400, y + 6, {
          width: 60,
          align: "right",
        });
        doc.text(
          `₹${((item.price || 0) * (item.quantity || 1)).toFixed(2)}`,
          470,
          y + 6,
          { width: 70, align: "right" }
        );

        y += 22;
      });

      // Table bottom border
      doc
        .moveTo(50, y)
        .lineTo(545, y)
        .strokeColor("#D4540F")
        .lineWidth(1)
        .stroke();

      // ==================== TOTALS ====================
      y += 15;
      doc.fontSize(10).font("Helvetica").fillColor("#555555");

      doc.text("Subtotal:", 380, y);
      doc.text(`₹${(order.subtotal || 0).toFixed(2)}`, 470, y, {
        width: 70,
        align: "right",
      });

      y += 18;
      doc.text("Shipping:", 380, y);
      doc.text(`₹${(order.shipping || 0).toFixed(2)}`, 470, y, {
        width: 70,
        align: "right",
      });

      y += 18;
      doc.text("Tax:", 380, y);
      doc.text(`₹${(order.tax || 0).toFixed(2)}`, 470, y, {
        width: 70,
        align: "right",
      });

      y += 20;
      doc
        .moveTo(380, y)
        .lineTo(545, y)
        .strokeColor("#333333")
        .lineWidth(1)
        .stroke();

      y += 8;
      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .fillColor("#D4540F");
      doc.text("Total:", 380, y);
      doc.text(`₹${(order.total || 0).toFixed(2)}`, 450, y, {
        width: 90,
        align: "right",
      });

      // ==================== QR CODE ====================
      y += 45;
      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .fillColor("#333333")
        .text("Scan to Track Order:", 50, y);

      y += 18;
      // Convert data URL to buffer for PDFKit
      const qrBuffer = Buffer.from(
        qrImageDataUrl.replace(/^data:image\/png;base64,/, ""),
        "base64"
      );
      doc.image(qrBuffer, 50, y, { width: 100, height: 100 });

      doc
        .fontSize(8)
        .font("Helvetica")
        .fillColor("#888888")
        .text(trackingUrl, 160, y + 40, { width: 200 });

      // ==================== FOOTER ====================
      const footerY = 750;
      doc
        .moveTo(50, footerY)
        .lineTo(545, footerY)
        .strokeColor("#EEEEEE")
        .lineWidth(1)
        .stroke();

      doc
        .fontSize(8)
        .font("Helvetica")
        .fillColor("#999999")
        .text(
          "Thank you for shopping with Spice Masala Store!",
          50,
          footerY + 10,
          { align: "center" }
        );
      doc.text(
        "For queries, contact us at support@spicemasalastore.com",
        50,
        footerY + 22,
        { align: "center" }
      );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateInvoice };
