import { useState } from "react";

import {
  Search,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Users,
  UserCheck,
  UserX,
  Building2,
  Plus,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialClients = [
  {
    id: 1,
    name: "João Silva",
    initials: "JS",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    address: "São Paulo, SP",
    activeCases: 2,
    totalCases: 5,
    status: "active",
    joinDate: "2023-05-15",
    category: "Pessoa Física",
    gradient: "from-blue-500 to-blue-700",
    specialty: "Dir. Administrativo",
  },
  {
    id: 2,
    name: "Maria Santos",
    initials: "MS",
    email: "maria.santos@email.com",
    phone: "(11) 91234-5678",
    address: "Campinas, SP",
    activeCases: 1,
    totalCases: 3,
    status: "active",
    joinDate: "2023-08-20",
    category: "Pessoa Física",
    gradient: "from-purple-500 to-purple-700",
    specialty: "Dir. Tributário",
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    initials: "PO",
    email: "pedro.oliveira@empresa.com",
    phone: "(11) 93456-7890",
    address: "Santos, SP",
    activeCases: 3,
    totalCases: 8,
    status: "active",
    joinDate: "2022-11-10",
    category: "Pessoa Jurídica",
    gradient: "from-emerald-500 to-emerald-700",
    specialty: "Dir. Constitucional",
  },
  {
    id: 4,
    name: "Ana Costa",
    initials: "AC",
    email: "ana.costa@email.com",
    phone: "(11) 94567-8901",
    address: "Ribeirão Preto, SP",
    activeCases: 0,
    totalCases: 2,
    status: "inactive",
    joinDate: "2023-01-05",
    category: "Pessoa Física",
    gradient: "from-slate-400 to-slate-500",
    specialty: "Dir. Previdenciário",
  },
  {
    id: 5,
    name: "Carlos Mendes",
    initials: "CM",
    email: "carlos.mendes@email.com",
    phone: "(11) 95678-9012",
    address: "São José dos Campos, SP",
    activeCases: 1,
    totalCases: 4,
    status: "active",
    joinDate: "2023-03-22",
    category: "Pessoa Física",
    gradient: "from-amber-500 to-amber-700",
    specialty: "Dir. Civil",
  },
  {
    id: 6,
    name: "Lucia Ferreira",
    initials: "LF",
    email: "lucia@empresa.com.br",
    phone: "(11) 96789-0123",
    address: "Sorocaba, SP",
    activeCases: 2,
    totalCases: 6,
    status: "active",
    joinDate: "2022-09-15",
    category: "Pessoa Jurídica",
    gradient: "from-rose-500 to-rose-700",
    specialty: "Dir. Trabalhista",
  },
  {
    id: 7,
    name: "Roberto Lima",
    initials: "RL",
    email: "roberto.lima@email.com",
    phone: "(11) 97890-1234",
    address: "São Paulo, SP",
    activeCases: 1,
    totalCases: 1,
    status: "active",
    joinDate: "2024-01-10",
    category: "Pessoa Física",
    gradient: "from-indigo-500 to-indigo-700",
    specialty: "Dir. Administrativo",
  },
  {
    id: 8,
    name: "Sandra Alves",
    initials: "SA",
    email: "sandra.alves@email.com",
    phone: "(11) 98901-2345",
    address: "Guarulhos, SP",
    activeCases: 0,
    totalCases: 3,
    status: "inactive",
    joinDate: "2023-06-30",
    category: "Pessoa Física",
    gradient: "from-slate-400 to-slate-500",
    specialty: "Dir. Previdenciário",
  },
];

function getInitials(name) {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getGradientByCategory(category) {
  if (category === "Pessoa Jurídica") {
    return "from-emerald-500 to-emerald-700";
  }

  return "from-blue-500 to-blue-700";
}

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function Clients() {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isNewClientOpen, setIsNewClientOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    category: "Pessoa Física",
    specialty: "Dir. Administrativo",
    status: "active",
  });

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || client.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: clients.length,
    active: clients.filter((client) => client.status === "active").length,
    inactive: clients.filter((client) => client.status === "inactive").length,
    pf: clients.filter((client) => client.category === "Pessoa Física").length,
    pj: clients.filter((client) => client.category === "Pessoa Jurídica")
      .length,
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      category: "Pessoa Física",
      specialty: "Dir. Administrativo",
      status: "active",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newClient = {
      id: Date.now(),
      name: formData.name,
      initials: getInitials(formData.name),
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      activeCases: 0,
      totalCases: 0,
      status: formData.status,
      joinDate: getTodayDate(),
      category: formData.category,
      gradient: getGradientByCategory(formData.category),
      specialty: formData.specialty,
    };

    setClients((currentClients) => [newClient, ...currentClients]);
    setIsNewClientOpen(false);
    resetForm();
  };

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
              Clientes
            </h1>
          </div>

          <p className="text-slate-500 pl-3.5" style={{ fontSize: "13px" }}>
            Gerencie sua carteira de clientes
          </p>
        </div>

        <button
          onClick={() => setIsNewClientOpen(true)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span style={{ fontSize: "13px", fontWeight: 500 }}>
            Novo Cliente
          </span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 grid-cols-5">
        {[
          {
            label: "Total",
            value: stats.total,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Ativos",
            value: stats.active,
            icon: UserCheck,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Inativos",
            value: stats.inactive,
            icon: UserX,
            color: "text-slate-500",
            bg: "bg-slate-50",
          },
          {
            label: "Pessoa Física",
            value: stats.pf,
            icon: User,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            label: "Pessoa Jurídica",
            value: stats.pj,
            icon: Building2,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm"
            >
              <div
                className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center mb-2`}
              >
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>

              <p
                className={`font-bold ${stat.color}`}
                style={{ fontSize: "22px" }}
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

      {/* Search and Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

          <Input
            type="text"
            placeholder="Buscar por nome ou email..."
            className="pl-10 h-11 bg-white border-slate-200 rounded-xl"
            style={{ fontSize: "13px" }}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {["all", "active", "inactive"].map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterStatus(filter)}
              className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                filterStatus === filter
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
              style={{ fontSize: "12px" }}
            >
              {filter === "all"
                ? "Todos"
                : filter === "active"
                  ? "Ativos"
                  : "Inativos"}
            </button>
          ))}
        </div>
      </div>

      {/* Client Grid */}
      <div className="grid gap-4 grid-cols-2">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer"
          >
            {/* Top Section */}
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${client.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md`}
                >
                  <span
                    className="text-white font-bold"
                    style={{ fontSize: "14px" }}
                  >
                    {client.initials}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className="text-slate-900 font-semibold"
                        style={{ fontSize: "15px" }}
                      >
                        {client.name}
                      </h3>

                      <p
                        className="text-slate-400 mt-0.5"
                        style={{ fontSize: "11px" }}
                      >
                        {client.specialty}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
                          client.status === "active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                        style={{ fontSize: "10px", fontWeight: 600 }}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            client.status === "active"
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />
                        {client.status === "active" ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-slate-500">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate" style={{ fontSize: "12px" }}>
                    {client.email}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                  <span style={{ fontSize: "12px" }}>{client.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span style={{ fontSize: "12px" }}>{client.address}</span>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p
                    className="text-slate-900 font-bold"
                    style={{ fontSize: "18px" }}
                  >
                    {client.activeCases}
                  </p>
                  <p className="text-slate-400" style={{ fontSize: "10px" }}>
                    Ativos
                  </p>
                </div>

                <div className="w-px h-8 bg-slate-200" />

                <div>
                  <p
                    className="text-slate-900 font-bold"
                    style={{ fontSize: "18px" }}
                  >
                    {client.totalCases}
                  </p>
                  <p className="text-slate-400" style={{ fontSize: "10px" }}>
                    Total
                  </p>
                </div>

                <div className="w-px h-8 bg-slate-200" />

                <div>
                  <p className="text-slate-500" style={{ fontSize: "10px" }}>
                    Desde
                  </p>
                  <p
                    className="text-slate-700 font-medium"
                    style={{ fontSize: "11px" }}
                  >
                    {new Date(client.joinDate).toLocaleDateString("pt-BR", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span style={{ fontSize: "11px", fontWeight: 500 }}>
                    Casos
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-slate-300" />
          </div>

          <p
            className="text-slate-600 font-medium"
            style={{ fontSize: "15px" }}
          >
            Nenhum cliente encontrado
          </p>

          <p className="text-slate-400 mt-1" style={{ fontSize: "13px" }}>
            Tente ajustar os filtros de busca
          </p>
        </div>
      )}

      {/* New Client Modal Overlay */}
      {isNewClientOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsNewClientOpen(false);
            }
          }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 px-7 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-300" />
                </div>

                <div>
                  <h2
                    className="text-white font-semibold"
                    style={{ fontSize: "17px" }}
                  >
                    Novo Cliente
                  </h2>
                  <p className="text-blue-300" style={{ fontSize: "12px" }}>
                    Cadastre um novo cliente no sistema
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsNewClientOpen(false)}
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-7 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="clientName"
                    className="text-slate-700 font-medium mb-2 block"
                    style={{ fontSize: "13px" }}
                  >
                    Nome do Cliente
                  </Label>

                  <Input
                    id="clientName"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData({ ...formData, name: event.target.value })
                    }
                    placeholder="Nome completo"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
                    style={{ fontSize: "13px" }}
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="clientEmail"
                    className="text-slate-700 font-medium mb-2 block"
                    style={{ fontSize: "13px" }}
                  >
                    E-mail
                  </Label>

                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                    placeholder="cliente@email.com"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
                    style={{ fontSize: "13px" }}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="clientPhone"
                    className="text-slate-700 font-medium mb-2 block"
                    style={{ fontSize: "13px" }}
                  >
                    Telefone
                  </Label>

                  <Input
                    id="clientPhone"
                    value={formData.phone}
                    onChange={(event) =>
                      setFormData({ ...formData, phone: event.target.value })
                    }
                    placeholder="(11) 99999-9999"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
                    style={{ fontSize: "13px" }}
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="clientAddress"
                    className="text-slate-700 font-medium mb-2 block"
                    style={{ fontSize: "13px" }}
                  >
                    Cidade / Estado
                  </Label>

                  <Input
                    id="clientAddress"
                    value={formData.address}
                    onChange={(event) =>
                      setFormData({ ...formData, address: event.target.value })
                    }
                    placeholder="São Paulo, SP"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
                    style={{ fontSize: "13px" }}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label
                    htmlFor="clientCategory"
                    className="text-slate-700 font-medium mb-2 block"
                    style={{ fontSize: "13px" }}
                  >
                    Categoria
                  </Label>

                  <select
                    id="clientCategory"
                    value={formData.category}
                    onChange={(event) =>
                      setFormData({ ...formData, category: event.target.value })
                    }
                    className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white px-3 text-slate-900 outline-none focus:border-blue-500 transition-colors"
                    style={{ fontSize: "13px" }}
                    required
                  >
                    <option value="Pessoa Física">Pessoa Física</option>
                    <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                  </select>
                </div>

                <div>
                  <Label
                    htmlFor="clientSpecialty"
                    className="text-slate-700 font-medium mb-2 block"
                    style={{ fontSize: "13px" }}
                  >
                    Área Principal
                  </Label>

                  <select
                    id="clientSpecialty"
                    value={formData.specialty}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        specialty: event.target.value,
                      })
                    }
                    className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white px-3 text-slate-900 outline-none focus:border-blue-500 transition-colors"
                    style={{ fontSize: "13px" }}
                    required
                  >
                    <option value="Dir. Administrativo">
                      Dir. Administrativo
                    </option>
                    <option value="Dir. Tributário">Dir. Tributário</option>
                    <option value="Dir. Constitucional">
                      Dir. Constitucional
                    </option>
                    <option value="Dir. Previdenciário">
                      Dir. Previdenciário
                    </option>
                    <option value="Dir. Civil">Dir. Civil</option>
                    <option value="Dir. Trabalhista">Dir. Trabalhista</option>
                  </select>
                </div>

                <div>
                  <Label
                    htmlFor="clientStatus"
                    className="text-slate-700 font-medium mb-2 block"
                    style={{ fontSize: "13px" }}
                  >
                    Status
                  </Label>

                  <select
                    id="clientStatus"
                    value={formData.status}
                    onChange={(event) =>
                      setFormData({ ...formData, status: event.target.value })
                    }
                    className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white px-3 text-slate-900 outline-none focus:border-blue-500 transition-colors"
                    style={{ fontSize: "13px" }}
                    required
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewClientOpen(false);
                    resetForm();
                  }}
                  className="flex-1 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors cursor-pointer"
                  style={{ fontSize: "14px" }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-900/20 cursor-pointer"
                  style={{ fontSize: "14px" }}
                >
                  Cadastrar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
