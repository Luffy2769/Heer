/**
 * Helper utility to send form submission notifications via Formspree.
 * Supports both full URL (e.g., https://formspree.io/f/xyza...)
 * and raw Formspree Form ID (e.g., xyza...).
 */

export function getFormspreeUrl(endpoint?: string): string {
  const raw = endpoint || import.meta.env.VITE_FORMSPREE_ENDPOINT || "";
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }
  return `https://formspree.io/f/${raw}`;
}

export interface FormspreePayload {
  _subject?: string;
  _replyto?: string;
  name: string;
  phone?: string;
  email?: string;
  event_date?: string;
  city?: string;
  services?: string;
  notes?: string;
  [key: string]: unknown;
}

export async function sendFormspreeNotification(data: FormspreePayload): Promise<boolean> {
  const url = getFormspreeUrl();
  if (!url || url.includes("YOUR_FORMSPREE_FORM_ID")) {
    console.info("Formspree: VITE_FORMSPREE_ENDPOINT is not set or using placeholder.");
    return false;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Formspree notification sent successfully!");
      return true;
    } else {
      console.warn("Formspree returned error status:", response.status);
      return false;
    }
  } catch (err) {
    console.warn("Failed to send Formspree notification:", err);
    return false;
  }
}
