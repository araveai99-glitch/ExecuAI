import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "./Search";
import { IconButton } from "./IconButton";
import { Avatar } from "./Avatar";
import { useUserData, ProviderFilterType } from "@/lib/user-data-context";

export interface HeaderProps {
  onSearch?: (query: string) => void;
  userName?: string;
  syncedCount?: number;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  userName = "Executive",
  syncedCount,
  className,
}) => {
  const {
    connectedAccounts,
    selectedAccountFilter,
    setSelectedAccountFilter,
    selectedProviderFilter,
    setSelectedProviderFilter,
    addAccount,
    counts,
    setSearchQuery,
  } = useUserData();

  const [searchValue, setSearchValue] = React.useState("");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = React.useState(false);
  const [newAccountProvider, setNewAccountProvider] = React.useState<string>("Gmail");
  const [newAccountEmail, setNewAccountEmail] = React.useState<string>("");
  const [addSuccessMessage, setAddSuccessMessage] = React.useState<string | null>(null);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (val: string) => {
    setSearchValue(val);
    setSearchQuery(val);
    onSearch?.(val);
  };

  const handleAddAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountEmail.trim()) return;

    addAccount(newAccountProvider, newAccountEmail.trim());
    setAddSuccessMessage(`Connected ${newAccountProvider} account: ${newAccountEmail}`);
    setTimeout(() => {
      setAddSuccessMessage(null);
      setIsAddAccountModalOpen(false);
      setNewAccountEmail("");
    }, 1200);
  };

  const activeLabel =
    selectedAccountFilter !== "ALL"
      ? selectedAccountFilter
      : selectedProviderFilter !== "ALL"
      ? `${selectedProviderFilter} Mailboxes`
      : "All Accounts";

  const totalSynced = syncedCount !== undefined ? syncedCount : counts.syncedMailboxes;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white/95 backdrop-blur-xl z-40 border-b border-[#E2E8F0] shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-4 sm:px-6 flex items-center justify-between gap-3",
          className
        )}
      >
        {/* Left: Search Box */}
        <div className="flex items-center gap-4 flex-1 max-w-md xl:max-w-xl">
          <Search
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search emails, topics, accounts..."
          />
        </div>

        {/* Right: Account Switcher, Add Account & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Account Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl text-xs font-semibold text-[#0F172A] transition-all cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px] text-[#F15E1C]">
                mail
              </span>
              <span className="max-w-[120px] sm:max-w-[180px] truncate">{activeLabel}</span>
              <span className="material-symbols-outlined text-[16px] text-[#64748B]">
                arrow_drop_down
              </span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase">
                  Select Scope
                </div>

                {/* All Accounts option */}
                <button
                  onClick={() => {
                    setSelectedAccountFilter("ALL");
                    setSelectedProviderFilter("ALL");
                    setIsDropdownOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer",
                    selectedAccountFilter === "ALL" && selectedProviderFilter === "ALL"
                      ? "bg-[#FFF2EC] text-[#F15E1C]"
                      : "hover:bg-[#F8FAFC] text-[#334155]"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">apps</span>
                    All Accounts
                  </span>
                  {selectedAccountFilter === "ALL" && selectedProviderFilter === "ALL" && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>

                {/* Provider Filters */}
                <div className="my-1 border-t border-[#F1F5F9]" />
                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase">
                  Filter By Provider
                </div>
                {(["GMAIL", "ZOHO", "OUTLOOK", "OTHER"] as ProviderFilterType[]).map((prov) => (
                  <button
                    key={prov}
                    onClick={() => {
                      setSelectedAccountFilter("ALL");
                      setSelectedProviderFilter(prov);
                      setIsDropdownOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer",
                      selectedProviderFilter === prov && selectedAccountFilter === "ALL"
                        ? "bg-[#FFF2EC] text-[#F15E1C] font-semibold"
                        : "hover:bg-[#F8FAFC] text-[#475569]"
                    )}
                  >
                    <span>{prov === "GMAIL" ? "Gmail Accounts" : prov === "ZOHO" ? "Zoho Accounts" : prov === "OUTLOOK" ? "Outlook Accounts" : "Other Mailboxes"}</span>
                    {selectedProviderFilter === prov && selectedAccountFilter === "ALL" && (
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    )}
                  </button>
                ))}

                {/* Connected Individual Accounts */}
                {connectedAccounts.length > 0 && (
                  <>
                    <div className="my-1 border-t border-[#F1F5F9]" />
                    <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase">
                      Specific Connected Accounts
                    </div>
                    {connectedAccounts.map((acc) => (
                      <button
                        key={acc.email}
                        onClick={() => {
                          setSelectedAccountFilter(acc.email);
                          setIsDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer",
                          selectedAccountFilter.toLowerCase() === acc.email.toLowerCase()
                            ? "bg-[#FFF2EC] text-[#F15E1C] font-semibold"
                            : "hover:bg-[#F8FAFC] text-[#334155]"
                        )}
                      >
                        <div className="flex flex-col min-w-0 pr-2">
                          <span className="truncate text-xs font-semibold">{acc.email}</span>
                          <span className="text-[10px] text-[#94A3B8] capitalize">{acc.provider}</span>
                        </div>
                        {selectedAccountFilter.toLowerCase() === acc.email.toLowerCase() && (
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        )}
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          {/* + Add Account Button */}
          <button
            onClick={() => setIsAddAccountModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F15E1C] hover:bg-[#D94E10] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span className="hidden sm:inline">+ Add Account</span>
          </button>

          {/* Mailbox Sync Counter */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F4F0] border border-[#2E936F]/30">
            <span className="w-2 h-2 rounded-full bg-[#2E936F] animate-pulse" />
            <span className="text-xs font-semibold text-[#2E936F]">
              {totalSynced} {totalSynced === 1 ? "Mailbox Synced" : "Mailboxes Synced"}
            </span>
          </div>

          {/* Action Icons */}
          <div className="hidden sm:flex items-center gap-1">
            <IconButton
              variant="ghost"
              size="sm"
              ariaLabel="Notifications"
              icon={<span className="material-symbols-outlined text-[20px]">notifications</span>}
            />
            <IconButton
              variant="ghost"
              size="sm"
              ariaLabel="Security & Governance"
              icon={<span className="material-symbols-outlined text-[20px]">shield_locked</span>}
            />
          </div>

          {/* Profile Avatar */}
          <div className="pl-1 border-l border-[#E2E8F0]">
            <Avatar name={userName} size="sm" status="online" />
          </div>
        </div>
      </header>

      {/* Add Account Provider Authentication Modal */}
      {isAddAccountModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E2E8F0] animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF2EC] text-[#F15E1C] flex items-center justify-center">
                  <span className="material-symbols-outlined">mark_email_read</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">Connect Mailbox</h3>
                  <p className="text-xs text-[#64748B]">Add another email account to this dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddAccountModalOpen(false)}
                className="text-[#94A3B8] hover:text-[#0F172A] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {addSuccessMessage ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-2xl">check_circle</span>
                </div>
                <p className="text-sm font-bold text-emerald-800">{addSuccessMessage}</p>
                <p className="text-xs text-emerald-600 mt-1">Updating dashboard email feeds...</p>
              </div>
            ) : (
              <form onSubmit={handleAddAccountSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-2">
                    Select Provider
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "Gmail", icon: "mail", color: "border-red-200 text-red-600 bg-red-50/50" },
                      { name: "Zoho", icon: "business", color: "border-blue-200 text-blue-600 bg-blue-50/50" },
                      { name: "Outlook", icon: "mark_email_unread", color: "border-sky-200 text-sky-600 bg-sky-50/50" },
                      { name: "Other", icon: "alternate_email", color: "border-slate-200 text-slate-600 bg-slate-50/50" },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.name}
                        onClick={() => setNewAccountProvider(item.name)}
                        className={cn(
                          "p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer",
                          newAccountProvider === item.name
                            ? "border-[#F15E1C] bg-[#FFF2EC] ring-2 ring-[#F15E1C]/20"
                            : "border-[#E2E8F0] hover:bg-[#F8FAFC]"
                        )}
                      >
                        <span className="material-symbols-outlined text-lg">{item.icon}</span>
                        <span className="text-xs font-bold text-[#0F172A]">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#475569] uppercase tracking-wider mb-1.5">
                    Account Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={`user@${newAccountProvider.toLowerCase() === "zoho" ? "company.com" : newAccountProvider.toLowerCase() === "outlook" ? "outlook.com" : "gmail.com"}`}
                    value={newAccountEmail}
                    onChange={(e) => setNewAccountEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#F15E1C] focus:ring-2 focus:ring-[#F15E1C]/20 text-xs text-[#0F172A] outline-none"
                  />
                  <p className="text-[11px] text-[#64748B] mt-1">
                    Connects securely via OAuth 2.0 with Zero Model Training protection.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setIsAddAccountModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#F15E1C] hover:bg-[#D94E10] text-white transition-all cursor-pointer shadow-xs"
                  >
                    Authenticate & Connect
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};


