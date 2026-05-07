import {
  AlertCircle,
  Clock,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  FileText,
  Calendar,
  Gavel,
  Activity,
  BarChart3,
  Users,
  Briefcase,
  ChevronRight,
} from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const deadlineAlerts = [
  {
    status: "critical",
    count: 3,
    label: "Prazos Hoje",
    sublabel: "Ação imediata necessária",
    borderColor: "border-red-500",
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    numberColor: "text-red-700",
    dot: "bg-red-500",
    icon: AlertCircle,
  },
  {
    status: "warning",
    count: 12,
    label: "Esta Semana",
    sublabel: "Monitoramento ativo",
    borderColor: "border-amber-500",
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    numberColor: "text-amber-700",
    dot: "bg-amber-500",
    icon: Clock,
  },
  {
    status: "safe",
    count: 45,
    label: "Em Dia",
    sublabel: "Situação controlada",
    borderColor: "border-emerald-500",
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    numberColor: "text-emerald-700",
    dot: "bg-emerald-500",
    icon: CheckCircle,
  },
];

const recentActivities = [
  {
    id: 1,
    type: "sentence",
    case: "Proc. 0001234-56.2024.8.26.0100",
    client: "João Silva",
    description: "Sentença publicada — Procedente em parte",
    time: "2h atrás",
    priority: "high",
    icon: Gavel,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: 2,
    type: "deadline",
    case: "Proc. 0007890-12.2024.8.26.0200",
    client: "Maria Santos",
    description: "Prazo para recurso — vence HOJE às 17h",
    time: "4h atrás",
    priority: "critical",
    icon: AlertCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    id: 3,
    type: "hearing",
    case: "Proc. 0002345-67.2024.8.26.0300",
    client: "Pedro Oliveira",
    description: "Audiência agendada — 15/03/2026 às 14h",
    time: "6h atrás",
    priority: "medium",
    icon: Calendar,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 4,
    type: "document",
    case: "Proc. 0003456-78.2024.8.26.0400",
    client: "Ana Costa",
    description: "Novo documento juntado pelo réu",
    time: "8h atrás",
    priority: "low",
    icon: FileText,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
  {
    id: 5,
    type: "update",
    case: "Proc. 0004567-89.2024.8.26.0500",
    client: "Carlos Mendes",
    description: "Processo remetido ao Tribunal — 2ª instância",
    time: "10h atrás",
    priority: "high",
    icon: ArrowUpRight,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

const revenueData = [
  { month: "Jan", value: 45000 },
  { month: "Fev", value: 52000 },
  { month: "Mar", value: 48000 },
  { month: "Abr", value: 61000 },
  { month: "Mai", value: 55000 },
  { month: "Jun", value: 67000 },
];

const quickStats = [
  {
    label: "Total de Casos",
    value: "127",
    icon: Briefcase,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Casos Ativos",
    value: "60",
    icon: Activity,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Clientes Ativos",
    value: "45",
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-xl">
        <p className="text-slate-400 mb-1" style={{ fontSize: "11px" }}>
          {label}
        </p>
        <p className="text-white font-semibold" style={{ fontSize: "14px" }}>
          R$ {payload[0].value.toLocaleString("pt-BR")}
        </p>
      </div>
    );
  }

  return null;
};

export function Dashboard() {
  return (
    <div className="p-6 space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
            <h1
              className="text-slate-900"
              style={{ fontSize: "26px", fontWeight: 700 }}
            >
              Dashboard
            </h1>
          </div>
          <p className="text-slate-500 pl-3.5" style={{ fontSize: "13px" }}>
            Sexta-feira, 06 de Março de 2026
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span
            className="text-emerald-700 font-medium"
            style={{ fontSize: "12px" }}
          >
            Sistema Online
          </span>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid gap-3 grid-cols-3">
        {quickStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>

              <p
                className={`${stat.color} font-bold`}
                style={{ fontSize: "24px" }}
              >
                {stat.value}
              </p>
              <p className="text-slate-500 mt-0.5" style={{ fontSize: "11px" }}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Traffic Light Alert Cards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-4 h-4 text-slate-500" />
          <h2
            className="text-slate-700 font-semibold"
            style={{ fontSize: "13px" }}
          >
            Monitoramento de Prazos
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {deadlineAlerts.map((alert) => {
            const Icon = alert.icon;

            return (
              <div
                key={alert.status}
                className={`${alert.bg} border-l-4 ${alert.borderColor} rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-10 h-10 ${alert.iconBg} rounded-xl flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${alert.iconColor}`} />
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70">
                    <div className={`w-1.5 h-1.5 rounded-full ${alert.dot}`} />
                    <span
                      className="text-slate-600"
                      style={{ fontSize: "10px", fontWeight: 600 }}
                    >
                      ATIVO
                    </span>
                  </div>
                </div>

                <p
                  className={`${alert.numberColor} font-bold`}
                  style={{ fontSize: "40px", lineHeight: 1 }}
                >
                  {alert.count}
                </p>
                <p
                  className="text-slate-700 font-semibold mt-1"
                  style={{ fontSize: "14px" }}
                >
                  {alert.label}
                </p>
                <p
                  className="text-slate-500 mt-0.5"
                  style={{ fontSize: "11px" }}
                >
                  {alert.sublabel}
                </p>

                <button
                  className={`mt-3 flex items-center gap-1 ${alert.iconColor} font-medium transition-all group-hover:gap-2`}
                  style={{ fontSize: "12px" }}
                  onClick={() => {
                    window.location.href = "/calendar";
                  }}
                >
                  Ver detalhes <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-5">
        {/* Activity Feed */}
        <div className="col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3
                  className="text-slate-900 font-semibold"
                  style={{ fontSize: "15px" }}
                >
                  Feed de Atividades
                </h3>
                <p
                  className="text-slate-500 mt-0.5"
                  style={{ fontSize: "12px" }}
                >
                  Atualizações em tempo real
                </p>
              </div>

              <button
                className="text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
                style={{ fontSize: "12px" }}
              >
                Ver todos <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-50">
              {recentActivities.slice(0, 5).map((activity) => {
                const Icon = activity.icon;

                return (
                  <div
                    key={activity.id}
                    className={`px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                      activity.priority === "critical"
                        ? "bg-red-50/50 hover:bg-red-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 ${activity.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}
                      >
                        <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-slate-900 font-medium truncate"
                              style={{ fontSize: "13px" }}
                            >
                              {activity.description}
                            </p>
                            <p
                              className="text-slate-400 truncate mt-0.5"
                              style={{ fontSize: "11px" }}
                            >
                              {activity.case} • {activity.client}
                            </p>
                          </div>

                          <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                            <span
                              className="text-slate-400 whitespace-nowrap"
                              style={{ fontSize: "10px" }}
                            >
                              {activity.time}
                            </span>

                            {activity.priority === "critical" && (
                              <span
                                className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full"
                                style={{ fontSize: "10px", fontWeight: 600 }}
                              >
                                URGENTE
                              </span>
                            )}

                            {activity.priority === "high" && (
                              <span
                                className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full"
                                style={{ fontSize: "10px", fontWeight: 600 }}
                              >
                                ALTA
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <h3
                className="text-slate-900 font-semibold"
                style={{ fontSize: "14px" }}
              >
                Próximos Prazos
              </h3>
            </div>

            <div className="divide-y divide-slate-50">
              {[
                {
                  date: "Hoje",
                  time: "17h00",
                  label: "Recurso — Maria Santos",
                  color: "bg-red-500",
                },
                {
                  date: "Amanhã",
                  time: "10h00",
                  label: "Audiência — João Silva",
                  color: "bg-amber-500",
                },
                {
                  date: "15 Mar",
                  time: "14h00",
                  label: "Alegações — Pedro O.",
                  color: "bg-blue-500",
                },
              ].map((item) => (
                <div
                  key={`${item.date}-${item.time}-${item.label}`}
                  className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-slate-900 font-medium truncate"
                      style={{ fontSize: "12px" }}
                    >
                      {item.label}
                    </p>
                    <p className="text-slate-400" style={{ fontSize: "10px" }}>
                      {item.time}
                    </p>
                  </div>

                  <span
                    className="text-slate-500 flex-shrink-0"
                    style={{ fontSize: "11px", fontWeight: 500 }}
                  >
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-slate-500" />
                <h3
                  className="text-slate-900 font-semibold"
                  style={{ fontSize: "15px" }}
                >
                  Receita Mensal
                </h3>
              </div>
              <p className="text-slate-500" style={{ fontSize: "12px" }}>
                Faturamento acumulado — Jan a Jun 2026
              </p>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span
                  className="text-emerald-600 font-bold"
                  style={{ fontSize: "20px" }}
                >
                  R$ 67.000
                </span>
              </div>
              <p
                className="text-emerald-600 font-medium"
                style={{ fontSize: "11px" }}
              >
                +21,8% vs mês anterior
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart
              data={revenueData}
              margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                stroke="#94a3b8"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                stroke="#94a3b8"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#1d4ed8"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
                dot={{
                  fill: "#1d4ed8",
                  r: 4,
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
                activeDot={{
                  r: 6,
                  fill: "#1d4ed8",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
