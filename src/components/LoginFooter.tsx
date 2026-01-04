import { UserPlus, Info } from "lucide-react";
import ActionCard from "./ActionCard";

const LoginFooter = () => {
  return (
    <div className="ecocash-footer w-full py-8 px-6 rounded-t-[2rem]">
      <p className="text-center text-primary-foreground mb-6">
        To register an EcoCash wallet or get assistance,
        <br />
        click below
      </p>
      
      <div className="flex justify-center gap-4 mb-8">
        <ActionCard 
          icon={UserPlus} 
          label="Register" 
          onClick={() => console.log('Register clicked')}
        />
        <ActionCard 
          icon={Info} 
          label="Help & Support" 
          onClick={() => console.log('Help clicked')}
        />
      </div>
      
      <p className="text-center text-primary-foreground/70 text-sm mb-2">
        v2.1.3P
      </p>
      
      <p className="text-center text-primary-foreground/80 text-sm">
        By signing in you agree to the{' '}
        <a href="#" className="underline hover:text-primary-foreground transition-colors">
          Terms and Conditions
        </a>
      </p>
    </div>
  );
};

export default LoginFooter;
