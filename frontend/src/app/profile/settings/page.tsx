"use client";

import Link from "next/link";
import {
  Lock,
  CheckCircle2,
  Plus,
  X,
  Upload,
  ArrowUpRight,
  Radio,
  Gift,
  ShoppingBag,
  ShieldCheck,
  Link2,
} from "lucide-react";
import {
  SettingsTab,
  useProfileSettingsViewModel,
} from "@/modules/profile/viewmodels/useProfileSettingsViewModel";

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
        checked ? "bg-[#c7f44a]" : "bg-[#2a2e29]"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full transition duration-200 ${
          checked ? "translate-x-5 bg-[#111311]" : "translate-x-0 bg-[#8d9689]"
        }`}
      />
    </button>
  );
}

export default function ProfileSettingsPage() {
  const vm = useProfileSettingsViewModel();

  if (vm.loading) {
    return (
      <div className="min-h-screen bg-[#0c0e0c] p-8 text-[#e7ece4]">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-10 w-64 rounded-lg bg-[#161916]" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="h-[620px] rounded-2xl bg-[#161916] lg:col-span-8" />
            <div className="h-[620px] rounded-2xl bg-[#161916] lg:col-span-4" />
          </div>
        </div>
      </div>
    );
  }

  const username = vm.sessionUser?.username || "user";
  const role = vm.sessionUser?.role?.toUpperCase() || "VIEWER";
  const isCreator = role === "CREATOR" || role === "ADMIN";

  return (
    <div className="min-h-screen bg-[#0c0e0c] px-6 py-8 text-[#e7ece4]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Profile settings
            </h1>
            <p className="mt-1 text-sm text-[#8d9689]">
              Your identity, your privacy, your next chapter on LeeMed.
            </p>
          </div>
          <span className="rounded-md border border-[#262b25] bg-[#171a17] px-3 py-1 text-xs font-semibold tracking-wider text-[#9ba397] uppercase">
            {role} ACCOUNT
          </span>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex items-center gap-6 border-b border-[#1f231e]">
          {(
            [
              { id: "general", label: "General Info" },
              { id: "security", label: "Security" },
              { id: "bank", label: "Bank Account" },
            ] as { id: SettingsTab; label: string }[]
          ).map((tab) => {
            const active = vm.activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => vm.setActiveTab(tab.id)}
                className={`border-b-2 pb-3 text-sm font-medium transition ${
                  active
                    ? "border-[#c7f44a] text-[#c7f44a]"
                    : "border-transparent text-[#8d9689] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Alerts */}
        {vm.errorMessage && (
          <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {vm.errorMessage}
          </div>
        )}
        {vm.successMessage && (
          <div className="mt-5 rounded-xl border border-[#c7f44a]/30 bg-[#c7f44a]/10 px-4 py-3 text-sm text-[#c7f44a]">
            {vm.successMessage}
          </div>
        )}

        {/* Main 2-column layout */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column (8 cols) */}
          <div className="space-y-6 lg:col-span-8">
            {vm.activeTab === "general" && (
              <>
                <section className="rounded-2xl border border-[#1f241e] bg-[#141714] p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">
                      Your profile
                    </h2>
                    <Link
                      href={`/creators/${username}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#c7f44a] hover:underline"
                    >
                      View public profile <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  {/* Avatar row */}
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <img
                      src={
                        vm.avatarUrl ||
                        `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`
                      }
                      alt="Avatar"
                      className="h-16 w-16 rounded-full border border-[#2b312a] bg-[#1d211c] object-cover"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            const nextUrl = window.prompt(
                              "Nhập URL ảnh đại diện (tối đa 500 ký tự):",
                              vm.avatarUrl
                            );
                            if (nextUrl !== null) vm.setAvatarUrl(nextUrl);
                          }}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#2b312a] bg-[#1c201b] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#242923]"
                        >
                          <Upload className="h-3.5 w-3.5" /> Change photo
                        </button>
                        <button
                          type="button"
                          onClick={() => vm.setAvatarUrl("")}
                          className="rounded-lg border border-[#2b312a] bg-[#1c201b] px-3.5 py-2 text-xs font-medium text-[#b5bdb2] hover:bg-[#242923]"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-[#6f776c]">
                        JPG, PNG or GIF · Maximum 5 MB · Recommended 400 × 400 px
                      </p>
                    </div>
                  </div>

                  {/* Display name & Username (Read-only từ session) */}
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#9ba397]">
                        Display name
                      </label>
                      <input
                        type="text"
                        maxLength={100}
                        value={vm.displayName}
                        onChange={(e) => vm.setDisplayName(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-[#242923] bg-[#0f110f] px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#c7f44a]"
                      />
                      <p className="mt-1.5 text-xs text-[#6f776c]">
                        The name your community sees.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9ba397]">
                        Username
                      </label>
                      <div className="mt-1.5 flex items-center justify-between rounded-xl border border-[#242923] bg-[#0f110f] px-3.5 py-2.5 text-sm text-[#c6cdc3]">
                        <span>{username}</span>
                        <Lock className="h-4 w-4 shrink-0 text-[#6f776c]" />
                      </div>
                      <p className="mt-1.5 text-xs text-[#6f776c]">
                        leemed.com/@{username} · Account handle
                      </p>
                    </div>
                  </div>

                  {/* Email & Phone (Read-only từ session) */}
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#9ba397]">
                        Email address
                      </label>
                      <div className="mt-1.5 flex items-center justify-between rounded-xl border border-[#242923] bg-[#0f110f] px-3.5 py-2.5 text-sm text-[#c6cdc3]">
                        <span className="truncate">
                          {vm.sessionUser?.email || "—"}
                        </span>
                        <Lock className="h-4 w-4 shrink-0 text-[#6f776c]" />
                      </div>
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-[#6f776c]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#c7f44a]" />
                        Verified · Only visible to you
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9ba397]">
                        Phone number
                      </label>
                      <div className="mt-1.5 flex items-center justify-between rounded-xl border border-[#242923] bg-[#0f110f] px-3.5 py-2.5 text-sm text-[#c6cdc3]">
                        <span>{vm.sessionUser?.phone || "Not linked"}</span>
                        <Lock className="h-4 w-4 shrink-0 text-[#6f776c]" />
                      </div>
                      <p className="mt-1.5 text-xs text-[#6f776c]">
                        Verified · Used for account recovery
                      </p>
                    </div>
                  </div>

                  {/* Bio (max 500 chars theo @Size(max = 500)) */}
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-[#9ba397]">
                      Bio
                    </label>
                    <textarea
                      rows={3}
                      maxLength={500}
                      value={vm.bio}
                      onChange={(e) => vm.setBio(e.target.value)}
                      placeholder="Tell your people a little about you..."
                      className="mt-1.5 w-full rounded-xl border border-[#242923] bg-[#0f110f] px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#c7f44a]"
                    />
                    <p className="mt-1 text-xs text-[#6f776c]">
                      Tell your people a little about you · {vm.bio.length} /
                      500 characters
                    </p>
                  </div>

                  {/* Social Links (khớp field socialLinks trong UpdateProfileRequest) */}
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-[#9ba397]">
                      Social links
                    </label>
                    <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-[#242923] bg-[#0f110f] px-3.5 py-2.5 focus-within:border-[#c7f44a]">
                      <Link2 className="h-4 w-4 shrink-0 text-[#6f776c]" />
                      <input
                        type="text"
                        value={vm.socialLinks}
                        onChange={(e) => vm.setSocialLinks(e.target.value)}
                        placeholder="https://youtube.com/@leechienthan, https://discord.gg/..."
                        className="w-full bg-transparent text-sm text-white outline-none"
                      />
                    </div>
                  </div>

                  {/* Country / Language / Time zone */}
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-medium text-[#9ba397]">
                        Country / region
                      </label>
                      <select
                        value={vm.country}
                        onChange={(e) => vm.setCountry(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-[#242923] bg-[#0f110f] px-3 py-2.5 text-sm text-white outline-none focus:border-[#c7f44a]"
                      >
                        <option value="Vietnam">Vietnam</option>
                        <option value="Singapore">Singapore</option>
                        <option value="United States">United States</option>
                        <option value="Japan">Japan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9ba397]">
                        Language
                      </label>
                      <select
                        value={vm.language}
                        onChange={(e) => vm.setLanguage(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-[#242923] bg-[#0f110f] px-3 py-2.5 text-sm text-white outline-none focus:border-[#c7f44a]"
                      >
                        <option value="English">English</option>
                        <option value="Vietnamese">Tiếng Việt</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#9ba397]">
                        Time zone
                      </label>
                      <select
                        value={vm.timezone}
                        onChange={(e) => vm.setTimezone(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-[#242923] bg-[#0f110f] px-3 py-2.5 text-sm text-white outline-none focus:border-[#c7f44a]"
                      >
                        <option value="UTC +07:00">UTC +07:00</option>
                        <option value="UTC +08:00">UTC +08:00</option>
                        <option value="UTC +00:00">UTC +00:00</option>
                      </select>
                    </div>
                  </div>

                  {/* Favorite games (gửi favoriteGameIds: number[]) */}
                  <div className="mt-5">
                    <label className="block text-xs font-medium text-[#9ba397]">
                      Favorite games
                    </label>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {vm.favoriteGames.map((game) => (
                        <span
                          key={game.id}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#3a4a24] bg-[#1e2616] px-2.5 py-1 text-xs font-medium text-[#c7f44a]"
                        >
                          {game.name}
                          <button
                            type="button"
                            onClick={() => vm.handleRemoveGame(game.id)}
                            className="hover:text-white"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}

                      {vm.selectingGame ? (
                        <select
                          defaultValue=""
                          onChange={(e) => {
                            const id = Number(e.target.value);
                            if (id) vm.handleAddGameById(id);
                          }}
                          onBlur={() => vm.setSelectingGame(false)}
                          autoFocus
                          className="rounded-lg border border-[#c7f44a] bg-[#0f110f] px-2.5 py-1 text-xs text-white outline-none"
                        >
                          <option value="" disabled>
                            {vm.unselectedGames.length > 0
                              ? "Chọn danh mục game..."
                              : "Đã chọn hết game"}
                          </option>
                          {vm.unselectedGames.map((g) => (
                            <option key={g.id} value={g.id}>
                              {g.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <button
                          type="button"
                          onClick={() => vm.setSelectingGame(true)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#2b312a] bg-[#1b1f1a] px-3 py-1.5 text-xs font-medium text-[#c6cdc3] hover:bg-[#242923]"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add game
                        </button>
                      )}
                    </div>
                  </div>
                </section>

                {/* Privacy & preferences */}
                <section className="rounded-2xl border border-[#1f241e] bg-[#141714] p-6">
                  <h2 className="text-lg font-semibold text-white">
                    Privacy & preferences
                  </h2>

                  <div className="mt-5 divide-y divide-[#1f241e]">
                    <div className="flex items-center justify-between gap-4 pb-4">
                      <div>
                        <p className="text-sm font-medium text-white">
                          Show my following list
                        </p>
                        <p className="text-xs text-[#7c8479]">
                          Let other players discover the creators you follow.
                        </p>
                      </div>
                      <ToggleSwitch
                        checked={vm.showFollowingList}
                        onChange={vm.setShowFollowingList}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">
                          Email me about creators I follow
                        </p>
                        <p className="text-xs text-[#7c8479]">
                          Stream reminders and the occasional community update.
                        </p>
                      </div>
                      <ToggleSwitch
                        checked={vm.emailCreatorUpdates}
                        onChange={vm.setEmailCreatorUpdates}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-4">
                      <div>
                        <p className="text-sm font-medium text-white">
                          Show my online status
                        </p>
                        <p className="text-xs text-[#7c8479]">
                          Let your friends know when you're around.
                        </p>
                      </div>
                      <ToggleSwitch
                        checked={vm.showOnlineStatus}
                        onChange={vm.setShowOnlineStatus}
                      />
                    </div>
                  </div>
                </section>

                {/* Bottom Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <p className="text-xs text-[#6f776c]">
                    Your private details never appear on your public profile.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={vm.handleCancel}
                      disabled={vm.saving}
                      className="rounded-xl border border-[#2b312a] bg-[#1a1e19] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#232822] disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={vm.handleSave}
                      disabled={vm.saving}
                      className="rounded-xl bg-[#c7f44a] px-5 py-2.5 text-xs font-bold text-[#101210] hover:bg-[#d4fa66] disabled:opacity-50"
                    >
                      {vm.saving ? "Saving..." : "Save changes"}
                    </button>
                  </div>
                </div>
              </>
            )}

            {vm.activeTab === "security" && (
              <section className="rounded-2xl border border-[#1f241e] bg-[#141714] p-6">
                <h2 className="text-lg font-semibold text-white">
                  Security & Login
                </h2>
                <p className="mt-1 text-sm text-[#8d9689]">
                  Quản lý mật khẩu, xác thực 2 bước (2FA) và các phiên đăng nhập.
                </p>
              </section>
            )}

            {vm.activeTab === "bank" && (
              <section className="rounded-2xl border border-[#1f241e] bg-[#141714] p-6">
                <h2 className="text-lg font-semibold text-white">
                  Bank Account & Payouts
                </h2>
                <p className="mt-1 text-sm text-[#8d9689]">
                  Tài khoản ngân hàng nhận doanh thu donate và affiliate của
                  Creator.
                </p>
              </section>
            )}
          </div>

          {/* Right Column (4 cols) */}
          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl border border-[#2e3a1f] bg-gradient-to-b from-[#1a2214] to-[#141714] p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#253118] text-[#c7f44a]">
                  <Radio className="h-5 w-5" />
                </div>
                <span className="rounded-md border border-[#3a4a24] bg-[#202916] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#c7f44a] uppercase">
                  {isCreator ? "CREATOR ACTIVE" : "YOUR NEXT CHAPTER"}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-white">
                {isCreator
                  ? "Creator Studio Unlocked"
                  : "Become a Content Creator"}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#9ba397]">
                Your games. Your stories. Your community. Turn what you love
                into something worth sharing.
              </p>

              <ul className="mt-4 space-y-2.5 text-xs text-[#d6ddd2]">
                <li className="flex items-center gap-2.5">
                  <Radio className="h-4 w-4 text-[#c7f44a]" />
                  Go live and build your channel
                </li>
                <li className="flex items-center gap-2.5">
                  <Gift className="h-4 w-4 text-[#c7f44a]" />
                  Receive gifts and earn from streams
                </li>
                <li className="flex items-center gap-2.5">
                  <ShoppingBag className="h-4 w-4 text-[#c7f44a]" />
                  Recommend gear with affiliate products
                </li>
              </ul>

              {!isCreator && (
                <>
                  <p className="mt-5 text-[11px] leading-relaxed text-[#7c8479]">
                    Before you apply: be 18+, verify your identity, and agree to
                    our Creator Guidelines.
                  </p>
                  <Link
                    href="/creator/apply"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#c7f44a] px-4 py-2.5 text-xs font-bold text-[#101210] hover:bg-[#d4fa66]"
                  >
                    <ArrowUpRight className="h-4 w-4" /> Register as Creator
                  </Link>
                  <p className="mt-2.5 text-[11px] text-[#6f776c]">
                    Next: creator details → identity check → review.
                    Applications usually take 2–3 business days.
                  </p>
                </>
              )}
            </div>

            <div className="rounded-2xl border border-[#1f241e] bg-[#141714] p-6">
              <h3 className="text-base font-semibold text-white">
                Account at a glance
              </h3>
              <dl className="mt-4 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <dt className="text-[#7c8479]">Account type</dt>
                  <dd className="font-semibold text-white">{role}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#7c8479]">Account ID</dt>
                  <dd className="font-semibold text-white">
                    #{vm.profile?.accountId ?? "—"}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#7c8479]">Email status</dt>
                  <dd className="font-semibold text-[#c7f44a]">Verified</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#7c8479]">Account standing</dt>
                  <dd className="font-semibold text-[#c7f44a]">
                    {vm.sessionUser?.status === "ACTIVE"
                      ? "Good standing"
                      : vm.sessionUser?.status || "Good standing"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-[#1f241e] bg-[#141714] p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Security</h3>
                <button
                  type="button"
                  onClick={() => vm.setActiveTab("security")}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#c7f44a] hover:underline"
                >
                  Manage <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-3.5 flex items-center gap-2 text-xs font-medium text-white">
                <ShieldCheck className="h-4 w-4 text-[#c7f44a]" />
                <span>Two-factor authentication is on</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#7c8479]">
                Recovery email and phone verified.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1f241e] bg-[#141714] p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">
                  Bank Account
                </h3>
                <button
                  type="button"
                  onClick={() => vm.setActiveTab("bank")}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#c7f44a] hover:underline"
                >
                  Manage <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-3 text-xs font-semibold text-white">
                No payout bank linked yet
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-[#7c8479]">
                Saved securely for future payouts. Creator approval is required
                to receive earnings.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}