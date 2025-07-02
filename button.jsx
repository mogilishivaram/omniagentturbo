export function Button({ children, onClick, variant = 'default', ...props }) {
  const base = 'px-4 py-2 rounded text-white font-medium';
  const styles = {
    default: 'bg-blue-600 hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-100',
    secondary: 'bg-gray-500 hover:bg-gray-600',
    destructive: 'bg-red-600 hover:bg-red-700',
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}
