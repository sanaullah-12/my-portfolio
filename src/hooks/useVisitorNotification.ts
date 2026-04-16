import { useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_portfolio',
  TEMPLATE_ID: 'template_visitor',
  PUBLIC_KEY: 'your_public_key', // User will need to replace this
};

interface VisitorData {
  timestamp: string;
  userAgent: string;
  language: string;
  screenResolution: string;
  timezone: string;
  referrer: string;
  pageUrl: string;
}

function getVisitorData(): VisitorData {
  return {
    timestamp: new Date().toLocaleString('en-US', {
      timeZoneName: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer || 'Direct Visit',
    pageUrl: window.location.href,
  };
}

function getDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad|ipod/.test(ua)) {
    if (/ipad/.test(ua)) return 'Tablet (iPad)';
    if (/tablet/.test(ua)) return 'Tablet';
    return 'Mobile';
  }
  return 'Desktop';
}

function getBrowserInfo(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes('chrome') && !ua.includes('edg')) return 'Chrome';
  if (ua.includes('firefox')) return 'Firefox';
  if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari';
  if (ua.includes('edg')) return 'Edge';
  if (ua.includes('opera') || ua.includes('opr')) return 'Opera';
  return 'Unknown Browser';
}

function getOSInfo(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (ua.includes('windows')) return 'Windows';
  if (ua.includes('macintosh') || ua.includes('mac os')) return 'macOS';
  if (ua.includes('linux')) return 'Linux';
  if (ua.includes('android')) return 'Android';
  if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) return 'iOS';
  return 'Unknown OS';
}

export function useVisitorNotification() {
  const hasNotified = useRef(false);

  useEffect(() => {
    // Check if we've already notified in this session
    const sessionKey = 'visitor_notified_session';
    const sessionNotified = sessionStorage.getItem(sessionKey);
    
    if (sessionNotified || hasNotified.current) {
      return;
    }

    const notifyVisitor = async () => {
      try {
        const visitorData = getVisitorData();
        const deviceType = getDeviceType(visitorData.userAgent);
        const browser = getBrowserInfo(visitorData.userAgent);
        const os = getOSInfo(visitorData.userAgent);

        // Prepare email template parameters
        const templateParams = {
          to_email: 'qazisanaullah612@gmail.com',
          subject: 'New Visitor on Your Portfolio',
          visit_time: visitorData.timestamp,
          device_type: deviceType,
          browser: browser,
          operating_system: os,
          screen_resolution: visitorData.screenResolution,
          language: visitorData.language,
          timezone: visitorData.timezone,
          referrer: visitorData.referrer,
          page_url: visitorData.pageUrl,
          user_agent: visitorData.userAgent,
        };

        // Send email using EmailJS
        // Note: User needs to set up EmailJS account and replace the config
        if (EMAILJS_CONFIG.PUBLIC_KEY !== 'your_public_key') {
          await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
          );
        }

        // Mark as notified for this session
        sessionStorage.setItem(sessionKey, 'true');
        hasNotified.current = true;

        // Also store in localStorage to track unique visits (optional)
        const visitCount = parseInt(localStorage.getItem('total_visits') || '0');
        localStorage.setItem('total_visits', (visitCount + 1).toString());
        localStorage.setItem('last_visit', visitorData.timestamp);

      } catch (error) {
        console.error('Failed to send visitor notification:', error);
        // Silently fail - don't break user experience
      }
    };

    // Delay notification slightly to ensure page is fully loaded
    const timer = setTimeout(notifyVisitor, 3000);

    return () => clearTimeout(timer);
  }, []);
}

// Alternative: Use a simple fetch to a serverless function or webhook
export async function sendVisitorNotificationWebhook() {
  const sessionKey = 'visitor_notified_session';
  if (sessionStorage.getItem(sessionKey)) {
    return;
  }

  try {
    const visitorData = getVisitorData();
    const deviceType = getDeviceType(visitorData.userAgent);
    const browser = getBrowserInfo(visitorData.userAgent);
    const os = getOSInfo(visitorData.userAgent);

    // You can replace this URL with your own webhook/serverless function
    // Options: Zapier, Make.com, n8n, or a custom serverless function
    const webhookUrl = 'YOUR_WEBHOOK_URL_HERE';

    if (webhookUrl && webhookUrl !== 'YOUR_WEBHOOK_URL_HERE') {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'qazisanaullah612@gmail.com',
          subject: 'New Portfolio Visitor',
          body: `
New visitor on your portfolio!

📅 Time: ${visitorData.timestamp}
📱 Device: ${deviceType}
🌐 Browser: ${browser}
💻 OS: ${os}
📐 Screen: ${visitorData.screenResolution}
🗣️ Language: ${visitorData.language}
🌍 Timezone: ${visitorData.timezone}
🔗 Referrer: ${visitorData.referrer}
📄 Page: ${visitorData.pageUrl}

---
Sent from Portfolio Website
          `.trim(),
        }),
      });

      sessionStorage.setItem(sessionKey, 'true');
    }
  } catch (error) {
    console.error('Webhook notification failed:', error);
  }
}
