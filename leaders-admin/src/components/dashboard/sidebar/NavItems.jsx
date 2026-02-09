"use client";

import React from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  CheckCircle2,
  CreditCard,
  Settings,
  Receipt,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api";

const NavItems = ({ isCollapsed }) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const [purchasedForms, setPurchasedForms] = React.useState([]);

  React.useEffect(() => {
    if (user && user.role !== "superadmin") {
      const fetchForms = async () => {
        try {
          const res = await apiRequest("/onboarding/purchased-forms");
          setPurchasedForms(res.forms || []);
        } catch (error) {
          console.error("Sidebar fetch failed:", error);
        }
      };
      fetchForms();
    }
  }, [user]);

  const getDynamicItems = () => {
    if (user?.role === "superadmin") {
      return [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "/admin/superadmin/dashboard",
        },
        {
          label: "Customers",
          icon: Users,
          href: "/admin/superadmin/customers",
        },
        {
          label: "Payments",
          icon: CreditCard,
          href: "/admin/superadmin/payments",
        },
        {
          label: "Settings",
          icon: Settings,
          href: "/admin/superadmin/settings",
        },
      ];
    }

    const items = [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin/useradmin/dashboard",
      },
    ];

    // Add dynamic links for each purchase
    purchasedForms.forEach((form) => {
      items.push({
        label: form.item_name,
        icon: CheckCircle2,
        href: `/admin/useradmin/onboarding?charge_id=${form.charge_id}&category=${form.category}`,
      });
    });

    items.push({
      label: "Invoices",
      icon: Receipt,
      href: "/admin/useradmin/invoices",
    });

    return items;
  };

  const currentItems = getDynamicItems();

  const isActive = (href) => {
    const url = new URL(href, "http://localhost"); // Use dummy base for URL comparison
    const currentUrl = new URL(
      pathname + (window.location.search || ""),
      "http://localhost",
    );

    if (url.pathname === "/admin/useradmin/onboarding") {
      return (
        currentUrl.pathname === url.pathname &&
        currentUrl.searchParams.get("charge_id") ===
          url.searchParams.get("charge_id")
      );
    }

    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="flex-1 px-3 flex flex-col">
      {currentItems.map((item, idx) => (
        <Link
          key={item.href + idx}
          href={item.href}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 mb-1 group",
            isCollapsed && "justify-center",
            isActive(item.href)
              ? "bg-[#3EC6EC]/10 text-[#3EC6EC] font-bold"
              : "text-gray-400 font-medium hover:bg-white/5 hover:text-white",
          )}
        >
          <item.icon
            size={20}
            className={cn(
              "shrink-0",
              isActive(item.href)
                ? "text-[#3EC6EC]"
                : "group-hover:text-[#3EC6EC]",
            )}
          />
          {!isCollapsed && (
            <span className="truncate max-w-[180px]">{item.label}</span>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
