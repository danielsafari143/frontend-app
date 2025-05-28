import React from "react";
import accounting from "../assets/images/diagramme-a-bandes.png"

export default function DashboardIcon() {
  return (
    <div className="flex flex-col items-center">
      <li>
        <button className="w-48 h-38 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col items-center gap-4 hover:bg-gray-50">
          <img src={accounting} alt="service" className="w-24 h-24 object-cover rounded-lg"/>
          <p className="text-gray-700 font-medium text-lg">Accounting</p>
        </button>
      </li>
    </div>
  );
}