"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, FileText, User, MapPin, Briefcase } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { cn } from "@/lib/utils";

const OnboardingSubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest("/onboarding/all");
      setSubmissions(data.onboardings || []);
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetail = (submission) => {
    setSelectedSubmission(submission);
    setIsDetailOpen(true);
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-10 space-y-8 animate-in fade-in duration-700">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>

        <div className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex items-center p-4 border-b border-white/5 gap-4"
              >
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48 bg-white/5" />
                  <Skeleton className="h-3 w-32 bg-white/5" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full bg-white/5" />
                <Skeleton className="h-4 w-24 bg-white/5" />
                <Skeleton className="h-8 w-24 rounded-lg bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-outfit">
          Onboarding Submissions
        </h1>
        <Button
          onClick={fetchSubmissions}
          variant="outline"
          className="text-[10px] sm:text-xs border-gray-200 h-8 sm:h-9"
        >
          Refresh Data
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="font-bold text-[10px] sm:text-xs">
                Practitioner
              </TableHead>
              <TableHead className="font-bold text-[10px] sm:text-xs hidden md:table-cell">
                Practice Name
              </TableHead>
              <TableHead className="font-bold text-[10px] sm:text-xs hidden sm:table-cell">
                Email
              </TableHead>
              <TableHead className="font-bold text-[10px] sm:text-xs">
                Step
              </TableHead>
              <TableHead className="font-bold text-[10px] sm:text-xs hidden lg:table-cell">
                Date Submitted
              </TableHead>
              <TableHead className="text-right font-bold text-[10px] sm:text-xs pr-4 sm:pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((sub) => (
              <TableRow
                key={sub.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <TableCell className="font-medium text-xs sm:text-sm">
                  {sub.practitioner_name || sub.user?.name || "N/A"}
                </TableCell>
                <TableCell className="text-xs sm:text-sm hidden md:table-cell">
                  {sub.practice_name || "N/A"}
                </TableCell>
                <TableCell className="text-xs sm:text-sm hidden sm:table-cell">
                  {sub.primary_email || sub.user?.email || "N/A"}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider",
                      sub.current_step === 3
                        ? "bg-green-100 text-green-700"
                        : "bg-[#3EC6EC]/10 text-[#3EC6EC]",
                    )}
                  >
                    S{sub.current_step}
                  </span>
                </TableCell>
                <TableCell className="text-gray-500 text-[10px] sm:text-xs hidden lg:table-cell">
                  {new Date(sub.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right pr-4 sm:pr-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetail(sub)}
                    className="text-[#3EC6EC] hover:text-[#3EC6EC] hover:bg-[#3EC6EC]/10 h-8 text-[10px] sm:text-xs"
                  >
                    <Eye size={14} className="sm:size-4 sm:mr-2" />
                    <span className="hidden xs:inline">View Detail</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {submissions.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-gray-400"
                >
                  No submissions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-outfit">
              Submission Details
            </DialogTitle>
            <DialogDescription>
              Full onboarding application for{" "}
              {selectedSubmission?.practitioner_name}
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-8 py-4 px-1">
              {/* Section 1: Foundation */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 border-b pb-2">
                  <User size={18} className="text-[#3EC6EC]" />
                  Foundation & Practice
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DetailItem
                    label="Practice Name"
                    value={selectedSubmission.practice_name}
                  />
                  <DetailItem
                    label="Practitioner"
                    value={selectedSubmission.practitioner_name}
                  />
                  <DetailItem
                    label="Credentials"
                    value={selectedSubmission.credentials}
                  />
                  <DetailItem
                    label="Practice Type"
                    value={selectedSubmission.practice_type}
                  />
                  <DetailItem
                    label="Experience"
                    value={selectedSubmission.years_experience}
                  />
                  <DetailItem
                    label="Email"
                    value={selectedSubmission.primary_email}
                  />
                  <DetailItem
                    label="Phone"
                    value={selectedSubmission.contact_phone}
                  />
                  <DetailItem
                    label="Timezone"
                    value={selectedSubmission.timezone}
                  />
                  <DetailItem
                    label="Ideal Audience"
                    value={selectedSubmission.ideal_audience?.join(", ")}
                  />
                </div>
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Main Problem
                  </p>
                  <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    {selectedSubmission.patient_problem ||
                      "No problem described."}
                  </p>
                </div>
              </div>

              {/* Section 2: Authority */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 border-b pb-2">
                  <Briefcase size={18} className="text-[#3EC6EC]" />
                  Authority & Brand
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailItem
                    label="Bio"
                    value={selectedSubmission.short_bio}
                    full
                  />
                  <DetailItem
                    label="Full Story"
                    value={selectedSubmission.full_story}
                    full
                  />
                  <DetailItem
                    label="Brand Tone"
                    value={selectedSubmission.brand_tone}
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Services Offered
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedSubmission.services?.map((s, i) => (
                      <div
                        key={i}
                        className="p-3 bg-[#3EC6EC]/5 border border-[#3EC6EC]/10 rounded-xl"
                      >
                        <p className="font-bold text-sm text-[#3EC6EC]">
                          {s.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{s.for}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3: Final */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 border-b pb-2">
                  <FileText size={18} className="text-[#3EC6EC]" />
                  Website & Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DetailItem
                    label="Website Goals"
                    value={selectedSubmission.website_goals?.join(", ")}
                  />
                  <DetailItem
                    label="Pages Needed"
                    value={selectedSubmission.required_pages?.join(", ")}
                  />
                  <DetailItem
                    label="Booking URL"
                    value={selectedSubmission.booking_url}
                  />
                  <DetailItem
                    label="Portal URL"
                    value={selectedSubmission.patient_portal_url}
                  />
                  <DetailItem
                    label="HIPAA Compliant?"
                    value={selectedSubmission.hipaa_compliant ? "Yes" : "No"}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const DetailItem = ({ label, value, full = false }) => (
  <div className={cn("space-y-1", full ? "col-span-full" : "")}>
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
      {label}
    </p>
    <p className="text-sm text-gray-700 font-medium">{value || "—"}</p>
  </div>
);

export default OnboardingSubmissionsPage;
