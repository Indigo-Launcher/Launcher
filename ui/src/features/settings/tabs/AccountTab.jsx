import { UserCircle } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../app/providers/AuthProvider';
import { useProfile } from '../../../app/providers/AppDataProvider';
import { ACCOUNT_FIELDS } from '../data/settingsConfig';

const INITIAL_FORM = {
  displayName: '',
  email: '',
  password: '',
};

export default function AccountTab() {
  const { logout, updateLocalProfile } = useAuth();
  const profile = useProfile();
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    setFormValues({
      displayName: profile.displayName,
      email: profile.email,
      password: '',
    });
  }, [profile.displayName, profile.email]);

  function updateField(field, value) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setSavedMessage('');
  }

  function resetForm() {
    setFormValues({
      displayName: profile.displayName,
      email: profile.email,
      password: '',
    });
    setSavedMessage('');
  }

  function saveLocalChanges() {
    // Account edits are local for now. The API doesn't have profile update routes yet.
    updateLocalProfile({
      displayName: formValues.displayName || profile.displayName,
      email: formValues.email,
    });
    setSavedMessage('Saved locally for this device');
  }

  return (
    <div>
      <h2 className="mb-1 text-[40px] font-bold leading-none text-white">Account</h2>
      <p className="mb-6 text-[14px] text-zinc-500">Manage your account</p>

      <div className="card mb-6 flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2a2a40] text-zinc-300">
            <UserCircle size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{profile.displayName}</p>
            <p className="text-sm text-zinc-500">@{profile.username}</p>
          </div>
        </div>
        <button onClick={logout} className="btn-danger px-4 py-2 text-xs">LOG OUT</button>
      </div>

      <h3 className="mb-3 text-sm font-semibold text-white">Personal Details</h3>
      <div className="card p-5">
        {ACCOUNT_FIELDS.map(({ key, label, type, placeholder, maxLength }, index) => (
          <div
            key={key}
            className={`flex items-center justify-between py-3 ${
              index < ACCOUNT_FIELDS.length - 1 ? 'border-b border-[#25253d]' : ''
            }`}
          >
            <span className="text-sm text-white">{label}</span>
            <input
              type={type}
              placeholder={placeholder}
              maxLength={maxLength}
              value={formValues[key]}
              disabled={key === 'password'}
              onChange={(e) => updateField(key, e.target.value)}
              className="w-72 rounded-lg border border-[#33324f] bg-[#18182b] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        ))}

        <p className="mt-4 text-xs text-zinc-500">
          Display name and email edits are saved locally in this build. Password changes are not available yet.
        </p>
        {savedMessage && <p className="mt-2 text-xs text-green-400">{savedMessage}</p>}

        <div className="mt-4 flex justify-end gap-3 border-t border-[#25253d] pt-4">
          <button onClick={resetForm} className="btn-ghost px-4 py-2 text-sm">Cancel</button>
          <button onClick={saveLocalChanges} className="btn-primary px-4 py-2 text-sm">
            Save Locally
          </button>
        </div>
      </div>
    </div>
  );
}
