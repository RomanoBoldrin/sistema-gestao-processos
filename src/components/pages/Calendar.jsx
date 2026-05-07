import { useState } from "react";

import {
  CalendarDays,
  Clock,
  ChevronLeft,
  ChevronRight,
  Gavel,
  FileText,
  Users,
  AlertTriangle,
} from "lucide-react";

const deadlines = [
  {
    id: 1,
    date: "2026-03-06",
    time: "17:00",
    title: "Prazo para Recurso",
    case: "0007890-12.2024.8.26.0200",
    client: "Maria Santos",
    priority: "critical",
    type: "Prazo Processual",
    typeIcon: AlertTriangle,
  },
  {
    id: 2,
    date: "2026-03-07",
    time: "10:00",
    title: "Audiência de Conciliação",
    case: "0001234-56.2024.8.26.0100",
    client: "João Silva",
    priority: "high",
    type: "Audiência",
    typeIcon: Gavel,
  },
  {
    id: 3,
    date: "2026-03-08",
    time: "15:30",
    title: "Protocolo de Petição",
    case: "0002345-67.2024.8.26.0300",
    client: "Pedro Oliveira",
    priority: "medium",
    type: "Protocolo",
    typeIcon: FileText,
  },
  {
    id: 4,
    date: "2026-03-10",
    time: "09:00",
    title: "Reunião com Cliente",
    case: "0003456-78.2024.8.26.0400",
    client: "Ana Costa",
    priority: "medium",
    type: "Reunião",
    typeIcon: Users,
  },
  {
    id: 5,
    date: "2026-03-12",
    time: "11:00",
    title: "Prazo para Contestação",
    case: "0004567-89.2024.8.26.0500",
    client: "Carlos Mendes",
    priority: "high",
    type: "Prazo Processual",
    typeIcon: AlertTriangle,
  },
  {
    id: 6,
    date: "2026-03-14",
    time: "14:30",
    title: "Audiência de Instrução",
    case: "0005678-90.2024.8.26.0600",
    client: "Lucia Ferreira",
    priority: "high",
    type: "Audiência",
    typeIcon: Gavel,
  },
  {
    id: 7,
    date: "2026-03-17",
    time: "10:00",
    title: "Juntada de Documentos",
    case: "0006789-01.2024.8.26.0700",
    client: "Roberto Lima",
    priority: "low",
    type: "Protocolo",
    typeIcon: FileText,
  },
  {
    id: 8,
    date: "2026-03-20",
    time: "16:00",
    title: "Prazo para Alegações Finais",
    case: "0007890-12.2024.8.26.0800",
    client: "Sandra Alves",
    priority: "medium",
    type: "Prazo Processual",
    typeIcon: AlertTriangle,
  },
];

const priorityConfig = {
  critical: {
    bg: "bg-red-50",
    border: "border-red-200",
    borderLeft: "border-l-red-500",
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
    icon: "text-red-600",
    label: "Crítico",
    labelBg: "bg-red-500",
  },
  high: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    borderLeft: "border-l-orange-500",
    badge: "bg-orange-100 text-orange-700",
    dot: "bg-orange-500",
    icon: "text-orange-600",
    label: "Alta",
    labelBg: "bg-orange-500",
  },
  medium: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    borderLeft: "border-l-amber-500",
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    icon: "text-amber-600",
    label: "Média",
    labelBg: "bg-amber-500",
  },
  low: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    borderLeft: "border-l-blue-500",
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-400",
    icon: "text-blue-500",
    label: "Baixa",
    labelBg: "bg-blue-400",
  },
};

