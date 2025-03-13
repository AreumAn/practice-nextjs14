import { useRef } from "react";

import { useEffect } from "react";

interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  icon: React.ReactNode;
  errors: string[];
}

export default function FormInput({
  type,
  name,
  placeholder,
  required,
  icon,
  errors,
}: FormInputProps) {

  const hasErrors = errors?.length > 0;

  return (
      <div className="flex flex-col gap-2 relative">
          <div className="relative">
            <input 
              type={type}
              name={name}
              className={`w-full rounded-full px-12 border-2 p-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 
                ${hasErrors 
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                  : "border-gray-300 focus:border-gray-300 focus:ring-gray-300"
                }`}
              placeholder={placeholder}
              required={required}
            />
            {icon}
          </div>
          {errors.map((error, index) => (
              <span key={index} className="text-red-500 pl-4">{error}</span>
            ))}
      </div>
  );
}
