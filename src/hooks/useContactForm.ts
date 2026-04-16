import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';

// EmailJS Configuration
// USER: Replace these with your actual EmailJS credentials
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_portfolio', // Replace with your EmailJS service ID
  TEMPLATE_ID: 'template_contact', // Replace with your EmailJS template ID
  PUBLIC_KEY: 'your_public_key',   // Replace with your EmailJS public key
};

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData({ name: '', email: '', message: '' });
  }, []);

  const resetStatus = useCallback(() => {
    setStatus({
      isSubmitting: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    });
  }, []);

  const submitForm = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          errorMessage: 'Please fill in all fields.',
        });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          errorMessage: 'Please enter a valid email address.',
        });
        return;
      }

      setStatus({
        isSubmitting: true,
        isSuccess: false,
        isError: false,
        errorMessage: '',
      });

      try {
        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key') {
          // Demo mode - simulate successful submission
          await new Promise((resolve) => setTimeout(resolve, 2000));
          
          console.log('Contact Form Submission (Demo Mode):', {
            to: 'qazisanaullah612@gmail.com',
            from: formData.email,
            name: formData.name,
            message: formData.message,
          });

          setStatus({
            isSubmitting: false,
            isSuccess: true,
            isError: false,
            errorMessage: '',
          });

          resetForm();

          // Reset success message after 5 seconds
          setTimeout(() => {
            resetStatus();
          }, 5000);

          return;
        }

        // Prepare template parameters
        const templateParams = {
          to_email: 'qazisanaullah612@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
          subject: `New Contact Form Message from ${formData.name}`,
        };

        // Send email using EmailJS
        const response = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );

        if (response.status === 200) {
          setStatus({
            isSubmitting: false,
            isSuccess: true,
            isError: false,
            errorMessage: '',
          });

          resetForm();

          // Reset success message after 5 seconds
          setTimeout(() => {
            resetStatus();
          }, 5000);
        } else {
          throw new Error('Failed to send email');
        }
      } catch (error) {
        console.error('Contact form error:', error);
        setStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          errorMessage: 'Failed to send message. Please try again or email directly.',
        });
      }
    },
    [formData, resetForm, resetStatus]
  );

  return {
    formData,
    status,
    handleChange,
    submitForm,
    resetStatus,
  };
}

// Instructions for setting up EmailJS:
/*
1. Go to https://www.emailjs.com/ and create a free account
2. Create a new Email Service (Gmail is recommended)
3. Create an Email Template with these variables:
   - {{to_email}} - Your email (qazisanaullah612@gmail.com)
   - {{from_name}} - Sender's name
   - {{from_email}} - Sender's email
   - {{message}} - The message content
   - {{reply_to}} - Reply-to address
4. Get your Public Key from Account > API Keys
5. Update the EMAILJS_CONFIG above with your credentials

Template Example:
-----------------
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})
Message:
{{message}}

---
Sent from your Portfolio Website
Reply to: {{reply_to}}
*/
