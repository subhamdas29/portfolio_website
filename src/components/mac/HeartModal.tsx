import React, { useState } from 'react';
import { X, Terminal as TerminalIcon, Heart } from 'lucide-react';

interface HeartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignupSubmit: (data: { name: string; occupation?: string; email: string; password: string }) => Promise<void>;
  onLoginSubmit: (data: { email: string; password: string }) => Promise<void>;
}

export const HeartModal: React.FC<HeartModalProps> = ({
  isOpen,
  onClose,
  onSignupSubmit,
  onLoginSubmit,
}) => {
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setOccupation('');
    setEmail('');
    setPassword('');
    setErrorMsg('');
  };

  const handleSwitchMode = (newMode: 'signup' | 'login') => {
    setMode(newMode);
    resetForm();
  };

  const validateName = (val: string) => {
    if (!val.trim()) return 'Name is required.';
    if (!/^[A-Za-z\s]+$/.test(val.trim())) {
      return 'No numbers or special characters allowed in name.';
    }
    return '';
  };

  const validateEmail = (val: string) => {
    if (!val.trim()) return 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(val.trim())) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const validatePassword = (val: string) => {
    if (!val || val.length < 4) return 'Password must be at least 4 characters long.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'signup') {
      const nameErr = validateName(name);
      if (nameErr) { setErrorMsg(nameErr); return; }

      const emailErr = validateEmail(email);
      if (emailErr) { setErrorMsg(emailErr); return; }

      const passErr = validatePassword(password);
      if (passErr) { setErrorMsg(passErr); return; }

      setIsSubmitting(true);
      try {
        await onSignupSubmit({ name, occupation, email, password });
        resetForm();
        onClose();
      } catch (err: any) {
        setErrorMsg(err.message || 'Signup failed. Email might already exist.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Login Mode
      const emailErr = validateEmail(email);
      if (emailErr) { setErrorMsg(emailErr); return; }

      const passErr = validatePassword(password);
      if (passErr) { setErrorMsg(passErr); return; }

      setIsSubmitting(true);
      try {
        await onLoginSubmit({ email, password });
        resetForm();
        onClose();
      } catch (err: any) {
        setErrorMsg(err.message || 'Invalid email or password.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm select-none font-mono">
      {/* Terminal Window Box */}
      <div className="w-full max-w-lg bg-[#1A1A1A] border border-white/20 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Terminal Window Header Bar */}
        <div className="h-9 bg-[#242424] border-b border-white/10 flex items-center justify-between px-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-mac-red flex items-center justify-center hover:opacity-80 transition-opacity"
              title="Close"
            >
              <X size={8} className="text-black font-bold opacity-0 hover:opacity-100" />
            </button>
            <div className="w-3 h-3 rounded-full bg-mac-yellow" />
            <div className="w-3 h-3 rounded-full bg-mac-green" />
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-stone-300 font-semibold">
            <TerminalIcon className="w-3.5 h-3.5 text-terminal-green" />
            <span>subhamdas:~$ {mode === 'signup' ? 'like-signup' : 'like-login'}</span>
          </div>

          <div className="flex items-center space-x-1 text-[11px]">
            <button
              type="button"
              onClick={() => handleSwitchMode('signup')}
              className={`px-2 py-0.5 rounded transition-colors ${
                mode === 'signup'
                  ? 'bg-terminal-green text-black font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => handleSwitchMode('login')}
              className={`px-2 py-0.5 rounded transition-colors ${
                mode === 'login'
                  ? 'bg-terminal-green text-black font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Login
            </button>
          </div>
        </div>

        {/* Terminal Body Content */}
        <div className="p-5 text-xs space-y-4 bg-[#1A1A1A] text-stone-200">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' ? (
              <>
                {/* Name */}
                <div>
                  <label className="text-terminal-green font-bold block mb-1">
                    name:~$
                  </label>
                  <input
                    type="text"
                    autoFocus
                    placeholder="e.g. Subham Das"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-[#242424] border border-white/15 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-terminal-green font-mono"
                  />
                  <p className="text-[10px] text-stone-400 mt-0.5">
                    Letters and spaces only. No numbers or special characters.
                  </p>
                </div>

                {/* Occupation */}
                <div>
                  <label className="text-terminal-green font-bold block mb-1">
                    occupation:~$ <span className="text-stone-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Student / Full-Stack Developer"
                    value={occupation}
                    onChange={e => setOccupation(e.target.value)}
                    className="w-full bg-[#242424] border border-white/15 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-terminal-green font-mono"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-terminal-green font-bold block mb-1">
                    email:~$
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. subham@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#242424] border border-white/15 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-terminal-green font-mono"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="text-terminal-green font-bold block mb-1">
                    password:~$
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-[#242424] border border-white/15 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-terminal-green font-mono"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Login Email */}
                <div>
                  <label className="text-terminal-green font-bold block mb-1">
                    email:~$
                  </label>
                  <input
                    type="email"
                    autoFocus
                    placeholder="e.g. subham@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#242424] border border-white/15 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-terminal-green font-mono"
                  />
                </div>

                {/* Login Password */}
                <div>
                  <label className="text-terminal-green font-bold block mb-1">
                    password:~$
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-[#242424] border border-white/15 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-terminal-green font-mono"
                  />
                </div>
              </>
            )}

            {/* Error Output Message */}
            {errorMsg && (
              <div className="text-red-400 font-mono text-[11px] bg-red-950/40 border border-red-800/60 p-2 rounded">
                [ERROR]: {errorMsg}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={onClose}
                className="text-stone-400 hover:text-white text-xs"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-terminal-green text-black font-bold px-4 py-2 rounded flex items-center space-x-1.5 hover:bg-emerald-400 transition-colors text-xs disabled:opacity-50 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-black" />
                <span>{isSubmitting ? 'Processing...' : (mode === 'signup' ? 'Sign Up & Heart ❤️' : 'Login & Heart ❤️')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