function generateCalendarDays() {
  const year = 2026;
  const month = 2;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  for (let index = 0; index < firstDay; index++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return days;
}

const calendarDays = generateCalendarDays();

const deadlineDays = new Set(
  deadlines.map((deadline) => parseInt(deadline.date.split("-")[2], 10)),
);

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  const groupedDeadlines = deadlines.reduce((accumulator, deadline) => {
    if (!accumulator[deadline.date]) {
      accumulator[deadline.date] = [];
    }

    accumulator[deadline.date].push(deadline);
    return accumulator;
  }, {});

  const sortedDates = Object.keys(groupedDeadlines).sort();

  const filteredGroups = selectedDate
    ? Object.fromEntries(
        Object.entries(groupedDeadlines).filter(
          ([date]) => date === selectedDate,
        ),
      )
    : groupedDeadlines;

  const filteredDates = selectedDate
    ? sortedDates.filter((date) => date === selectedDate)
    : sortedDates;

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
              Calendário de Prazos
            </h1>
          </div>

          <p className="text-slate-500 pl-3.5" style={{ fontSize: "13px" }}>
            Gerenciamento de prazos e compromissos
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Hoje",
            value: "1",
            color: "text-red-600",
            bg: "bg-red-50",
            border: "border-red-200",
          },
          {
            label: "Esta Semana",
            value: "3",
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-200",
          },
          {
            label: "Este Mês",
            value: "8",
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-200",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} border ${stat.border} rounded-2xl p-4 text-center`}
          >
            <p
              className={`font-bold ${stat.color}`}
              style={{ fontSize: "28px", lineHeight: 1 }}
            >
              {stat.value}
            </p>
            <p className="text-slate-600 mt-1" style={{ fontSize: "11px" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Mini Calendar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p
                  className="text-slate-900 font-semibold"
                  style={{ fontSize: "14px" }}
                >
                  Março 2026
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button className="w-7 h-7 rounded-lg hover:bg-slate-50 flex items-center justify-center transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </button>
                <button className="w-7 h-7 rounded-lg hover:bg-slate-50 flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-7 mb-2">
                {["D", "S", "T", "Q", "Q", "S", "S"].map((day, index) => (
                  <div
                    key={`${day}-${index}`}
                    className="text-center text-slate-400 font-medium py-1"
                    style={{ fontSize: "11px" }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-1">
                {calendarDays.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} />;
                  }

                  const dateStr = `2026-03-${String(day).padStart(2, "0")}`;
                  const hasDeadline = deadlineDays.has(day);
                  const isToday = day === 6;
                  const isSelected = selectedDate === dateStr;

                  return (
                    <button
                      key={day}
                      onClick={() =>
                        setSelectedDate(isSelected ? null : dateStr)
                      }
                      className={`relative w-full aspect-square rounded-lg flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : isToday
                            ? "bg-slate-900 text-white"
                            : "hover:bg-slate-50 text-slate-700"
                      }`}
                      style={{
                        fontSize: "12px",
                        fontWeight: isToday || isSelected ? 600 : 400,
                      }}
                    >
                      {day}

                      {hasDeadline && !isSelected && (
                        <span
                          className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                            isToday ? "bg-white" : "bg-red-500"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <p
              className="text-slate-700 font-semibold mb-3"
              style={{ fontSize: "13px" }}
            >
              Prioridade
            </p>

            <div className="space-y-2">
              {Object.entries(priorityConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                  <span className="text-slate-600" style={{ fontSize: "12px" }}>
                    {config.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="col-span-2">
          {selectedDate && (
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setSelectedDate(null)}
                className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium"
                style={{ fontSize: "13px" }}
              >
                <ChevronLeft className="w-4 h-4" />
                Todos os dias
              </button>
            </div>
          )}

          <div className="space-y-6">
            {filteredDates.map((date) => {
              const items = filteredGroups[date];
              const dateObj = new Date(`${date}T12:00:00`);
              const isToday = date === "2026-03-06";
              const dayName = dateObj.toLocaleDateString("pt-BR", {
                weekday: "long",
              });
              const dayNumber = dateObj.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
              });

              return (
                <div key={date}>
                  {/* Date Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`px-4 py-2.5 rounded-xl flex-shrink-0 ${
                        isToday
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <p
                        className={`capitalize ${
                          isToday ? "text-slate-300" : "text-slate-500"
                        }`}
                        style={{ fontSize: "10px", fontWeight: 600 }}
                      >
                        {dayName}
                      </p>
                      <p
                        className="font-semibold capitalize"
                        style={{ fontSize: "13px" }}
                      >
                        {dayNumber}
                      </p>
                    </div>

                    {isToday && (
                      <span
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold"
                        style={{ fontSize: "11px" }}
                      >
                        HOJE
                      </span>
                    )}

                    <div className="flex-1 h-px bg-slate-100" />

                    <span
                      className="text-slate-400"
                      style={{ fontSize: "11px" }}
                    >
                      {items.length} item{items.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Events */}
                  <div className="space-y-2.5 ml-2">
                    {items.map((deadline) => {
                      const config = priorityConfig[deadline.priority];
                      const TypeIcon = deadline.typeIcon;

                      return (
                        <div
                          key={deadline.id}
                          className={`bg-white rounded-2xl border ${config.border} border-l-4 ${config.borderLeft} p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-9 h-9 ${config.badge} rounded-xl flex items-center justify-center flex-shrink-0`}
                            >
                              <TypeIcon className="w-4 h-4" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h3
                                    className="text-slate-900 font-semibold"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {deadline.title}
                                  </h3>
                                  <p
                                    className="text-slate-500 mt-0.5"
                                    style={{ fontSize: "11px" }}
                                  >
                                    {deadline.case}
                                  </p>
                                </div>

                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  <Clock
                                    className={`w-3.5 h-3.5 ${config.icon}`}
                                  />
                                  <span
                                    className={`font-semibold ${config.icon}`}
                                    style={{ fontSize: "13px" }}
                                  >
                                    {deadline.time}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 mt-2">
                                <span
                                  className="text-slate-600"
                                  style={{ fontSize: "12px" }}
                                >
                                  <span className="font-medium">Cliente:</span>{" "}
                                  {deadline.client}
                                </span>

                                <span
                                  className={`px-2 py-0.5 rounded-full ${config.badge}`}
                                  style={{ fontSize: "10px", fontWeight: 600 }}
                                >
                                  {deadline.type}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {filteredDates.length === 0 && (
              <div className="text-center py-16">
                <CalendarDays className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p
                  className="text-slate-400 font-medium"
                  style={{ fontSize: "14px" }}
                >
                  Nenhum prazo neste dia
                </p>
                <p className="text-slate-300 mt-1" style={{ fontSize: "12px" }}>
                  Selecione outra data ou limpe o filtro
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
