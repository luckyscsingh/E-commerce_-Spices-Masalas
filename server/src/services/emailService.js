const transporter = require("../config/email");
const { generateInvoice } = require("./invoiceService");

/**
 * Send order confirmation email with PDF invoice attachment.
 */
const sendOrderConfirmationEmail = async (order) => {
  try {
    const storeUrl = process.env.STORE_URL || "https://yourstore.com";
    const trackingUrl = `${storeUrl}/track-order/${order.trackingId}`;

    // Generate PDF invoice
    const invoicePdf = await generateInvoice(order);

    // Build product list HTML
    const productRows = (order.items || [])
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">
            ${item.name || "Product"}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">
            ${item.quantity || 1}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
            ₹${(item.price || 0).toFixed(2)}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
            ₹${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
          </td>
        </tr>`
      )
      .join("");

    const addr = order.deliveryAddress || order.shippingAddress || {};
    const addressStr = [addr.street, addr.apt, addr.city, addr.state, addr.zip]
      .filter(Boolean)
      .join(", ");

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
      <div style="background: linear-gradient(135deg, #D4540F, #B8430A); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🎉 Order Confirmed!</h1>
        <p style="color: #ffe0cc; margin: 8px 0 0 0; font-size: 14px;">Spice Masala Store</p>
      </div>

      <div style="background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px;">
        <p style="font-size: 16px; color: #333;">
          Hi <strong>${order.customerName || "Customer"}</strong>,
        </p>
        <p style="color: #555; line-height: 1.6;">
          Thank you for your order! Your order has been successfully placed and is being processed.
        </p>

        <!-- Order Summary -->
        <div style="background: #FFF8F4; border: 1px solid #FFE0CC; border-radius: 8px; padding: 15px; margin: 20px 0;">
          <table style="width: 100%; font-size: 14px;">
            <tr>
              <td style="color: #888; padding: 4px 0;">Order ID</td>
              <td style="text-align: right; font-weight: bold; color: #D4540F;">${order.orderId}</td>
            </tr>
            <tr>
              <td style="color: #888; padding: 4px 0;">Tracking ID</td>
              <td style="text-align: right; font-weight: bold;">${order.trackingId}</td>
            </tr>
            <tr>
              <td style="color: #888; padding: 4px 0;">Payment Status</td>
              <td style="text-align: right; font-weight: bold; color: ${order.paymentStatus === "Paid" ? "#16a34a" : "#dc2626"};">
                ${order.paymentStatus}
              </td>
            </tr>
            <tr>
              <td style="color: #888; padding: 4px 0;">Order Status</td>
              <td style="text-align: right; font-weight: bold;">${order.status}</td>
            </tr>
          </table>
        </div>

        <!-- Products -->
        <h3 style="color: #333; border-bottom: 2px solid #D4540F; padding-bottom: 8px;">
          Order Items
        </h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background: #D4540F; color: white;">
              <th style="padding: 10px; text-align: left;">Product</th>
              <th style="padding: 10px; text-align: center;">Qty</th>
              <th style="padding: 10px; text-align: right;">Price</th>
              <th style="padding: 10px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
        </table>

        <!-- Totals -->
        <div style="text-align: right; margin-top: 15px; font-size: 14px; color: #555;">
          <p>Subtotal: <strong>₹${(order.subtotal || 0).toFixed(2)}</strong></p>
          <p>Shipping: <strong>₹${(order.shipping || 0).toFixed(2)}</strong></p>
          <p>Tax: <strong>₹${(order.tax || 0).toFixed(2)}</strong></p>
          <p style="font-size: 18px; color: #D4540F; font-weight: bold;">
            Total: ₹${(order.total || 0).toFixed(2)}
          </p>
        </div>

        <!-- Delivery Address -->
        <h3 style="color: #333; border-bottom: 2px solid #D4540F; padding-bottom: 8px;">
          Delivery Address
        </h3>
        <p style="color: #555; line-height: 1.6;">
          ${order.deliveryAddress?.fullName || order.customerName || ""}<br>
          ${addressStr}<br>
          ${order.phone ? `Phone: ${order.phone}` : ""}
        </p>

        <!-- Track Order Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${trackingUrl}" 
             style="background: #D4540F; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
            Track Your Order
          </a>
        </div>

        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
          The invoice PDF is attached to this email.<br>
          If you have any questions, contact us at support@spicemasalastore.com
        </p>
      </div>
    </body>
    </html>
    `;

    const mailOptions = {
      from: `"Spice Masala Store" <${process.env.SMTP_USER || "noreply@spicemasalastore.com"}>`,
      to: order.email,
      subject: `Order Confirmed! 🎉 (${order.orderId}) — Spice Masala Store`,
      html: htmlContent,
      attachments: [
        {
          filename: `Invoice-${order.orderId}.pdf`,
          content: invoicePdf,
          contentType: "application/pdf",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${order.email}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Failed to send order confirmation email:", error.message);
    // Don't throw — email failure shouldn't break the order flow
    return null;
  }
};

module.exports = { sendOrderConfirmationEmail };
