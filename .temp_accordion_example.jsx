// This is the accordion format for one form entry
// To be integrated into the customer detail page

{
  form ? (
    <div className="bg-[#2D2D2D] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
      {/* Accordion Header - Clickable Bar */}
      <button
        onClick={() =>
          setExpandedFormId(expandedFormId === item.id ? null : item.id)
        }
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#3EC6EC]/10 flex items-center justify-center">
            <FileText size={20} className="text-[#3EC6EC]" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-white">{itemName}</h3>
            <p className="text-xs text-gray-400">
              Purchased on {item.purchaseDate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            className={cn(
              "uppercase text-[10px] font-bold py-1 border",
              "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            )}
          >
            Submitted: {form.category}
          </Badge>
          <ChevronDown
            size={20}
            className={cn(
              "text-gray-400 transition-transform",
              expandedFormId === item.id && "rotate-180",
            )}
          />
        </div>
      </button>

      {/* Accordion Content - Shows when expanded */}
      {expandedFormId === item.id && (
        <div className="border-t border-white/5 p-6 space-y-8 animate-in fade-in duration-300">
          {/* All sections inline - no separate Section cards */}

          {/* Basic Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[#3EC6EC] uppercase tracking-wider flex items-center gap-2">
              <Building2 size={16} /> Basic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Practice/Brand Name" value={form.practice_name} />
              <Field label="Practitioner Name" value={form.practitioner_name} />
              {/* ... all other fields */}
            </div>
          </div>

          <Separator className="bg-white/10" />

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[#3EC6EC] uppercase tracking-wider flex items-center gap-2">
              <Mail size={16} /> Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Primary Email" value={form.primary_email} />
              {/* ... */}
            </div>
          </div>

          {/* Continue with all other sections... */}
        </div>
      )}
    </div>
  ) : (
    // Empty state - waiting for submission
    <div className="bg-[#2D2D2D]/50 border border-white/5 border-dashed rounded-2xl p-8">
      <p>Waiting for customer to provide details...</p>
    </div>
  );
}
