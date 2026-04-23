import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useAuth";
import { useCoupon } from "@/hooks/useCoupon";
import {
  User,
  Package,
  LogOut,
  ChevronRight,
  Mail,
  Calendar,
} from "lucide-react";

const Profile = ({ user }: { user: any }) => {
  const { mutate, isPending } = useLogout();

  const { data } = useCoupon();

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row items-center gap-6 pb-12 !border-t-0 !border-x-0 ghost-border">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-signature-gradient p-[2px] glow-primary">
              <div className="w-full h-full rounded-full bg-surface-container-lowest flex items-center justify-center">
                <User size={48} className="text-primary" />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-tertiary rounded-full border-4 border-surface" />
          </div>

          <div className="text-center md:text-left space-y-2">
            <h1 className="text-display-lg font-display tracking-tightest">
              {user.name}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-on-surface-variant text-sm">
              <span className="flex items-center gap-1">
                <Mail size={14} /> {user.email}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> Joined{" "}
                {new Date(user.createdAt).toLocaleDateString("en")}
              </span>
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase">
              {user.role}
            </span>
          </div>
        </header>

        {/* --- Main Content Grid --- */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Navigation Sidebar */}
          <aside className="space-y-2">
            <Button className="w-full justify-between p-4 glass ghost-border rounded-lg text-primary hover-scale group">
              <span className="flex items-center gap-3">
                <Package size={20} /> My Orders
              </span>
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
            <Button
              className="w-full justify-between p-4 glass ghost-border rounded-lg text-secondary hover-scale group"
              disabled={isPending}
              onClick={() => mutate()}
            >
              <span className="flex items-center gap-3">
                <LogOut size={20} /> Logout
              </span>
            </Button>
          </aside>

          {/* Stats/Info Cards */}
          <section className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-surface-container-low ghost-border rounded-xl space-y-4">
              <h3 className="text-on-surface-variant text-sm uppercase tracking-widest">
                Total Spent
              </h3>
              <p className="text-3xl font-display">$2,450.00</p>
              <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-signature-gradient w-[70%]" />
              </div>
            </div>

            <div className="p-4 bg-surface-container-low ghost-border rounded-xl space-y-4">
              <h3 className="text-on-surface-variant text-sm uppercase tracking-widest">
                Reward Coupon
              </h3>
              {data ? (
                <>
                  <p className="text-3xl font-display text-tertiary">
                    {data?.code}
                  </p>
                  <p className="text-body-sm text-on-surface-variant">
                    This Coupon Will Gives You 20% discount.
                  </p>
                </>
              ) : (
                <p className="text-body-sm text-on-surface-variant">
                  You Don't have any Coupons Pay With $5000 or More To Get a New
                  Coupon
                </p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
