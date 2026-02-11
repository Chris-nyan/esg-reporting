import AuthForm from "@/components/LoginForm.jsx";
import { Leaf } from "lucide-react";

export default function Login() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-slate-50 px-4">
      {/* Subtle ESG Light Gradient Decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -right-[5%] h-[45%] w-[45%] rounded-full bg-emerald-50 blur-[100px]" />
        <div className="absolute -bottom-[10%] -left-[5%] h-[45%] w-[45%] rounded-full bg-green-50 blur-[100px]" />
      </div>

      <div className="z-10 w-full max-w-md">
        <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5">
          <div className="text-center">
            {/* Professional ESG Logo Section */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-600 shadow-md shadow-emerald-200">
              <Leaf className="h-8 w-8 text-white" />
            </div>

            <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
              ESG Reporting Platform
            </h2>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Automating sustainability for a better future
            </p>
          </div>

          <div className="mt-8">
            <AuthForm />
          </div>

          <div className="mt-8 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <span className="h-px w-8 bg-slate-200" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Enterprise Secure
              </p>
              <span className="h-px w-8 bg-slate-200" />
            </div>
            <p className="text-[11px] text-slate-400">
              © 2026 RecyGlo Ltd Pte ESG Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}