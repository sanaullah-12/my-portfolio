import { useEffect } from "react";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useContactForm } from "@/hooks/useContactForm";
import gsap from "gsap";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "qazisanaullah612@gmail.com",
    href: "mailto:qazisanaullah612@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 3196628612",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Islamabad Pakistan",
    href: "F-10",
  },
];

export default function Contact() {
  const { ref: titleRef, isVisible: titleVisible } =
    useScrollAnimation<HTMLDivElement>();
  const { formData, status, handleChange, submitForm, resetStatus } =
    useContactForm();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 80%",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm text-primary font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-responsive-section font-bold mb-4">
            Let's <span className="gradient-text">Create</span> Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's discuss how we can work together.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto mt-6" />
        </div>

        <div className="contact-grid grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((info, index) => (
              <a
                key={info.label}
                href={info.href}
                className="contact-card glass rounded-2xl p-5 flex items-center gap-4 card-hover group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    {info.label}
                  </span>
                  <p className="font-medium">{info.value}</p>
                </div>
              </a>
            ))}

            {/* Availability Card */}
            <div className="contact-card glass rounded-2xl p-6 card-hover">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="font-semibold">Available for Work</span>
              </div>
              <p className="text-sm text-muted-foreground">
                I'm currently open to new opportunities and interesting
                projects. Feel free to reach out!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-card lg:col-span-3 glass-strong rounded-2xl p-6 lg:p-8">
            {status.isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
                <Button
                  variant="outline"
                  onClick={resetStatus}
                  className="border-white/20 hover:bg-white/5"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={submitForm} className="space-y-6">
                {/* Error Message */}
                {status.isError && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-400">
                      {status.errorMessage}
                    </p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Sunny"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={status.isSubmitting}
                      className="bg-secondary/50 border-white/10 focus:border-primary/50 h-12 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="sunny@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={status.isSubmitting}
                      className="bg-secondary/50 border-white/10 focus:border-primary/50 h-12 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status.isSubmitting}
                    rows={5}
                    className="bg-secondary/50 border-white/10 focus:border-primary/50 resize-none transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status.isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-white h-12 text-lg font-semibold rounded-xl transition-all disabled:opacity-50"
                >
                  {status.isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your message will be sent directly to
                  qazisanaullah612@gmail.com
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
