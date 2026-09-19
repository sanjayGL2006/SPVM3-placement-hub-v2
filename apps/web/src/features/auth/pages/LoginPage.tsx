import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Lock, Mail, Eye, EyeOff, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../../../shared/components/ui/Button';
import { ThemeToggle } from '../../../shared/components/ThemeToggle';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);

      if (res.success) {
        toast.success('Signed in successfully!');
        const from = (location.state as any)?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        toast.error(res.error || 'Authentication failed. Please check your credentials.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FAFAF9] dark:bg-[#0F0F0F] text-stone-900 dark:text-stone-50 transition-colors">
      {/* Top right theme toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Left 55% - Pinterest Academic Visual Showcase */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-12 text-white flex-col justify-between">
        {/* Background decorative glowing orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Placement Pro
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                2026 SaaS
              </span>
            </h1>
            <p className="text-xs text-indigo-100/80 font-medium">
              Enterprise AI Academic & Placement Management
            </p>
          </div>
        </div>

        {/* Hero Showcase Content */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-100">
            <Sparkles className="w-4 h-4 text-amber-300" />
            AI-Native Career & Campus Ecosystem
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
            Empowering modern universities with intelligent placement pipelines.
          </h2>

          <p className="text-sm text-indigo-100/90 leading-relaxed">
            Real-time analytics, automated ATS resume scoring, multi-round drive trackers, and strict role-based data governance for college leadership and students.
          </p>

          {/* Floating Feature Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl font-bold">62.4%</div>
              <div className="text-xs text-indigo-100/80 mt-0.5">Average 2026 Placement Rate</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl font-bold">₹24.0 LPA</div>
              <div className="text-xs text-indigo-100/80 mt-0.5">Highest Package Offered</div>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="relative z-10 text-xs text-indigo-200/70 flex items-center justify-between border-t border-white/10 pt-6">
          <span>Trusted by Premier Universities & Tier-1 Institutions</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" /> WCAG 2.1 AA & RBAC Secured
          </span>
        </div>
      </div>

      {/* Right 45% - Login Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-10 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Brand Title */}
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">Placement Pro</h2>
              <p className="text-xs text-stone-500">Sign in to your account</p>
            </div>
          </div>

          <div className="space-y-1 text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50">
              Welcome back
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Enter your institutional credentials to access your placement dashboard.
            </p>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.edu"
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl pl-10 pr-10 py-2.5 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              pill
              isLoading={isLoading}
              className="w-full mt-2"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Placement Pro
            </Button>
          </form>

          {/* Secure login footnote */}
          <div className="pt-2 text-center text-xs text-stone-400">
            Protected by role-based academic authentication & access control.
          </div>
        </div>
      </div>
    </div>
  );
};
