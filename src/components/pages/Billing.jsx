import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthlyRevenue = [
  { month: "Jan", value: 45000, tasks: 28 },
  { month: "Fev", value: 52000, tasks: 32 },
  { month: "Mar", value: 48000, tasks: 30 },
  { month: "Abr", value: 61000, tasks: 38 },
  { month: "Mai", value: 55000, tasks: 34 },
  { month: "Jun", value: 67000, tasks: 42 },
];

const revenueByTaskType = [
  { name: "Petições", value: 28000, color: "#1d4ed8" },
  { name: "Audiências", value: 18000, color: "#6366f1" },
  { name: "Consultas", value: 12000, color: "#8b5cf6" },
  { name: "Recursos", value: 9000, color: "#a78bfa" },
];

const recentInvoices = [
  {
    id: 1,
    invoice: "INV-2026-001",
    client: "João Silva",
    case: "0001234-56.2024.8.26.0100",
    amount: 5500,
    status: "paid",
    date: "2026-02-20",
    dueDate: "2026-02-20",
  },
  {
    id: 2,
    invoice: "INV-2026-002",
    client: "Maria Santos",
    case: "0007890-12.2024.8.26.0200",
    amount: 8200,
    status: "pending",
    date: "2026-02-22",
    dueDate: "2026-03-10",
  },
  {
    id: 3,
    invoice: "INV-2026-003",
    client: "Pedro Oliveira",
    case: "0002345-67.2024.8.26.0300",
    amount: 6700,
    status: "paid",
    date: "2026-02-23",
    dueDate: "2026-02-23",
  },
  {
    id: 4,
    invoice: "INV-2026-004",
    client: "Ana Costa",
    case: "0003456-78.2024.8.26.0400",
    amount: 4200,
    status: "overdue",
    date: "2026-02-15",
    dueDate: "2026-02-25",
  },
  {
    id: 5,
    invoice: "INV-2026-005",
    client: "Carlos Mendes",
    case: "0004567-89.2024.8.26.0500",
    amount: 9500,
    status: "pending",
    date: "2026-02-25",
    dueDate: "2026-03-15",
  },
];

const statusConfig = {
  paid: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
    label: "Pago",
  },
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    icon: Clock,
    label: "Pendente",
  },
  overdue: {
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
    icon: AlertCircle,
    label: "Atrasado",
  },
};

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

const PieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-xl">
        <p
          className="text-slate-300 font-medium mb-1"
          style={{ fontSize: "12px" }}
        >
          {payload[0].name}
        </p>
        <p className="text-white font-semibold" style={{ fontSize: "14px" }}>
          R$ {payload[0].value.toLocaleString("pt-BR")}
        </p>
      </div>
    );
  }

  return null;
};

