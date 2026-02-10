import React from "react";
import { ArrowLeft, CheckCircle2, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CustomerHeader = ({
  customer,
  onBack,
  onCreateAccount,
  isCreatingAccount,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onBack}
          className="rounded-xl border-white/10 text-gray-400 hover:text-white hover:bg-white/5 bg-white/5"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {customer.name || customer.email}
          </h1>
          <p className="text-sm text-gray-400 font-medium mt-1">
            {customer.email}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      {!customer.user_id ? (
        <Button
          onClick={onCreateAccount}
          className="bg-[#3EC6EC] hover:bg-[#3EC6EC]/80 text-black font-bold h-11 px-6 rounded-xl w-full sm:w-auto"
          disabled={isCreatingAccount}
        >
          {isCreatingAccount ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Create Account
            </>
          )}
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 h-9 px-3">
            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
            Account Active
          </Badge>
        </div>
      )}
    </div>
  );
};

export default CustomerHeader;
