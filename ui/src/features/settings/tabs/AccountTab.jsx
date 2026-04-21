import { useState } from 'react';
import { ACCOUNT_FIELDS } from '../data/settingsConfig';

const INITIAL_FORM = {
  displayName: '',
  email: '',
  password: '',
};

export default function AccountTab() {
  const [formValues, setFormValues] = useState(INITIAL_FORM);

  function updateField(field, value) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-1">Account</h2>
      <p className="text-zinc-500 text-sm mb-6">Manage your account</p>
      <div className="card flex items-center justify-between px-5 py-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#2a2a40] flex items-center justify-center text-zinc-400 text-sm">
            U
          </div>
          <div>
            <p className="text-sm font-medium text-white">Display Name</p>
            <p className="text-xs text-zinc-500">Username</p>
          </div>
        </div>
        <button className="btn-danger text-xs px-4 py-1.5">LOG OUT</button>
      </div>
      <h3 className="text-sm font-semibold text-white mb-3">Personal Details</h3>
      <div className="card p-5 flex flex-col gap-4">
        {ACCOUNT_FIELDS.map(({ key, label, type, placeholder, maxLength }, index) => (
          <div
            key={key}
            className={`flex items-center justify-between ${index > 0 ? 'border-t border-[#2a2a40] pt-4' : ''}`}
          >
            <span className="text-sm text-white">{label}</span>
            <input
              type={type}
              placeholder={placeholder}
              maxLength={maxLength}
              value={formValues[key]}
              onChange={(e) => updateField(key, e.target.value)}
              className="bg-[#1f1f33] border border-[#2a2a40] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500 transition-colors w-64"
            />
          </div>
        ))}
        <div className="flex justify-end gap-3 border-t border-[#2a2a40] pt-4">
          <button className="btn-ghost text-sm px-4 py-2">Cancel</button>
          <button className="btn-primary text-sm px-4 py-2">Submit Changes</button>
        </div>
      </div>
    </div>
  );
}
