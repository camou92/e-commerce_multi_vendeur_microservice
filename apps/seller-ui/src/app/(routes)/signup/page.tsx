"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { COUNTRIES } from "apps/seller-ui/src/utils/countries";
import CreateShop from "apps/seller-ui/src/shared/modules/auth/create-shop";
import StripeLogo from "apps/seller-ui/src/assets/svgs/stripe-logo";

type FormData = {
  name: string;
  email: string;
  password: string;
  country: string;
  phone_number: string;
};

const Signup = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(60);
  const [showOtp, setShowOtp] = useState(false); // Départ normal: false
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [sellerData, setSellerData] = useState<FormData | null>(null);
  const [sellerId, setSellerId] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  // Debug live
  useEffect(() => {
    console.log("DEBUG | activeStep:", activeStep, "| showOtp:", showOtp, "| sellerData:", sellerData);
  }, [activeStep, showOtp, sellerData]);

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const signupMutation = useMutation({
    mutationFn: async (data: FormData) => {
      console.log("SERVER_URI:", process.env.NEXT_PUBLIC_SERVER_URI)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/seller-registration`,
        data
      );
      return response.data;
    },
    onSuccess: (_, formData) => {
      console.log("✅ Signup Success - Show OTP now");
      setSellerData(formData);
      setShowOtp(true); // Afficher OTP
      setCanResend(false);
      setTimer(60);
      startResendTimer();
    },
    onError: (error) => {
      console.error("❌ Signup Failed:", error);
    }
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      if (!sellerData) return;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/verify-seller`,
        {
          ...sellerData,
          otp: otp.join(""),
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("✅ OTP Verified - Moving to next step");
      setSellerId(data?.seller?.id);
      setActiveStep(2);
    },
    onError: (error) => {
      console.error("❌ OTP Verification Failed:", error);
    }
  });

  const onSubmit = (data: FormData) => {
    console.log("🚀 Submitting signup form", data);
    signupMutation.mutate(data);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resendOtp = () => {
    if (sellerData) {
      console.log("🔁 Resending OTP");
      signupMutation.mutate(sellerData);
    }
  };

  const connectStripe = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/create-stripe-link`,
        {sellerId}
      )

      if (response.data.url) {
        window.location.href = response.data.url
      }
    } catch (error) {
      console.error("Stripe Connection Error:", error)
    }
  }

  return (
    <div className="w-full flex flex-col items-center pt-10 min-h-screen">
      {/* Debug mode */}
      <div className="bg-yellow-100 text-yellow-800 p-2 mb-4 rounded-md">
        Debug: activeStep={activeStep} | showOtp={String(showOtp)} | timer={timer}
      </div>

      {/* Stepper */}
      <div className="relative flex items-center justify-between md:w-[50%] mb-8">
        <div className="absolute top-[25%] left-0 w-[80%] md:w-[90%] h-1 bg-gray-300 -z-10" />
        {[1, 2, 3].map((step) => (
          <div key={step}>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold
             ${step <= activeStep ? "bg-blue-600" : "bg-gray-300"}`}
            >
              {step}
            </div>
            <span className="ml-[-15px]">
              {step === 1
                ? "Create Account"
                : step === 2
                ? "Setup Shop"
                : "Connect Bank"}
            </span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="md:w-[480px] p-8 bg-white shadow rounded-lg">
        {activeStep === 1 && (
          <>
            {!showOtp ? (
              // FORMULAIRE INSCRIPTION
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-2xl font-semibold text-center mb-4">
                  Create Account
                </h3>

                {/* NOM */}
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="camoutech"
                  className="w-full p-2 border border-gray-300 outline-0 rounded mb-2"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}

                {/* EMAIL */}
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="support@camoutech.com"
                  className="w-full p-2 border border-gray-300 outline-0 rounded mb-2"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                {/* TELEPHONE */}
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="77852632157"
                  className="w-full p-2 border border-gray-300 outline-0 rounded mb-2"
                  {...register("phone_number", {
                    required: "Phone Number is required",
                    minLength: { value: 10, message: "Minimum 10 digits" },
                    maxLength: { value: 15, message: "Maximum 15 digits" },
                  })}
                />
                {errors.phone_number && (
                  <p className="text-red-500 text-sm">{errors.phone_number.message}</p>
                )}

                {/* PAYS */}
                <label className="block text-gray-700 mb-1">Country</label>
                <select
                  className="w-full p-2 border border-gray-300 outline-0 rounded mb-2"
                  {...register("country", { required: "Country is required" })}
                >
                  <option value="">Select your country</option>
                  {COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country.message}</p>
                )}

                {/* PASSWORD */}
                <label className="block text-gray-700 mb-1">Password</label>
                <div className="relative mb-2">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    className="w-full p-2 border border-gray-300 outline-0 rounded"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "At least 6 characters" },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                  >
                    {passwordVisible ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={signupMutation.isPending}
                  className="w-full text-lg bg-black text-white py-2 rounded-lg"
                >
                  {signupMutation.isPending ? "Signing up..." : "Signup"}
                </button>

                {signupMutation.isError && signupMutation.error instanceof AxiosError && (
                  <p className="text-red-500 text-sm mt-2">
                    {signupMutation.error.response?.data?.message || signupMutation.error.message}
                  </p>
                )}

                <p className="pt-3 text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-500">Login</Link>
                </p>
              </form>
            ) : (
              // FORMULAIRE OTP
              <div>
                <h3 className="text-xl font-semibold text-center mb-4">Enter OTP</h3>
                <div className="flex justify-center gap-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      ref={(el) => (inputRefs.current[index] = el)}
                      maxLength={1}
                      className="w-12 h-12 text-center border border-gray-300 rounded"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    />
                  ))}
                </div>

                <button
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg"
                  disabled={verifyOtpMutation.isPending}
                  onClick={() => verifyOtpMutation.mutate()}
                >
                  {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
                </button>

                <p className="text-center text-sm mt-4">
                  {canResend ? (
                    <button onClick={resendOtp} className="text-blue-500">
                      Resend OTP
                    </button>
                  ) : (
                    `Resend OTP in ${timer}s`
                  )}
                </p>

                {verifyOtpMutation.isError && verifyOtpMutation.error instanceof AxiosError && (
                  <p className="text-red-500 text-sm mt-2">
                    {verifyOtpMutation.error.response?.data?.message || verifyOtpMutation.error.message}
                  </p>
                )}
              </div>
            )}
          </>
        )}
        {activeStep === 2 && (
          <CreateShop sellerId={sellerId} setActiveStep={setActiveStep} />
        )}

        {activeStep === 3 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Withdraw Method</h3>
            <br />
            <button
            className="w-full m-auto flex items-center justify-center gap-3 text-lg bg-[#334155] text-white py-2 rounded-lg"
            onClick={connectStripe}
            >
              Connect Stripe <StripeLogo />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
