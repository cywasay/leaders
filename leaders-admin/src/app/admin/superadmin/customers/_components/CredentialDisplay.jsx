import React from "react";
import { CheckCircle2 } from "lucide-react";

const CredentialDisplay = ({ credentials }) => {
  if (!credentials) return null;

  return (
    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 size={20} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="font-bold text-white">Account Credentials</h3>
          <p className="text-sm text-gray-400">
            Save these credentials - the password will not be shown again
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/20 rounded-xl p-4">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">
            Email
          </p>
          <p className="font-mono text-white select-all">{credentials.email}</p>
        </div>
        <div className="bg-black/20 rounded-xl p-4">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">
            Password
          </p>
          <p className="font-mono text-white select-all text-lg">
            {credentials.password}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CredentialDisplay;
