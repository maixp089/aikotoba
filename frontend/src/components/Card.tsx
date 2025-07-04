import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-yellow-50 font-['M_PLUS_Rounded_1c','Kosugi_Maru','sans-serif']">
      <div className="bg-[#fff8e7] border-[3px] border-[#b7d7bb] rounded-[28px] shadow-[0_6px_28px_#b7d7bb66,0_1.5px_0_#fffbe9_inset] text-center px-6 py-10 w-[370px] h-[700px] overflow-y-auto box-border">
        {children}
      </div>
    </div>
  );
};

export default Card;
