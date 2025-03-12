interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  icon: React.ReactNode;
  errors: string[];
}

export default function FormInput({
  type,
  placeholder,
  required,
  icon,
  errors,
}: FormInputProps) {
  return (
      <div className="flex flex-col gap-2 relative">
          <div className="relative">
            <input 
              type={type}
              className="w-full rounded-full px-12 border-2 border-gray-300 p-2 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300" 
              placeholder={placeholder}
              required={required}
            />
            {icon}
          </div>
          {errors.map((error, index) => (
              <span key={index} className="text-red-500">{error}</span>
            ))}
      </div>
  );
}
