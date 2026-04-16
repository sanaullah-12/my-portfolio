# Portfolio Website - Setup Instructions

## 1. EmailJS Configuration (For Contact Form & Visitor Notifications)

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email

### Step 2: Create Email Service
1. Go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose Gmail (recommended) or your preferred email provider
4. Connect your email account
5. Note down the **Service ID** (e.g., `service_portfolio`)

### Step 3: Create Email Templates

#### Template 1: Contact Form
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Subject:**
```
New Contact Form Message from {{from_name}}
```

**Body:**
```
You received a new message from your portfolio website!

👤 Name: {{from_name}}
📧 Email: {{from_email}}
💬 Message:
{{message}}

---
Sent from: Sanaullah Portfolio
Reply to: {{reply_to}}
```

4. Save and note the **Template ID** (e.g., `template_contact`)

#### Template 2: Visitor Notification
1. Create another template

**Subject:**
```
🔔 New Visitor on Your Portfolio
```

**Body:**
```
Someone just visited your portfolio website!

📅 Time: {{visit_time}}
📱 Device: {{device_type}}
🌐 Browser: {{browser}}
💻 OS: {{operating_system}}
📐 Screen: {{screen_resolution}}
🗣️ Language: {{language}}
🌍 Timezone: {{timezone}}
🔗 Referrer: {{referrer}}
📄 Page: {{page_url}}

---
Sent from Portfolio Visitor Tracker
```

2. Save and note the **Template ID** (e.g., `template_visitor`)

### Step 4: Get Public Key
1. Go to "Account" > "API Keys"
2. Copy your **Public Key**

### Step 5: Update Configuration
Open these files and replace the placeholder values:

**File: `src/hooks/useContactForm.ts`**
```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_actual_service_id',    // Replace
  TEMPLATE_ID: 'your_contact_template_id', // Replace
  PUBLIC_KEY: 'your_actual_public_key',    // Replace
};
```

**File: `src/hooks/useVisitorNotification.ts`**
```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_actual_service_id',      // Replace
  TEMPLATE_ID: 'your_visitor_template_id',   // Replace
  PUBLIC_KEY: 'your_actual_public_key',      // Replace
};
```

---

## 2. Profile Image Replacement

### Option 1: Replace the existing file
1. Prepare your profile image (recommended: 800x1000px, 4:5 aspect ratio)
2. Save it as `profile.png` (or .jpg)
3. Replace the file at: `public/images/profile.png`
4. If using a different filename, update `src/sections/Hero.tsx` line ~140

### Option 2: Use a different image path
In `src/sections/Hero.tsx`, find:
```tsx
<img
  src="/images/profile.png"
  alt="Sanaullah"
  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
/>
```
Change `src` to your image path.

---

## 3. Project Images

Replace these files in `public/images/`:
- `project-1.jpg` - Your first project screenshot
- `project-2.jpg` - Your second project screenshot
- `project-3.jpg` - Your third project screenshot

Then update project details in `src/sections/Projects.tsx`

---

## 4. Personal Information Updates

### Update in `src/sections/Hero.tsx`:
- Your name (if different)
- Your tagline
- Social media links

### Update in `src/sections/About.tsx`:
- Your bio
- Your stats (years, projects count)

### Update in `src/sections/Contact.tsx`:
- Your email address
- Your phone number
- Your location

### Update in `src/sections/Footer.tsx`:
- Your email address
- Your contact info

---

## 5. Skills Update

In `src/sections/Skills.tsx`, update:
- Your actual skills
- Proficiency percentages
- Technology names

---

## 6. Projects Update

In `src/sections/Projects.tsx`, update:
- Project titles
- Descriptions
- Tech stacks
- Live demo URLs
- GitHub repository URLs

---

## 7. Build and Deploy

After making all changes:

```bash
# Install dependencies (if not done)
npm install

# Build the project
npm run build

# The dist folder will contain your built website
```

---

## Features Summary

✅ **Dark/Light Mode Toggle** - Working with smooth transitions
✅ **Interactive Particle Background** - tsParticles with mouse repulsion
✅ **Working Contact Form** - Sends emails via EmailJS
✅ **Visitor Notifications** - Get email when someone visits
✅ **Smooth Animations** - GSAP scroll-triggered animations
✅ **Responsive Design** - Works on all devices
✅ **No Chat Widget** - Clean, professional footer

---

## Need Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- tsParticles Docs: https://particles.js.org/
- React Docs: https://react.dev/

---

**Your portfolio email:** qazisanaullah612@gmail.com
