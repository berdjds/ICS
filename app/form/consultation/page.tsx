"use client";
import React, { Suspense, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Send,
  Calendar,
  Briefcase,
  Mail,
  Phone,
  Building,
  User,
  MessageSquare,
  FileText,
  Upload,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { StaticScene } from "@/components/scene/static-scene";
import { Canvas } from "@react-three/fiber";
import { FooterContent } from "@/components/footer-content";
import { Header } from "@/components/header";

// TypeScript interfaces
interface FormData {
  // Contact Form
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  inquiryType: string;

  // Consultation Form
  consultationName: string;
  consultationEmail: string;
  currentInfrastructure: string;
  painPoints: string;
  timeline: string;
  budget: string;

  // Career Form
  fullName: string;
  contactInfo: string;
  position: string;
  cv: File | null;
  coverMessage: string;
  dataConsent: boolean;

  // Newsletter
  newsletterEmail: string;
  industryPreference: string;
  topicPreference: string[];
}

interface ValidationErrors {
  [key: string]: string;
}

// Animation variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ComprehensiveForms: React.FC = () => {
  const [activeForm, setActiveForm] = useState<string>("consultation");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    // Contact Form
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    inquiryType: "",

    // Consultation Form
    consultationName: "",
    consultationEmail: "",
    currentInfrastructure: "",
    painPoints: "",
    timeline: "",
    budget: "",

    // Career Form
    fullName: "",
    contactInfo: "",
    position: "",
    cv: null,
    coverMessage: "",
    dataConsent: false,

    // Newsletter
    newsletterEmail: "",
    industryPreference: "",
    topicPreference: [],
  });

  // Input change handler
  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          cv: "File size must be less than 5MB",
        }));
        return;
      }

      // Validate file type
      const allowedTypes = [".pdf", ".doc", ".docx"];
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        setErrors((prev) => ({
          ...prev,
          cv: "Please upload a PDF, DOC, or DOCX file",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        cv: file,
      }));

      // Clear any existing error
      if (errors.cv) {
        setErrors((prev) => ({
          ...prev,
          cv: "",
        }));
      }
    }
  };

  // Validation functions
  const validateContactForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const validateConsultationForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (!formData.consultationName.trim()) {
      newErrors.consultationName = "Full name is required";
    }

    if (!formData.consultationEmail.trim()) {
      newErrors.consultationEmail = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.consultationEmail)) {
      newErrors.consultationEmail = "Please enter a valid email address";
    }

    if (!formData.currentInfrastructure.trim()) {
      newErrors.currentInfrastructure =
        "Current infrastructure description is required";
    }

    if (!formData.painPoints.trim()) {
      newErrors.painPoints = "Please describe your pain points and challenges";
    }

    return newErrors;
  };

  const validateCareerForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = "Contact information is required";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position applied for is required";
    }

    if (!formData.cv) {
      newErrors.cv = "Please upload your CV/Resume";
    }

    if (!formData.dataConsent) {
      newErrors.dataConsent =
        "You must consent to data processing to submit your application";
    }

    return newErrors;
  };

  const validateNewsletterForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (!formData.newsletterEmail.trim()) {
      newErrors.newsletterEmail = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.newsletterEmail)) {
      newErrors.newsletterEmail = "Please enter a valid email address";
    }

    return newErrors;
  };

  // Alert functions
  const showValidationAlert = (errorCount: number) => {
    setAlertMessage(
      `Please fill in all required fields. ${errorCount} field${
        errorCount > 1 ? "s" : ""
      } need${errorCount === 1 ? "s" : ""} attention.`
    );
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const showSuccessAlert = (formType: string) => {
    const messages: { [key: string]: string } = {
      contact: "Thank you! Your message has been sent successfully.",
      consultation: "Great! Your consultation request has been submitted.",
      career: "Thank you! Your application has been submitted successfully.",
      newsletter: "Welcome! You have been subscribed to our newsletter.",
    };

    setAlertMessage(messages[formType]);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  // Form submission handler
  const submitForm = () => {
    let validation: ValidationErrors = {};
    let formType = "";

    switch (activeForm) {
      case "contact":
        validation = validateContactForm();
        formType = "contact";
        break;
      case "consultation":
        validation = validateConsultationForm();
        formType = "consultation";
        break;
      case "career":
        validation = validateCareerForm();
        formType = "career";
        break;
      case "newsletter":
        validation = validateNewsletterForm();
        formType = "newsletter";
        break;
      default:
        return;
    }

    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      showValidationAlert(Object.keys(validation).length);
      // Scroll to first error
      const firstError = Object.keys(validation)[0];
      const element =
        (document.querySelector(`[name="${firstError}"]`) as HTMLElement) ||
        (document.querySelector(`#${firstError}`) as HTMLElement);
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Handle successful form submission
    console.log("Form submitted:", formData);
    showSuccessAlert(formType);

    // Reset form data for the current form
    if (activeForm === "contact") {
      setFormData((prev) => ({
        ...prev,
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        inquiryType: "",
      }));
    }
  };

  // Form configuration
  const formTabs = [
    { id: "consultation", label: "Free Consultation", icon: Calendar },
    { id: "career", label: "Join Our Team", icon: Briefcase },
  ];

  const inquiryTypes = ["Support", "Sales", "Partnership", "Careers"];
  const budgetRanges = ["Under $10K", "$10K - $50K", "$50K - $100K", "$100K+"];
  const timelineOptions = ["ASAP", "1-3 months", "3-6 months", "6+ months"];
  const industries = [
    "Financial Services",
    "Healthcare",
    "E-commerce",
    "Manufacturing",
    "Government",
    "Education",
  ];
  const topics = [
    "Cloud Solutions",
    "AI & Data",
    "Cybersecurity",
    "Digital Transformation",
  ];

  return (
    <>
      <section className="relative py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-black">
        <div className="absolute inset-0 z-0">
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <Loader2 className="w-12 h-12 animate-spin text-[#006398]" />
              </div>
            }
          >
            <Canvas
              shadows
              camera={{ position: [0, 0, 12], fov: 30 }}
              style={{ width: "100%", height: "100%" }}
            >
              <StaticScene />
            </Canvas>
          </Suspense>
        </div>
        <Header />
        <div className="relative z-5 container mx-auto max-w-6xl  backdrop-blur-sm rounded-2xl">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Get Started with <span className="text-[#006398]">iNTEL-CS</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Choose the right form for your needs and let us help you achieve
              your goals
            </p>
          </motion.div>

          {/* Alert Messages */}
          <AnimatePresence>
            {showAlert && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{alertMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Tabs */}
          <motion.div
            className="flex flex-wrap justify-center mb-8 bg-white rounded-xl p-2 shadow-sm"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {formTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveForm(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 m-1  ${
                    activeForm === tab.id
                      ? "bg-[#006398] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium text-sm md:text-base">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Forms Container */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <AnimatePresence mode="wait">
              {/* Consultation Form */}
              {activeForm === "consultation" && (
                <motion.div
                  key="consultation"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <Calendar className="w-6 h-6 text-[#006398]" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Request a Free Cloud Assessment
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="consultationName"
                          value={formData.consultationName}
                          onChange={(e) =>
                            handleInputChange(
                              "consultationName",
                              e.target.value
                            )
                          }
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all ${
                            errors.consultationName
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter your full name"
                        />
                        {errors.consultationName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.consultationName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="consultationEmail"
                          value={formData.consultationEmail}
                          onChange={(e) =>
                            handleInputChange(
                              "consultationEmail",
                              e.target.value
                            )
                          }
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all ${
                            errors.consultationEmail
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300"
                          }`}
                          placeholder="your.email@company.com"
                        />
                        {errors.consultationEmail && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.consultationEmail}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Infrastructure *
                      </label>
                      <textarea
                        name="currentInfrastructure"
                        rows={3}
                        value={formData.currentInfrastructure}
                        onChange={(e) =>
                          handleInputChange(
                            "currentInfrastructure",
                            e.target.value
                          )
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all resize-none ${
                          errors.currentInfrastructure
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Describe your current IT infrastructure..."
                      />
                      {errors.currentInfrastructure && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.currentInfrastructure}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pain Points & Challenges *
                      </label>
                      <textarea
                        name="painPoints"
                        rows={3}
                        value={formData.painPoints}
                        onChange={(e) =>
                          handleInputChange("painPoints", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all resize-none ${
                          errors.painPoints
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="What challenges are you facing with your current setup?"
                      />
                      {errors.painPoints && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.painPoints}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) =>
                            handleInputChange("timeline", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all"
                        >
                          <option value="">Select timeline</option>
                          {timelineOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Budget Range
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) =>
                            handleInputChange("budget", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all"
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={submitForm}
                      className="w-full bg-[#006398] hover:bg-[#004d7a] text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5" />
                      Request Free Assessment
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Career Application Form */}
              {activeForm === "career" && (
                <motion.div
                  key="career"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <Briefcase className="w-6 h-6 text-[#006398]" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Join Our Team
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all ${
                            errors.fullName
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="text"
                          name="contactInfo"
                          value={formData.contactInfo}
                          onChange={(e) =>
                            handleInputChange("contactInfo", e.target.value)
                          }
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all ${
                            errors.contactInfo
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter your Email"
                        />
                        {errors.contactInfo && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.contactInfo}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Position Applied For *
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={(e) =>
                          handleInputChange("position", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all ${
                          errors.position
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="e.g., Cloud Solutions Architect"
                      />
                      {errors.position && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.position}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Upload className="w-4 h-4 inline mr-2" />
                        Upload CV/Resume *
                      </label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-[#006398] transition-colors ${
                          errors.cv
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="cv-upload"
                        />
                        <label htmlFor="cv-upload" className="cursor-pointer">
                          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">
                            {formData.cv
                              ? formData.cv.name
                              : "Click to upload your CV"}
                          </p>
                          <p className="text-sm text-gray-400 mt-2">
                            PDF, DOC, DOCX (Max 5MB)
                          </p>
                        </label>
                      </div>
                      {errors.cv && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.cv}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cover Message
                      </label>
                      <textarea
                        rows={4}
                        value={formData.coverMessage}
                        onChange={(e) =>
                          handleInputChange("coverMessage", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all resize-none"
                        placeholder="Brief introduction about yourself and why you're interested in this position..."
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={formData.dataConsent}
                        onChange={(e) =>
                          handleInputChange("dataConsent", e.target.checked)
                        }
                        className="mt-1 w-4 h-4 text-[#006398] border-gray-300 rounded focus:ring-[#006398]"
                      />
                      <label
                        htmlFor="consent"
                        className="text-sm text-gray-600"
                      >
                        I consent to storing my data for recruitment purposes
                        and understand it will be processed according to the
                        privacy policy. *
                      </label>
                    </div>
                    {errors.dataConsent && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.dataConsent}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={submitForm}
                      disabled={!formData.dataConsent}
                      className="w-full bg-[#006398] hover:bg-[#004d7a] disabled:bg-gray-300 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Briefcase className="w-5 h-5" />
                      Submit Application
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Success Message Toast */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2 z-50"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{alertMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      {/* Footer */}
      <section className="py-12 md:py-20 px-4 md:px-8">
        <FooterContent />
      </section>
    </>
  );
};

export default ComprehensiveForms;
