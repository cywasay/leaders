"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import {
  ArrowLeft,
  User,
  Building2,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Plus,
  Loader2,
  Edit,
  Save,
  X,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Static Data
const CATEGORIES = [
  "healthcare",
  "tech",
  "business",
  "impact",
  "speaker",
  "research",
];

// Sub-components - Moved outside to prevent re-creation
const Section = React.memo(({ title, icon: Icon, children }) => (
  <div className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-xl mb-6">
    <div className="p-5 border-b border-white/5 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#3EC6EC]/10 flex items-center justify-center">
        <Icon size={20} className="text-[#3EC6EC]" />
      </div>
      <h3 className="font-bold text-white max-w-[calc(100%-3rem)]">{title}</h3>
    </div>
    <div className="p-5 space-y-4">{children}</div>
  </div>
));

Section.displayName = "Section";

const Field = React.memo(({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">
      {label}
    </p>
    <p className="text-white font-medium break-words">
      {value || <span className="text-gray-500">Not provided</span>}
    </p>
  </div>
));

Field.displayName = "Field";

const ArrayField = React.memo(({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-2">
      {label}
    </p>
    {Array.isArray(value) && value.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {value.map((item, idx) => (
          <Badge
            key={idx}
            className="bg-[#3EC6EC]/10 text-[#3EC6EC] border-none font-semibold"
          >
            {typeof item === "object"
              ? item.name || JSON.stringify(item)
              : item}
          </Badge>
        ))}
      </div>
    ) : (
      <span className="text-gray-500 text-sm">Not provided</span>
    )}
  </div>
));

ArrayField.displayName = "ArrayField";

const CustomerDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchCustomer = useCallback(async () => {
    try {
      const data = await apiRequest(`/admin/customers/${id}`);
      setCustomer(data.customer);
      setSelectedCategory(data.customer.category || "healthcare");
    } catch (error) {
      console.error("Failed to fetch customer:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchCustomer();
  }, [id, fetchCustomer]);

  const handleUpdateCategory = async () => {
    try {
      const response = await apiRequest(`/admin/customers/${id}`, {
        method: "PUT",
        body: { category: selectedCategory },
      });
      setCustomer(response.customer);
      setIsEditingCategory(false);
      toast({
        title: "Category Updated",
        description: "Customer category has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
    }
  };

  const handleCreateAccount = async () => {
    setIsCreatingAccount(true);
    try {
      const response = await apiRequest(
        `/admin/customers/${id}/create-account`,
        { method: "POST" },
      );
      toast({ title: "Account Created", description: response.message });
      fetchCustomer(); // Refresh data
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const onboarding = useMemo(() => customer?.user?.onboarding, [customer]);

  if (isLoading) {
    return (
      <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-700">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500">Customer not found.</p>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mt-4 border-white/10 text-gray-400"
        >
          <ArrowLeft size={16} className="mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="rounded-xl border-white/10 text-gray-400 hover:text-white bg-white/5"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {customer.name || customer.email}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase text-[10px]">
                {customer.category || "No Category"}
              </Badge>
              <span className="text-sm text-gray-400 font-medium">
                {customer.email}
              </span>
            </div>
          </div>
        </div>

        {!customer.user_id ? (
          <Button
            onClick={handleCreateAccount}
            className="bg-[#3EC6EC] hover:bg-[#3EC6EC]/80 text-black font-bold h-11 px-6 rounded-xl"
            disabled={isCreatingAccount}
          >
            {isCreatingAccount ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            {isCreatingAccount ? "Creating..." : "Create Account"}
          </Button>
        ) : (
          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 h-9 px-3">
            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Account Active
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Section title="Customer Information" icon={User}>
            <Field label="Full Name" value={customer.name} />
            <Field label="Email Address" value={customer.email} />
            <Field label="Phone Number" value={customer.phone} />
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">
                  Category
                </p>
                {!isEditingCategory ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingCategory(true)}
                    className="h-6 px-2 text-xs text-[#3EC6EC] hover:bg-[#3EC6EC]/10"
                  >
                    <Edit size={12} className="mr-1" /> Edit
                  </Button>
                ) : (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleUpdateCategory}
                      className="h-6 w-6 p-0 text-emerald-400 hover:bg-emerald-400/10"
                    >
                      <Save size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingCategory(false)}
                      className="h-6 w-6 p-0 text-red-400 hover:bg-red-400/10"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                )}
              </div>
              {isEditingCategory ? (
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="h-9 bg-black/20 border-white/10 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2D2D2D] border-white/10 text-white">
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat} className="capitalize">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-white font-medium capitalize">
                  {customer.category || (
                    <span className="text-gray-500">Not provided</span>
                  )}
                </p>
              )}
            </div>
            <Field label="Status" value={customer.status} />
          </Section>
        </div>

        <div className="lg:col-span-2">
          {onboarding ? (
            <div className="space-y-6">
              <Section title="Practice Information" icon={Building2}>
                <Field label="Practice Name" value={onboarding.practice_name} />
                <Field
                  label="Practitioner Name"
                  value={onboarding.practitioner_name}
                />
                <Field label="Credentials" value={onboarding.credentials} />
                <ArrayField
                  label="Specialties"
                  value={onboarding.specialties}
                />
              </Section>
              <Section title="Contact Details" icon={Mail}>
                <Field label="Phone" value={onboarding.contact_phone} />
                <Field label="Address" value={onboarding.address} />
              </Section>
              <Section title="Website Goals" icon={Calendar}>
                <ArrayField label="Goals" value={onboarding.website_goals} />
                <Field label="Booking URL" value={onboarding.booking_url} />
              </Section>
            </div>
          ) : (
            <div className="bg-[#2D2D2D] border border-white/5 rounded-2xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
              <FileText className="text-gray-500 mb-4" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">
                No Onboarding Data
              </h3>
              <p className="text-gray-400 max-w-sm mb-6">
                User hasn't started the onboarding process yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
