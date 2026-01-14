import React, { useState, useEffect } from 'react'; // Fixed: useEffect included here
import { X, ArrowLeft } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(""); // New state for dynamic email
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(59);

  // SIMULATION: Trigger login on Verify click
  const handleVerify = () => {
    // Check if OTP is filled (simulated check)
    if (otp.join("").length === 6) {
      // Mock user data based on the provided email
      const mockUser = {
        name: email.split('@')[0], // Extract name from email
        email: email,
      };
      
      onLoginSuccess(mockUser); // Send data to Navbar
      onClose(); // Close modal
      setStep(1); // Reset for next time
    } else {
      alert("Please enter the 6-digit code");
    }
  };

  // Timer Logic
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[500px] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          {step === 2 ? (
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-800 font-bold">
              <ArrowLeft size={20} /> Back
            </button>
          ) : <div className="w-8" />}
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X size={24} /></button>
        </div>

        <div className="p-8 pt-2">
          {step === 1 ? (
            <>
              <h1 className="text-3xl font-bold text-[#1e2a4a] mb-8">Welcome to Engine Room</h1>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Captures user input
                    placeholder="Enter email address" 
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg outline-none focus:border-[#5271FF]" 
                  />
                </div>
                <button 
                  onClick={() => email && setStep(2)} 
                  className="w-full bg-[#5271FF] text-white py-4 rounded-full font-bold text-lg"
                >
                  Continue
                </button>

                {/* Divider */}
                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* Google Button */}
                <button className="w-full flex items-center justify-center gap-3 border border-gray-200 py-4 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <img src="./google.jfif" alt="Google" className="w-6 h-6 bg-white" />
                  <a href='https://accounts.google.com/'>Continue with Google</a>
                </button>
              </div>
              {/* Footer Terms */}
              <p className="mt-12 text-center text-xs text-gray-500 leading-relaxed px-4">
                By continuing, you agree to our <span className="underline cursor-pointer">Terms of Use</span> and acknowledge that you have read our <span className="underline cursor-pointer">Privacy Policy</span>.
              </p>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#1e2a4a] mb-2">Enter Verification Code</h2>
              <p className="text-gray-500 text-sm mb-8">
                A verification code sent to <span className="font-medium text-gray-700">{email}</span>
              </p>

              <div className="flex justify-between gap-2 mb-6">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-12 h-16 border border-gray-200 rounded-lg text-center text-xl font-bold focus:border-[#5271FF] outline-none"
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                  />
                ))}
              </div>

              <div className="text-left text-sm mb-8">
                {timer > 0 ? (
                  <span className="text-gray-500">{timer} resend</span>
                ) : (
                  <button onClick={() => setTimer(59)} className="text-[#5271FF] font-bold">Resend Code</button>
                )}
              </div>

              <button
              onClick={handleVerify} 
              className="w-full bg-[#5271FF] text-white py-4 rounded-full font-bold text-lg mb-10">Verify</button>
              
              <div className="text-left space-y-4">
                <p className="font-bold text-gray-800 text-sm">Didn't receive the email?</p>
                <ol className="text-sm text-gray-600 space-y-2">
                  <li>1. Make sure your email address is correct</li>
                  <li>2. Please check your spam folder</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
