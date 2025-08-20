"use client"
import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { BackgroundClouds } from "@/components/scene/background-clouds";
import {
  createCircleTexture,
  getOptimalCubeCount,
} from "@/components/scene/particle-helpers";
import { Header } from "@/components/header";
import { FooterContent } from "@/components/footer-content";
import {
  Send,
  Building,
  User,
  Mail,
  Phone,
  Server,
  Shield,
  Cloud,
  Database,
  Settings,
  Headphones,
  CheckCircle,
  MessageSquare,
  Loader2,
} from "lucide-react";

// TypeScript interfaces
interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  environment: string;
  services: string[];
  notes: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const ITServicesForm: React.FC = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    environment: "",
    services: [],
    notes: "",
  });

  const environments = [
    { value: "on-premises", label: "On-Premises Infrastructure" },
    { value: "hybrid-cloud", label: "Hybrid Cloud" },
    { value: "aws", label: "Amazon Web Services (AWS)" },
    { value: "azure", label: "Microsoft Azure" },
    { value: "gcp", label: "Google Cloud Platform (GCP)" },
    { value: "multi-cloud", label: "Multi-Cloud Environment" },
    { value: "legacy-systems", label: "Legacy Systems" },
    { value: "startup-minimal", label: "Minimal/Startup Infrastructure" },
    { value: "other", label: "Other" },
  ];

  const serviceOptions = [
    { id: "migration", label: "Cloud Migration", icon: Cloud },
    { id: "automation", label: "Automation", icon: Settings },
    { id: "security", label: "Security & Compliance", icon: Shield },
    { id: "data-ai", label: "Data & AI Solutions", icon: Database },
    { id: "devops", label: "DevOps & CI/CD", icon: Server },
    { id: "monitoring", label: "Monitoring & Analytics", icon: Server },
    { id: "consulting", label: "IT Consulting", icon: MessageSquare },
    { id: "support", label: "24/7 Support", icon: Headphones },
  ];

  // Input change handler
  const handleInputChange = (
    field: keyof FormData,
    value: string | string[]
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

  // Service selection handler
  const handleServiceChange = (serviceId: string, checked: boolean) => {
    let newServices = [...formData.services];
    
    if (checked) {
      newServices.push(serviceId);
    } else {
      newServices = newServices.filter(id => id !== serviceId);
    }
    
    handleInputChange("services", newServices);
  };

  // Validation function
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    } else if (formData.company.trim().length < 2) {
      newErrors.company = "Company name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.environment) {
      newErrors.environment = "Please select your current IT environment";
    }

    if (formData.services.length === 0) {
      newErrors.services = "Please select at least one service";
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

  const showSuccessAlert = () => {
    setAlertMessage("Thank you! Your request has been submitted successfully. We'll contact you within 24 hours.");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  // Form submission handler
  const submitForm = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showValidationAlert(Object.keys(validationErrors).length);
      return;
    }

    // Clear errors and show success
    setErrors({});
    setIsSubmitted(true);
    showSuccessAlert();

    // Prepare data for submission
    const submissionData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      formType: "IT Services Request",
      selectedServices: formData.services.map(serviceId => 
        serviceOptions.find(s => s.id === serviceId)?.label
      ),
    };

    // Log form data (in real app, send to backend)
    console.log("Form submission data:", submissionData);

    // Example API call (uncomment and modify for your backend)
    /*
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      const result = await response.json();
      console.log('Form submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage('Sorry, there was an error submitting your request. Please try again.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
      return;
    }
    */

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        environment: "",
        services: [],
        notes: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* 3D Animated Background */}
      <div className="fixed inset-0 z-0">
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <Loader2 className="w-12 h-12 animate-spin text-[#006398]" />
            </div>
          }
        >
          <Canvas shadows camera={{ position: [0, 0, 12], fov: 30 }}>
            <color attach="background" args={["#000000"]} />
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <BackgroundClouds count={getOptimalCubeCount()} />
          </Canvas>
        </Suspense>
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 pt-32 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 backdrop-blur-sm bg-white/10 rounded-2xl p-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Get Started with Our <span className="text-[#006398]">IT Services</span>
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto drop-shadow-md">
              Tell us about your needs and we'll get back to you shortly
            </p>
          </div>

        {/* Alert Messages */}
        {showAlert && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 transition-all duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{alertMessage}</span>
          </div>
        )}

        {/* IT Services Form */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <Server className="w-6 h-6 text-[#006398]" />
            <h3 className="text-2xl font-bold text-gray-900">
              IT Services Request
            </h3>
          </div>

          <div className="space-y-6">
            {/* Name and Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all ${
                    errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all ${
                    errors.company ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Enter your company name"
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                )}
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all ${
                    errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all ${
                    errors.phone ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* IT Environment */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Server className="w-4 h-4 inline mr-2" />
                Current IT/Cloud Environment *
              </label>
              <select
                value={formData.environment}
                onChange={(e) => handleInputChange("environment", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all bg-white text-gray-900 ${
                  errors.environment ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                style={{
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Select your current environment</option>
                {environments.map((env) => (
                  <option key={env.value} value={env.value}>
                    {env.label}
                  </option>
                ))}
              </select>
              {errors.environment && (
                <p className="mt-1 text-sm text-red-600">{errors.environment}</p>
              )}
            </div>

            {/* Services Needed */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Services Needed *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceOptions.map((service) => {
                  const IconComponent = service.icon;
                  const isChecked = formData.services.includes(service.id);
                  
                  return (
                    <div
                      key={service.id}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        isChecked
                          ? "border-[#006398] bg-blue-50"
                          : "border-gray-200 hover:border-[#006398] hover:bg-blue-50"
                      }`}
                      onClick={() => handleServiceChange(service.id, !isChecked)}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleServiceChange(service.id, e.target.checked)}
                        className="mr-3 w-4 h-4 text-[#006398] border-gray-300 rounded focus:ring-[#006398]"
                      />
                      <IconComponent className="w-5 h-5 text-[#006398] mr-2" />
                      <span className={`text-sm ${isChecked ? "font-semibold text-[#006398]" : "text-gray-700"}`}>
                        {service.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              {errors.services && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.services}
                </p>
              )}
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Additional Notes
              </label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006398] focus:border-transparent transition-all resize-none"
                placeholder="Tell us more about your specific requirements, timeline, budget considerations, or any other details that would help us better understand your needs..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={submitForm}
              disabled={isSubmitted}
              className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] ${
                isSubmitted 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-[#006398] hover:bg-[#004d7a] text-white"
              }`}
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Submitted Successfully
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Request
                </>
              )}
            </button>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-6 text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            What happens next?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#006398]/10 rounded-full flex items-center justify-center mb-2">
                <span className="text-[#006398] font-bold">1</span>
              </div>
              <p>We'll review your requirements within 2 hours</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#006398]/10 rounded-full flex items-center justify-center mb-2">
                <span className="text-[#006398] font-bold">2</span>
              </div>
              <p>Our expert will contact you within 24 hours</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-[#006398]/10 rounded-full flex items-center justify-center mb-2">
                <span className="text-[#006398] font-bold">3</span>
              </div>
              <p>We'll schedule a free consultation call</p>
            </div>
          </div>
        </div>

          {/* Success Message Toast */}
          {isSubmitted && (
            <div className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2 max-w-sm transition-all duration-300" style={{ zIndex: 9999 }}>
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{alertMessage}</span>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <footer className="relative z-10 mt-16 py-12">
          <div className="container mx-auto max-w-6xl px-4">
            <FooterContent />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ITServicesForm;