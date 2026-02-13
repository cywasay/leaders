import React, { useState, useEffect } from "react";
import { User, Pencil, Check, X, Loader2, Calendar } from "lucide-react";
import { Section } from "./Shared";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const EditableField = ({ label, value, onSave, loading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || "");

  // Sync internal state with prop changes when not editing
  useEffect(() => {
    if (!isEditing) {
      setCurrentValue(value || "");
    }
  }, [value, isEditing]);

  const handleSave = async () => {
    // If no change, just exit edit mode
    if (currentValue === value) {
      setIsEditing(false);
      return;
    }

    // Save to DB
    const success = await onSave(currentValue);
    if (success) setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(value || "");
    setIsEditing(false);
  };

  return (
    <div className="group">
      <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">
        {label}
      </p>

      {loading ? (
        <div className="flex items-center gap-3 py-2">
          <div className="text-white font-medium opacity-50 bg-white/5 px-2 py-0.5 rounded animate-pulse">
            {currentValue || value}
          </div>
          <Loader2 size={14} className="animate-spin text-[#3EC6EC]" />
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
            Updating...
          </span>
        </div>
      ) : isEditing ? (
        <div className="flex items-center gap-2 mt-1">
          <Input
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="bg-black/20 border-white/10 text-white h-9 text-sm focus:ring-[#3EC6EC]/50"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
          />
          <button
            onClick={handleSave}
            className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors border border-emerald-500/20"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleCancel}
            className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors border border-rose-500/20"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between group/line h-9">
          <p className="text-white font-medium break-words">
            {value || (
              <span className="text-gray-500 font-normal italic">
                Not provided
              </span>
            )}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-white/5 rounded-md transition-all text-gray-400 hover:text-[#3EC6EC]"
          >
            <Pencil size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

const CustomerInfoList = ({ customer: initialCustomer, onUpdate }) => {
  const { toast } = useToast();

  // Local state for the customer to allow immediate UI updates
  const [customer, setCustomer] = useState(initialCustomer);
  const [savingField, setSavingField] = useState(null);

  // Keep local state in sync with parent prop (e.g., if refreshed externally)
  useEffect(() => {
    setCustomer(initialCustomer);
  }, [initialCustomer]);

  const handleUpdate = async (field, value) => {
    setSavingField(field);
    try {
      const response = await apiRequest(`/admin/customers/${customer.id}`, {
        method: "PUT",
        body: { [field]: value },
      });

      // 1. Immediately update local state with the returned customer data
      // This ensures the UI refreshes instantly without waiting for a full page reload
      if (response.customer) {
        setCustomer(response.customer);
      }

      toast({
        title: "Saved",
        description: `${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully.`,
      });

      // 2. Notify parent to refresh background data (purchases, header, etc.)
      if (onUpdate) onUpdate();

      return true;
    } catch (e) {
      toast({
        title: "Error",
        description: e.message || `Failed to update ${field}`,
        variant: "destructive",
      });
      return false;
    } finally {
      setSavingField(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <Section title="Customer Information" icon={User}>
        <div className="space-y-6">
          <EditableField
            label="Full Name"
            value={customer.name}
            onSave={(val) => handleUpdate("name", val)}
            loading={savingField === "name"}
          />
          <EditableField
            label="Email Address"
            value={customer.email}
            onSave={(val) => handleUpdate("email", val)}
            loading={savingField === "email"}
          />
          <EditableField
            label="Phone Number"
            value={customer.phone}
            onSave={(val) => handleUpdate("phone", val)}
            loading={savingField === "phone"}
          />

          <div className="pt-2 border-t border-white/5">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">
              Joined On
            </p>
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar size={14} className="text-gray-500" />
              <span className="text-sm font-medium">
                {formatDate(customer.created_at)}
              </span>
            </div>
          </div>
        </div>
      </Section>

      {!customer.category && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
          <h4 className="text-blue-400 font-bold mb-2">No Category Detected</h4>
          <p className="text-gray-400 text-sm">
            Content for this user defaults to standard until a category is
            assigned.
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerInfoList;
