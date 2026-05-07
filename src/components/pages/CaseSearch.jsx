import { useState } from "react";

import {
  Search,
  Calendar,
  User,
  ExternalLink,
  Scale,
  Building2,
  Filter,
} from "lucide-react";

import { Input } from "@/components/ui/input";

const mockCases = [
  {
    id: 1,
    number: "0001234-56.2024.8.26.0100",
    client: "João Silva",
    type: "Direito Administrativo",
    status: "Em Andamento",
    statusVariant: "blue",
    lastUpdate: "2024-02-25",
    deadline: "2026-03-08",
    court: "1ª Vara Cível — São Paulo/SP",
    description: "Ação de anulação de ato administrativo — demissão indevida",
    progress: 65,
  },
  {
    id: 2,
    number: "0007890-12.2024.8.26.0200",
    client: "Maria Santos",
    type: "Direito Tributário",
    status: "Urgente",
    statusVariant: "red",
    lastUpdate: "2024-02-26",
    deadline: "2026-03-06",
    court: "2ª Vara da Fazenda Pública — SP",
    description:
      "Mandado de segurança — suspensão de cobrança indevida de ICMS",
    progress: 40,
  },
  {
    id: 3,
    number: "0002345-67.2024.8.26.0300",
    client: "Pedro Oliveira",
    type: "Direito Constitucional",
    status: "Aguardando Sentença",
    statusVariant: "amber",
    lastUpdate: "2024-02-20",
    deadline: "2026-03-15",
    court: "3ª Vara Federal — São Paulo/SP",
    description: "Ação declaratória de constitucionalidade de lei municipal",
    progress: 85,
  },
  {
    id: 4,
    number: "0003456-78.2024.8.26.0400",
    client: "Ana Costa",
    type: "Direito Previdenciário",
    status: "Concluído",
    statusVariant: "green",
    lastUpdate: "2024-02-15",
    deadline: "-",
    court: "Juizado Especial Federal — SP",
    description: "Concessão de aposentadoria especial — servidor público",
    progress: 100,
  },
];

const statusConfig = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  green: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
};

const filters = [
  "Todos",
  "Em Andamento",
  "Urgente",
  "Aguardando Sentença",
  "Concluído",
];

const DEADLINE_LIMIT_DATE = new Date("2026-03-13T23:59:59");

function isDeadlineSoon(deadline) {
  if (deadline === "-") {
    return false;
  }

  return new Date(`${deadline}T12:00:00`) <= DEADLINE_LIMIT_DATE;
}

export function CaseSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCase, setSelectedCase] = useState(2);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredCases = mockCases.filter((caseItem) => {
    const matchesFilter =
      activeFilter === "Todos" || caseItem.status === activeFilter;

    const normalizedSearchTerm = searchTerm.toLowerCase();

    const matchesSearch =
      caseItem.number.toLowerCase().includes(normalizedSearchTerm) ||
      caseItem.client.toLowerCase().includes(normalizedSearchTerm) ||
      caseItem.type.toLowerCase().includes(normalizedSearchTerm);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 pb-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
          <h1
            className="text-slate-900"
            style={{ fontSize: "26px", fontWeight: 700 }}
          >
            Buscar Casos
          </h1>
        </div>

        <p className="text-slate-500 pl-3.5" style={{ fontSize: "13px" }}>
          Pesquise e gerencie todos os processos do escritório
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />

        <Input
          type="text"
          placeholder="Número do processo, nome do cliente ou tipo de ação..."
          className="pl-11 h-12 bg-white border-slate-200 rounded-2xl shadow-sm text-slate-900"
          style={{ fontSize: "14px" }}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <button className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl transition-colors">
          <Filter className="w-3.5 h-3.5" />
          <span style={{ fontSize: "12px", fontWeight: 500 }}>Filtrar</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-all ${
              activeFilter === filter
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
            style={{ fontSize: "12px" }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-slate-900 font-semibold"
            style={{ fontSize: "15px" }}
          >
            Resultados ({filteredCases.length})
          </h2>
        </div>

        <div className="space-y-3">
          {filteredCases.map((caseItem) => {
            const statusStyle = statusConfig[caseItem.statusVariant];
            const isSelected = selectedCase === caseItem.id;

            return (
              <div
                key={caseItem.id}
                className={`bg-white rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
                  isSelected
                    ? "border-blue-300 shadow-md ring-1 ring-blue-200"
                    : "border-slate-100 shadow-sm"
                }`}
                onClick={() => setSelectedCase(caseItem.id)}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span
                          className="text-slate-900 font-semibold"
                          style={{ fontSize: "13px" }}
                        >
                          {caseItem.number}
                        </span>

                        <span
                          className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full ${statusStyle.bg} ${statusStyle.text}`}
                          style={{ fontSize: "11px", fontWeight: 600 }}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                          />
                          {caseItem.status}
                        </span>
                      </div>

                      <p
                        className="text-slate-600"
                        style={{ fontSize: "13px" }}
                      >
                        {caseItem.description}
                      </p>
                    </div>

                    <button className="ml-3 w-8 h-8 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      <div>
                        <p
                          className="text-slate-400"
                          style={{ fontSize: "10px" }}
                        >
                          Cliente
                        </p>
                        <p
                          className="text-slate-900 font-medium"
                          style={{ fontSize: "12px" }}
                        >
                          {caseItem.client}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Scale className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      <div>
                        <p
                          className="text-slate-400"
                          style={{ fontSize: "10px" }}
                        >
                          Tipo
                        </p>
                        <p
                          className="text-slate-900 font-medium"
                          style={{ fontSize: "12px" }}
                        >
                          {caseItem.type.replace("Direito ", "")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      <div>
                        <p
                          className="text-slate-400"
                          style={{ fontSize: "10px" }}
                        >
                          Próximo Prazo
                        </p>

                        <p
                          className={`font-medium ${
                            isDeadlineSoon(caseItem.deadline)
                              ? "text-red-600"
                              : "text-slate-900"
                          }`}
                          style={{ fontSize: "12px" }}
                        >
                          {caseItem.deadline === "-"
                            ? "Concluído"
                            : new Date(
                                `${caseItem.deadline}T12:00:00`,
                              ).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      <div>
                        <p
                          className="text-slate-400"
                          style={{ fontSize: "10px" }}
                        >
                          Tribunal
                        </p>
                        <p
                          className="text-slate-900 font-medium truncate"
                          style={{ fontSize: "12px", maxWidth: "120px" }}
                        >
                          {caseItem.court.split(" — ")[0]}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="text-slate-400"
                        style={{ fontSize: "10px" }}
                      >
                        Progresso do caso
                      </span>
                      <span
                        className="text-slate-600 font-medium"
                        style={{ fontSize: "11px" }}
                      >
                        {caseItem.progress}%
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          caseItem.progress === 100
                            ? "bg-emerald-500"
                            : caseItem.statusVariant === "red"
                              ? "bg-red-500"
                              : "bg-blue-500"
                        }`}
                        style={{
                          width: `${caseItem.progress}%`,
                          transition: "width 0.5s ease",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