export function Billing() {
  const totalRevenue = monthlyRevenue[monthlyRevenue.length - 1].value;
  const previousRevenue = monthlyRevenue[monthlyRevenue.length - 2].value;
  const revenueChange =
    ((totalRevenue - previousRevenue) / previousRevenue) * 100;

  const totalPending = recentInvoices
    .filter((invoice) => invoice.status === "pending")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const totalOverdue = recentInvoices
    .filter((invoice) => invoice.status === "overdue")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const totalAccumulated = monthlyRevenue.reduce(
    (sum, month) => sum + month.value,
    0,
  );

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
              Faturamento
            </h1>
          </div>

          <p className="text-slate-500 pl-3.5" style={{ fontSize: "13px" }}>
            Análise financeira e receita por tarefa
          </p>
        </div>

        <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Download className="w-4 h-4" />
          <span style={{ fontSize: "13px", fontWeight: 500 }}>Exportar</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-4">
        {[
          {
            label: "Receita do Mês",
            value: `R$ ${(totalRevenue / 1000).toFixed(0)}k`,
            change: `+${revenueChange.toFixed(1)}%`,
            positive: true,
            icon: DollarSign,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            desc: "vs. mês anterior",
          },
          {
            label: "Acumulado 2026",
            value: `R$ ${(totalAccumulated / 1000).toFixed(0)}k`,
            change: "Jan — Jun",
            positive: true,
            icon: TrendingUp,
            color: "text-blue-600",
            bg: "bg-blue-50",
            desc: "6 meses",
          },
          {
            label: "Pendentes",
            value: `R$ ${(totalPending / 1000).toFixed(1)}k`,
            change: `${
              recentInvoices.filter((invoice) => invoice.status === "pending")
                .length
            } faturas`,
            positive: null,
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50",
            desc: "aguardando pagamento",
          },
          {
            label: "Atrasadas",
            value: `R$ ${(totalOverdue / 1000).toFixed(1)}k`,
            change: `${
              recentInvoices.filter((invoice) => invoice.status === "overdue")
                .length
            } fatura`,
            positive: false,
            icon: AlertCircle,
            color: "text-red-600",
            bg: "bg-red-50",
            desc: "em atraso",
          },
        ].map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-9 h-9 ${card.bg} rounded-xl flex items-center justify-center`}
                >
                  <Icon className={`w-4 h-4 ${card.color}`} />
                </div>

                {card.positive !== null && (
                  <div
                    className={`flex items-center gap-1 ${
                      card.positive ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {card.positive ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                  </div>
                )}
              </div>

              <p
                className="text-slate-900 font-bold"
                style={{ fontSize: "24px" }}
              >
                {card.value}
              </p>

              <p className="text-slate-500 mt-0.5" style={{ fontSize: "11px" }}>
                {card.label}
              </p>

              <p
                className={`mt-2 font-medium ${
                  card.positive === true
                    ? "text-emerald-600"
                    : card.positive === false
                      ? "text-red-600"
                      : "text-amber-600"
                }`}
                style={{ fontSize: "11px" }}
              >
                {card.change}{" "}
                <span className="text-slate-400 font-normal">{card.desc}</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-5 grid-cols-3">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden col-span-2">
          <div className="px-6 py-5 border-b border-slate-100">
            <h3
              className="text-slate-900 font-semibold"
              style={{ fontSize: "15px" }}
            >
              Receita Mensal
            </h3>
            <p className="text-slate-500 mt-0.5" style={{ fontSize: "12px" }}>
              Evolução dos últimos 6 meses
            </p>
          </div>

          <div className="p-6">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart
                data={monthlyRevenue}
                margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="billingGradient"
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
                  tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}k`}
                />

                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#1d4ed8"
                  strokeWidth={2.5}
                  fill="url(#billingGradient)"
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

        {/* Revenue by Task Type */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-5 border-b border-slate-100">
            <h3
              className="text-slate-900 font-semibold"
              style={{ fontSize: "15px" }}
            >
              Receita por Tipo
            </h3>
            <p className="text-slate-500 mt-0.5" style={{ fontSize: "12px" }}>
              Distribuição — Junho
            </p>
          </div>

          <div className="p-5">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={revenueByTaskType}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {revenueByTaskType.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>

                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-2.5 mt-2">
              {revenueByTaskType.map((item) => (
                <div key={item.name} className="flex items-center gap-2.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span
                    className="flex-1 text-slate-600"
                    style={{ fontSize: "12px" }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="text-slate-900 font-semibold"
                    style={{ fontSize: "12px" }}
                  >
                    R$ {(item.value / 1000).toFixed(0)}k
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Chart */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3
              className="text-slate-900 font-semibold"
              style={{ fontSize: "15px" }}
            >
              Tarefas por Mês
            </h3>
            <p className="text-slate-500 mt-0.5" style={{ fontSize: "12px" }}>
              Volume de tarefas concluídas
            </p>
          </div>
        </div>

        <div className="p-6">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={monthlyRevenue}
              margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
            >
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
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "none",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "13px",
                }}
                formatter={(value) => [value, "Tarefas"]}
              />

              <Bar dataKey="tasks" fill="#1d4ed8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3
              className="text-slate-900 font-semibold"
              style={{ fontSize: "15px" }}
            >
              Faturas Recentes
            </h3>
            <p className="text-slate-500 mt-0.5" style={{ fontSize: "12px" }}>
              Últimas transações
            </p>
          </div>

          <button
            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium"
            style={{ fontSize: "12px" }}
          >
            Ver todas <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-50">
          {recentInvoices.map((invoice) => {
            const config = statusConfig[invoice.status];
            const StatusIcon = config.icon;

            return (
              <div
                key={invoice.id}
                className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div
                  className={`w-9 h-9 ${config.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  <StatusIcon className={`w-4 h-4 ${config.text}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-slate-900 font-semibold"
                      style={{ fontSize: "13px" }}
                    >
                      {invoice.invoice}
                    </span>

                    <span
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}
                      style={{ fontSize: "10px", fontWeight: 600 }}
                    >
                      <span className={`w-1 h-1 rounded-full ${config.dot}`} />
                      {config.label}
                    </span>
                  </div>

                  <p className="text-slate-400" style={{ fontSize: "11px" }}>
                    {invoice.client} • {invoice.case}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <p
                    className="text-slate-900 font-bold"
                    style={{ fontSize: "15px" }}
                  >
                    R$ {invoice.amount.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-slate-400" style={{ fontSize: "10px" }}>
                    Venc.{" "}
                    {new Date(invoice.dueDate).toLocaleDateString("pt-BR")}
                  </p>
                </div>

                <button className="w-8 h-8 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ml-2">
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
