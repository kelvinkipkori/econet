import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ZimbabweFlag from "./ZimbabweFlag";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput = ({ value, onChange }: PhoneInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`phone-input-container px-4 py-3 ${isFocused ? 'ring-2 ring-primary/20' : ''}`}>
      {/* Country Selector */}
      <div className="flex items-center gap-2 pr-3 border-r border-gray-300 cursor-pointer">
        <ZimbabweFlag className="w-6 h-4 rounded-sm" />
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </div>
      
      {/* Country Code */}
      <span className="pl-3 text-foreground font-medium">+263</span>
      
      {/* Phone Number Input */}
      <input
        type="tel"
        placeholder="Phone Number"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 px-2 py-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
        maxLength={10}
      />
    </div>
  );
};

export default PhoneInput;
