import React from "react";
import HexagonImage from "./Test";

const DoctorCard = () => {
  return (
    <div className="relative w-[980px] h-[566px] bg-blue-500 p-8">
      {/* Background Hexagons */}
      <div className="absolute right-20 top-10">
        <div className="w-12 h-12 bg-blue-400/30" style={{
          clipPath: "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)"
        }} />
      </div>
      <div className="absolute right-40 bottom-20">
        <div className="w-8 h-8 bg-blue-400/30" style={{
          clipPath: "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)"
        }} />
      </div>

      {/* Plus Signs System */}
      {/* Top row */}
      <div className="absolute top-6 right-6 text-white text-4xl font-bold opacity-80">+</div>
      <div className="absolute top-12 right-32 text-white text-2xl font-bold opacity-50">+</div>
      
      {/* Middle row */}
      <div className="absolute top-1/2 right-16 text-white text-3xl font-bold opacity-60">+</div>
      
      {/* Bottom row */}
      <div className="absolute bottom-12 left-1/2 text-white text-4xl font-bold opacity-80">+</div>
      <div className="absolute bottom-8 right-24 text-white text-2xl font-bold opacity-50">+</div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Left Side - Image */}
        <div className="w-1/3">
          <HexagonImage imageUrl="/path-to-doctor-image.jpg" />
        </div>

        {/* Right Side - Content */}
        <div className="w-2/3 text-white">
          <div className="space-y-6">
            <p className="text-2xl leading-relaxed">
              Tôi không nghĩ mình đang khác đi, bởi tôi là một người sống khá đơn giản. 
              Tôi biết những người yêu mến tôi là vì sự chân thật và giản dị.
            </p>
            
            <div className="mt-8">
              <h2 className="text-yellow-300 text-2xl font-bold">THU QUYNH</h2>
              <p className="text-white/80">Bác sĩ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard; 