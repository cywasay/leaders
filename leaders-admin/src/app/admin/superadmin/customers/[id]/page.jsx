"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import {
  ArrowLeft,
  User,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Award,
  FileText,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Plus,
  Loader2,
  Edit,
  Save,
  X,
  CreditCard,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomerDetailPage = () => {
  /* Existing state */
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [customer, setCustomer] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState(null);

  /* New state for category editing */
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const CATEGORIES = [
    "healthcare",
    "tech",
    "business",
    "impact",
    "speaker",
    "research",
  ];

  /* Fetch logic remains mostly same ... */
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await apiRequest(`/admin/customers/${id}`);
        setCustomer(data.customer);
        setPurchases(data.purchases || []);
        setSelectedCategory(data.customer.category || "healthcare");
      } catch (error) {
        console.error("Failed to fetch customer:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchCustomer();
  }, [id]);

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
      // Store the generated credentials permanently
      setGeneratedCredentials({
        email: customer.email,
        password: response.password,
      });
      toast({
        title: "Account Created Successfully",
        description: response.message,
      });
      // Refresh customer data
      const data = await apiRequest(`/admin/customers/${id}`);
      setCustomer(data.customer);
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
          className="mt-4 border-white/10 text-gray-400 hover:text-white hover:bg-white/5"
        >
          <ArrowLeft size={16} className="mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const onboarding = customer.user?.onboarding;

  const Section = ({ title, icon: Icon, children }) => (
    <div className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-xl mb-6">
      <div className="p-5 border-b border-white/5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#3EC6EC]/10 flex items-center justify-center">
          <Icon size={20} className="text-[#3EC6EC]" />
        </div>
        <h3 className="font-bold text-white max-w-[calc(100%-3rem)]">
          {title}
        </h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );

  const Field = ({ label, value }) => (
    <div>
      <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">
        {label}
      </p>
      <p className="text-white font-medium break-words">
        {value || <span className="text-gray-500">Not provided</span>}
      </p>
    </div>
  );

  const ArrayField = ({ label, value }) => (
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
  );

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="rounded-xl border-white/10 text-gray-400 hover:text-white hover:bg-white/5 bg-white/5"
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

        {/* Action Buttons */}
        {!customer.user_id ? (
          <Button
            onClick={handleCreateAccount}
            className="bg-[#3EC6EC] hover:bg-[#3EC6EC]/80 text-black font-bold h-11 px-6 rounded-xl"
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

      {/* Generated Credentials Display */}
      {generatedCredentials && (
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
              <p className="font-mono text-white select-all">
                {generatedCredentials.email}
              </p>
            </div>
            <div className="bg-black/20 rounded-xl p-4">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">
                Password
              </p>
              <p className="font-mono text-white select-all text-lg">
                {generatedCredentials.password}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Customer Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <Section title="Customer Information" icon={User}>
            <Field label="Full Name" value={customer.name} />
            <Field label="Email Address" value={customer.email} />
            <Field label="Phone Number" value={customer.phone} />

            {/* Category Field with Edit Option */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">
                  Category
                </p>
                {!isEditingCategory ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(customer.category || "healthcare");
                      setIsEditingCategory(true);
                    }}
                    className="h-6 px-2 text-xs text-[#3EC6EC] hover:text-[#3EC6EC] hover:bg-[#3EC6EC]/10"
                  >
                    <Edit size={12} className="mr-1" /> Edit
                  </Button>
                ) : (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleUpdateCategory}
                      className="h-6 w-6 p-0 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10"
                    >
                      <Save size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingCategory(false)}
                      className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10"
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
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2D2D2D] border-white/10 text-white">
                    {CATEGORIES.map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat}
                        className="focus:bg-white/10 focus:text-white cursor-pointer capitalize"
                      >
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-white font-medium break-words capitalize">
                  {customer.category || (
                    <span className="text-gray-500">Not provided</span>
                  )}
                </p>
              )}
            </div>

            <Field label="Status" value={customer.status} />
            <Field label="Stripe ID" value={customer.stripe_customer_id} />
          </Section>

          {!customer.category && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
              <h4 className="text-blue-400 font-bold mb-2">
                No Category Detected
              </h4>
              <p className="text-gray-400 text-sm">
                The content for this user will default to standard untill a
                specific category is assigned. You can assign it manually above
                if needed.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Onboarding Data (Multiple Forms) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Purchase History Section */}
          <Section title="Purchase History" icon={ShoppingBag}>
            {purchases.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-white/5"
                  >
                    <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-black/20">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-white">
                          {purchase.currency} {purchase.amount}
                        </span>
                        <Badge
                          className={cn(
                            "h-5 px-1.5 text-[9px] font-bold uppercase",
                            purchase.status === "succeeded"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20",
                          )}
                        >
                          {purchase.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <span className="font-mono">
                          #{purchase.id.slice(-8)}
                        </span>
                        <span>•</span>
                        <span>{purchase.date}</span>
                      </div>
                    </div>
                    <div className="p-0">
                      {purchase.items?.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center px-4 py-2 text-xs text-gray-300 border-b border-white/5 last:border-0"
                        >
                          <div className="flex-1 truncate pr-2">
                            {item.description}
                          </div>
                          <div className="w-16 text-right font-medium text-white">
                            $
                            {parseFloat(item.amount || purchase.amount).toFixed(
                              2,
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No purchases found.</p>
            )}
          </Section>

          {/* Dynamic Onboarding Forms Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Onboarding Progress
                <Badge className="bg-white/5 text-[#3EC6EC] border-none ml-2">
                  {customer.user?.onboardings?.length || 0} /{" "}
                  {purchases
                    .filter((p) => p.status === "succeeded")
                    .reduce((acc, p) => acc + (p.items?.length || 0), 0)}{" "}
                  Complete
                </Badge>
              </h2>
            </div>

            {/* Merge Purchase ITEMS with Onboardings for granular tracking */}
            {purchases
              .filter((p) => p.status === "succeeded")
              .flatMap((purchase) =>
                (purchase.items || []).map((item) => ({
                  ...item,
                  purchaseDate: purchase.date,
                  purchaseId: purchase.id,
                })),
              )
              .map((item, index) => {
                const form = customer.user?.onboardings?.find(
                  (f) => f.stripe_charge_id === item.id,
                );
                const itemName = item.description || "Website Plan";

                return (
                  <div
                    key={`${item.id || item.purchaseId}-${index}`}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 px-2">
                      <div className="h-px bg-white/10 grow"></div>
                      <Badge
                        className={cn(
                          "uppercase text-[10px] font-bold py-1 border",
                          form
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20",
                        )}
                      >
                        {form
                          ? `Submitted: ${form.category}`
                          : "Pending Submission"}
                      </Badge>
                      <div className="h-px bg-white/10 grow"></div>
                    </div>

                    {form ? (
                      <div className="space-y-6">
                        <Section title={itemName} icon={Building2}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Field
                              label="Practice/Brand Name"
                              value={form.practice_name}
                            />
                            <Field
                              label="Practitioner Name"
                              value={form.practitioner_name}
                            />
                            <Field
                              label="Credentials"
                              value={form.credentials}
                            />
                            <Field
                              label="Experience"
                              value={form.years_experience}
                            />
                            <div className="md:col-span-2">
                              <ArrayField
                                label="Specialties / Focus Areas"
                                value={form.specialties}
                              />
                            </div>
                            <Field
                              label="Primary Email"
                              value={form.primary_email}
                            />
                            <Field label="Phone" value={form.contact_phone} />
                          </div>
                        </Section>
                        <Section title={`${itemName} Strategy`} icon={FileText}>
                          <div className="space-y-6">
                            <Field
                              label="Ideal Audience"
                              value={form.ideal_audience}
                            />
                            <Field
                              label="Client Problem"
                              value={form.patient_problem}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <ArrayField
                                label="Website Goals"
                                value={form.website_goals}
                              />
                              <Field
                                label="Booking URL"
                                value={form.booking_url}
                              />
                            </div>
                          </div>
                        </Section>
                      </div>
                    ) : (
                      <div className="bg-[#2D2D2D]/50 border border-white/5 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                          <Loader2
                            className="text-gray-600 animate-pulse"
                            size={24}
                          />
                        </div>
                        <h4 className="text-white font-bold">{itemName}</h4>
                        <p className="text-gray-500 text-xs mt-1">
                          Purchased on {item.purchaseDate}. Waiting for customer
                          to provide details.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

            {purchases.filter((p) => p.status === "succeeded").length === 0 && (
              <div className="bg-[#2D2D2D] border border-white/5 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <ShoppingBag className="text-gray-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">
                  No Successful Purchases
                </h3>
                <p className="text-gray-500 max-w-sm">
                  This user has no succeeded payments to generate onboarding
                  forms.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
