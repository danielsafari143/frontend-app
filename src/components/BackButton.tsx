import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  to: string;
  label: string;
}

export default function BackButton({ to, label }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      {label}
    </button>
  );
} 