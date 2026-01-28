import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
  const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
  const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;

  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !NOTIFICATION_EMAIL) {
    console.error("Missing Mailgun configuration");
    return res.status(500).json({ message: "Server configuration error" });
  }

  try {
    const formData = new URLSearchParams();
    formData.append("from", `Newsletter <mailgun@${MAILGUN_DOMAIN}>`);
    formData.append("to", NOTIFICATION_EMAIL);
    formData.append("subject", "New Newsletter Subscriber");
    formData.append(
      "text",
      `You have a new newsletter subscriber!\n\nEmail: ${email}\nSubscribed at: ${new Date().toISOString()}`
    );
    formData.append(
      "html",
      `
      <h2>New Newsletter Subscriber</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subscribed at:</strong> ${new Date().toISOString()}</p>
    `
    );

    const response = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Mailgun error:", errorData);
      return res.status(500).json({ message: "Failed to send notification" });
    }

    return res.status(200).json({ success: true, message: "Successfully subscribed!" });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
