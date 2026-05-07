import Link from "next/link";
import { useRouter } from "next/router";

import {
  LayoutDashboard,
  Search,
  CalendarDays,
  Users,
  Receipt,
  FolderOpen,
  Scale,
  Bell,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react";

import { cn } from "@/components/ui/utils";

const navItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
    badge: null,
    description: "Visão geral",
  },
  {
    icon: Search,
    label: "Buscar Casos",
    path: "/cases",
    badge: "4",
    description: "Processos ativos",
  },
  {
    icon: CalendarDays,
    label: "Calendário",
    path: "/calendar",
    badge: "3",
    badgeColor: "bg-red-500",
    description: "Prazos e audiências",
  },
  {
    icon: Users,
    label: "Clientes",
    path: "/clients",
    badge: null,
    description: "Gestão de clientes",
  },
  {
    icon: Receipt,
    label: "Faturamento",
    path: "/billing",
    badge: "2",
    badgeColor: "bg-yellow-500",
    description: "Receita por tarefa",
  },
  {
    icon: FolderOpen,
    label: "Documentos",
    path: "/documents",
    badge: null,
    description: "Upload e gestão",
  },
];

export function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0 shadow-2xl">
      {/* Logo */}
      <div className="p-5 border-b border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1
              className="font-semibold text-white tracking-tight"
              style={{ fontSize: "15px" }}
            >
              Direito Público
            </h1>
            <p className="text-slate-400" style={{ fontSize: "11px" }}>
              Ltda. • Sistema Jurídico
            </p>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="mx-4 mt-4 mb-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5 flex items-center gap-2">
        <Bell className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
        <p className="text-red-300" style={{ fontSize: "11px" }}>
          <span className="font-semibold">3 prazos</span> vencem hoje
        </p>
        <div className="ml-auto w-2 h-2 bg-red-400 rounded-full animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <p
          className="text-slate-500 uppercase tracking-widest mb-3 px-3"
          style={{ fontSize: "10px", fontWeight: 600 }}
        >
          Navegação
        </p>

        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = router.pathname === item.path;
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white",
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all",
                      isActive
                        ? "bg-white/20"
                        : "bg-slate-800 group-hover:bg-slate-700",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "font-medium truncate transition-colors",
                        isActive
                          ? "text-white"
                          : "text-slate-300 group-hover:text-white",
                      )}
                      style={{ fontSize: "13px" }}
                    >
                      {item.label}
                    </p>

                    <p
                      className={cn(
                        "truncate",
                        isActive ? "text-blue-200" : "text-slate-500",
                      )}
                      style={{ fontSize: "10px" }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        "flex-shrink-0 h-5 min-w-5 px-1.5 rounded-full flex items-center justify-center text-white",
                        item.badgeColor || "bg-slate-600",
                        isActive && !item.badgeColor && "bg-white/20",
                      )}
                      style={{ fontSize: "10px", fontWeight: 700 }}
                    >
                      {item.badge}
                    </span>
                  )}

                  {isActive && (
                    <ChevronRight className="w-3.5 h-3.5 text-blue-300 flex-shrink-0" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 mb-3">
          <div className="h-px bg-slate-700/60 mx-3" />
        </div>

        <p
          className="text-slate-500 uppercase tracking-widest mb-3 px-3"
          style={{ fontSize: "10px", fontWeight: 600 }}
        >
          Sistema
        </p>

        <ul className="space-y-1">
          <li>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200 group">
              <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center flex-shrink-0">
                <Settings className="w-4 h-4" />
              </div>
              <span className="font-medium" style={{ fontSize: "13px" }}>
                Configurações
              </span>
            </button>
          </li>
        </ul>
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-slate-700/60">
        <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer group">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            <span
              className="text-white font-semibold"
              style={{ fontSize: "13px" }}
            >
              AD
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="text-white font-medium truncate"
              style={{ fontSize: "13px" }}
            >
              Dr. Advogado
            </p>
            <p className="text-slate-400 truncate" style={{ fontSize: "11px" }}>
              admin@direitopublico.com
            </p>
          </div>

          <LogOut className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}
