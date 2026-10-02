import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Handles the Download CV button: starts the file download and pings a webhook
 * so Ivy gets notified that someone grabbed it.
 *
 * The notification is fire-and-forget — if the endpoint is unreachable, the
 * download still happens.
 */

const CV_FILE = '/Ivy_Mbengi_CV.pdf';
const CV_FILE_NAME = 'Ivy_Mbengi_CV.pdf';

// TODO: Replace with your actual webhook URL or EmailJS credentials
// Set VITE_CV_WEBHOOK_URL in a local .env file (and under Netlify > Site
// configuration > Environment variables) to point at your Make.com / Zapier /
// Lambda endpoint. See README.md for the full walkthrough.
const CV_WEBHOOK_URL =
  import.meta.env.VITE_CV_WEBHOOK_URL || 'https://your-webhook-url.com/cv-download';

/** While the URL is still the untouched placeholder, skip the request entirely
 *  so the console stays clean. */
const isPlaceholderWebhook = CV_WEBHOOK_URL.includes('your-webhook-url.com');

function notifyDownload() {
  if (isPlaceholderWebhook) return;

  fetch(CV_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
    }),
    // Lets the request finish even if the page is navigating away.
    keepalive: true,
  }).catch(() => {
    /* Best-effort only — never block the download on the notification. */
  });
}

function triggerFileDownload() {
  const link = document.createElement('a');
  link.href = CV_FILE;
  link.download = CV_FILE_NAME;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/**
 * @param {number} resetAfterMs How long the "downloaded" confirmation shows.
 * @returns {{ hasDownloaded: boolean, downloadCv: () => void }}
 */
export default function useCvDownload(resetAfterMs = 2800) {
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const resetTimerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(resetTimerRef.current), []);

  const downloadCv = useCallback(() => {
    notifyDownload();
    triggerFileDownload();

    setHasDownloaded(true);
    window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => setHasDownloaded(false), resetAfterMs);
  }, [resetAfterMs]);

  return { hasDownloaded, downloadCv };
}
