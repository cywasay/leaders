import React from "react";
import { User } from "lucide-react";
import { Section, Field } from "./Shared";

const CustomerInfoList = ({ customer }) => {
  return (
    <div className="space-y-6">
      <Section title="Customer Information" icon={User}>
        <Field label="Full Name" value={customer.name} />
        <Field label="Email Address" value={customer.email} />
        <Field label="Phone Number" value={customer.phone} />
        <Field label="Status" value={customer.status} />
        <Field label="Stripe ID" value={customer.stripe_customer_id} />
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
