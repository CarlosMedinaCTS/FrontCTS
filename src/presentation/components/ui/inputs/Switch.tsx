import React from 'react';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  id?: string;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({ checked = false, onChange, label, id, disabled = false }) => (
  <label
    htmlFor={id}
    className={`inline-flex items-centercursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={e => onChange?.(e.target.checked)}
      disabled={disabled}
      className="sr-only peer"
    />
    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-4 after:h-4 after:transition-all peer-checked:bg-blue-600" />
    {label && <span className="text-sm font-medium text-gray-900">{label}</span>}
  </label>
);

export default Switch;
