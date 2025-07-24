import emailjs from "@emailjs/browser";

export const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
};
console.log("EmailJS Config:", emailConfig);
export const sendContactEmail = async (formData: any) => {
  try {
    const result = await emailjs.send(
      emailConfig.serviceId!,
      emailConfig.templateId!,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "info@intel-cs.com",
      },
      emailConfig.publicKey
    );
    return { success: true, data: result };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: error };
  }
};
