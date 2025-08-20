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
  // Career Form
  fullName: string;
  contactInfo: string;
  position: string;
  cv: File | null;
  coverMessage: string;
  dataConsent: boolean;
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
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    // Career Form
    fullName: "",
    contactInfo: "",
    position: "",
    cv: null,
    coverMessage: "",
    dataConsent: false,
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
    const validationErrors = validateCareerForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showValidationAlert(Object.keys(validationErrors).length);
      return;
    }

    // Clear errors and show success
    setErrors({});
    setIsSubmitted(true);
    showSuccessAlert("career");

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: "",
        contactInfo: "",
        position: "",
        cv: null,
        coverMessage: "",
        dataConsent: false,
      });
    }, 3000);
  };

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
              Join Our <span className="text-[#006398]">Team</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Ready to make an impact? Apply to join our innovative team at iNTEL-CS
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



          {/* Career Application Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <AnimatePresence mode="wait">
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
