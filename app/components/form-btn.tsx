
interface FormBtnProps {
  loading: boolean;
  text: string;
}

export default function FormBtn({ loading, text }: FormBtnProps) {
  return (
    <button 
      className={`bg-gray-200 rounded-full px-4 py-3 font-bold ${loading && "text-gray-400"}`}
      disabled={loading}
    >
      {loading ? "Loading..." : text}
    </button>
  );
}
