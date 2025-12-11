import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import fareStripes from "/fare-tent.svg";
const events = [
  "Battle of Bands",
  "Classical Dance",
  "Open Mic Night",
  "Art Exhibition",
  "Photography Walk",
  "Hackathon",
  "Street Dance",
  "Fashion Show",
  "Debate Competition",
  "Quiz Championship",
];

const registrationSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^[0-9+\-\s]+$/, "Invalid phone number format"),
  college_name: z
    .string()
    .trim()
    .min(2, "College name must be at least 2 characters")
    .max(200, "College name must be less than 200 characters"),
  event_name: z.string().min(1, "Please select an event"),
  team_name: z
    .string()
    .trim()
    .min(1, "Team name is required")
    .max(100, "Team name must be less than 100 characters"),
  team_size: z
    .number()
    .min(1, "Team size must be at least 1")
    .max(10, "Team size cannot exceed 10"),
  transaction_uid: z
    .string()
    .trim()
    .min(1, "Transaction ID is required"),
  payment_screenshot: z
    .instanceof(File, { message: "Payment screenshot is required" })
    .refine((file) => file.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png, .webp formats are supported."
    ),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedEvent = searchParams.get("event") || "";

  const [formData, setFormData] = useState<RegistrationForm>({
    full_name: "",
    email: "",
    phone: "",
    college_name: "",
    event_name: preselectedEvent,
    team_name: "",
    team_size: 1,
    transaction_uid: "",
    payment_screenshot: undefined as unknown as File,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegistrationForm, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "team_size" ? parseInt(value) || 1 : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof RegistrationForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, payment_screenshot: file }));
      if (errors.payment_screenshot) {
        setErrors((prev) => ({ ...prev, payment_screenshot: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted. Validating...");
    setIsSubmitting(true);
    setErrors({});

    // Validate form data
    const result = registrationSchema.safeParse(formData);
    if (!result.success) {
      console.log("Validation failed:", result.error.errors);
      const fieldErrors: Partial<Record<keyof RegistrationForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof RegistrationForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      
      // Show error in popup as requested
      const firstError = Object.values(fieldErrors)[0];
      toast.error("Form Validation Failed", {
        description: firstError || "Please check the form for errors.",
      });

      setIsSubmitting(false);
      return;
    }

    console.log("Validation passed. Checking token...");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You must be logged in to register.");
      }

      const submitData = new FormData();
      submitData.append("teamName", formData.team_name);
      submitData.append("teamNumber", formData.phone); // Mapping phone to teamNumber as per API understanding
      submitData.append("transactionUid", formData.transaction_uid);
      submitData.append("eventName", formData.event_name);
      submitData.append("paymentScreenshot", formData.payment_screenshot);
      // Adding extra fields just in case backend needs them or allows them
      submitData.append("fullName", formData.full_name);
      submitData.append("email", formData.email);
      submitData.append("collegeName", formData.college_name);
      submitData.append("teamSize", formData.team_size.toString());

      console.log("Submitting to backend:", `${import.meta.env.VITE_LOCAL_BACKENDURL}/registration`);
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_BACKENDURL}/registration`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data", // Let axios set this with boundary
          },
        }
      );
      console.log("Backend response:", response.data);

      if (response.data.success) {
        setIsSuccess(true);
        toast.success("Registration successful! See you at IMPACT 2026!");
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Registration Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Registration Successful | IMPACT 2026</title>
        </Helmet>
        <div
          className="relative min-h-screen 
        bg-background text-foreground"
        >
          <Navbar />
          <main
            className="pt-20 min-h-[80vh] flex 
          items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-8 max-w-md mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>
              <h1 className="font-bebas text-4xl md:text-5xl mb-4">
                <span className="text-gradient-accent">Registration</span>{" "}
                Complete!
              </h1>
              <p className="font-poppins text-foreground/70 mb-8">
                Thanks for your registration. We will shortly verify your payment and send you an email.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" onClick={() => navigate("/events")}>
                  Explore More Events
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {

                    setIsSuccess(false);
                    setFormData({
                      full_name: "",
                      email: "",
                      phone: "",
                      college_name: "",
                      event_name: "",
                      team_name: "",
                      team_size: 1,
                      transaction_uid: "",
                      payment_screenshot: undefined as unknown as File,
                    });
                  }}
                >
                  Register Another
                </Button>
              </div>
            </motion.div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Register | IMPACT 2026 College Cultural Fest</title>
        <meta
          name="description"
          content="Register for IMPACT 2026 events. Join thousands of participants from 100+ colleges in the largest cultural fest."
        />
      </Helmet>

      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="font-bebas text-5xl md:text-7xl mb-4">
                  <span className="text-gradient-accent">Register</span> Now
                </h1>
                <p className="font-poppins text-foreground/70 text-lg">
                  Secure your spot at IMPACT 2026. Fill in your details below.
                </p>
              </div>

              {/* Registration Form */}
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30"
              >
                <div className="space-y-6">
                  {/* Event Selection */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                      Select Event <span className="text-primary">*</span>
                    </label>
                    <select
                      name="event_name"
                      value={formData.event_name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-black text-white border font-poppins text-sm focus:border-accent focus:outline-none transition-colors ${
                        errors.event_name
                          ? "border-primary"
                          : "border-border/50"
                      }`}
                    >
                      <option value="" className="bg-black text-white">Choose an event...</option>
                      {events.map((event) => (
                        <option key={event} value={event} className="bg-black text-white">
                          {event}
                        </option>
                      ))}
                    </select>
                    {errors.event_name && (
                      <p className="mt-1 text-sm text-primary">
                        {errors.event_name}
                      </p>
                    )}
                  </div>

                  {/* Personal Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 rounded-lg bg-input border font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors ${
                          errors.full_name
                            ? "border-primary"
                            : "border-border/50"
                        }`}
                      />
                      {errors.full_name && (
                        <p className="mt-1 text-sm text-primary">
                          {errors.full_name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 rounded-lg bg-input border font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors ${
                          errors.email ? "border-primary" : "border-border/50"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-primary">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                        Phone Number <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className={`w-full px-4 py-3 rounded-lg bg-input border font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors ${
                          errors.phone ? "border-primary" : "border-border/50"
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-primary">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                        College Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="college_name"
                        value={formData.college_name}
                        onChange={handleChange}
                        placeholder="Your college/university"
                        className={`w-full px-4 py-3 rounded-lg bg-input border font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors ${
                          errors.college_name
                            ? "border-primary"
                            : "border-border/50"
                        }`}
                      />
                      {errors.college_name && (
                        <p className="mt-1 text-sm text-primary">
                          {errors.college_name}
                        </p>
                      )}
                    </div>
                  </div>


                  {/* Team Details */}
                  <div className="border-t border-border/30 pt-6">
                    <h3 className="font-bebas text-xl text-foreground/80 mb-4">
                      Team Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                          Team Name <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="team_name"
                          value={formData.team_name}
                          onChange={handleChange}
                          placeholder="Your team name"
                          className={`w-full px-4 py-3 rounded-lg bg-input border font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors ${
                            errors.team_name
                              ? "border-primary"
                              : "border-border/50"
                          }`}
                        />
                        {errors.team_name && (
                          <p className="mt-1 text-sm text-primary">
                            {errors.team_name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                          Team Size <span className="text-primary">*</span>
                        </label>
                        <input
                          type="number"
                          name="team_size"
                          value={formData.team_size}
                          onChange={handleChange}
                          min="1"
                          max="10"
                          className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors"
                        />
                         {errors.team_size && (
                          <p className="mt-1 text-sm text-primary">
                            {errors.team_size}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="border-t border-border/30 pt-6">
                    <h3 className="font-bebas text-xl text-foreground/80 mb-4">
                      Payment Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                          Transaction ID <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          name="transaction_uid"
                          value={formData.transaction_uid}
                          onChange={handleChange}
                          placeholder="Enter Transaction ID (e.g. TXN_...)"
                          className={`w-full px-4 py-3 rounded-lg bg-input border font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors ${
                            errors.transaction_uid
                              ? "border-primary"
                              : "border-border/50"
                          }`}
                        />
                        {errors.transaction_uid && (
                          <p className="mt-1 text-sm text-primary">
                            {errors.transaction_uid}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                          Payment Screenshot <span className="text-primary">*</span>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className={`w-full px-4 py-3 rounded-lg bg-input border font-poppins text-sm text-foreground/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-accent-foreground hover:file:bg-accent/80 transition-colors ${
                            errors.payment_screenshot
                              ? "border-primary"
                              : "border-border/50"
                          }`}
                        />
                        <p className="mt-1 text-xs text-foreground/50">
                          Max size: 5MB. Formats: JPG, PNG, WebP
                        </p>
                        {errors.payment_screenshot && (
                          <p className="mt-1 text-sm text-primary">
                            {errors.payment_screenshot}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Registering...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </Button>

                  <p className="text-center text-sm text-foreground/50">
                    By registering, you agree to our terms and conditions.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Register;
