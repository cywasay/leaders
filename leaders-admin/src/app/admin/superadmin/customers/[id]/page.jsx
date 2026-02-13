"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

// Modular Components
import CustomerHeader from "../_components/CustomerHeader";
import CredentialDisplay from "../_components/CredentialDisplay";
import CustomerInfoList from "../_components/CustomerInfoList";
import PurchaseHistory from "../_components/PurchaseHistory";
import OnboardingAccordions from "../_components/OnboardingAccordions";
import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useState({
    customer: null,
    purchases: [],
    loading: true,
  });
  const [ui, setUi] = useState({ creatingAccount: false, credentials: null });

  const fetchData = useCallback(async () => {
    try {
      const resp = await apiRequest(`/admin/customers/${id}`);
      setData({
        customer: resp.customer,
        purchases: resp.purchases || [],
        loading: false,
      });
    } catch (e) {
      console.error(e);
      setData((d) => ({ ...d, loading: false }));
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchData();
  }, [id, fetchData]);

  const handleCreateAccount = async () => {
    setUi((u) => ({ ...u, creatingAccount: true }));
    try {
      const resp = await apiRequest(`/admin/customers/${id}/create-account`, {
        method: "POST",
      });
      setUi((u) => ({
        ...u,
        credentials: { email: data.customer.email, password: resp.password },
        creatingAccount: false,
      }));
      fetchData();
    } catch (e) {
      setUi((u) => ({ ...u, creatingAccount: false }));
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  if (data.loading)
    return (
      <div className="p-10 space-y-8">
        <Skeleton className="h-10 w-1/4" />
        <div className="grid grid-cols-3 gap-8">
          <Skeleton className="h-96" />
          <Skeleton className="h-96 col-span-2" />
        </div>
      </div>
    );
  if (!data.customer)
    return (
      <div className="p-10 text-center text-gray-400">Customer not found.</div>
    );

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-500">
      <CustomerHeader
        customer={data.customer}
        onBack={() => router.back()}
        onCreateAccount={handleCreateAccount}
        isCreatingAccount={ui.creatingAccount}
      />
      <CredentialDisplay credentials={ui.credentials} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CustomerInfoList customer={data.customer} onUpdate={fetchData} />
        <div className="lg:col-span-2 space-y-8">
          <PurchaseHistory purchases={data.purchases} />
          <OnboardingAccordions
            customer={data.customer}
            purchases={data.purchases}
          />
        </div>
      </div>
    </div>
  );
}
