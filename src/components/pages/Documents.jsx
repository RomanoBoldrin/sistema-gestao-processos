import { useState } from "react";

import {
  Upload,
  FileText,
  Download,
  Search,
  Calendar,
  User,
  Folder,
  File,
  FolderOpen,
  Scale,
  Shield,
  Gavel,
  FileCheck,
  FilePlus,
  Trash2,
  Eye,
} from "lucide-react";

import { Input } from "@/components/ui/input";

const mockDocuments = [
  {
    id: 1,
    name: "Petição Inicial — João Silva.pdf",
    case: "0001234-56.2024.8.26.0100",
    client: "João Silva",
    type: "Petição",
    size: "2.4 MB",
    uploadDate: "2026-02-25",
    category: "Inicial",
    categoryColor: "text-blue-700",
    categoryBg: "bg-blue-50",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    name: "Contestação — Maria Santos.pdf",
    case: "0007890-12.2024.8.26.0200",
    client: "Maria Santos",
    type: "Contestação",
    size: "1.8 MB",
    uploadDate: "2026-02-24",
    category: "Resposta",
    categoryColor: "text-purple-700",
    categoryBg: "bg-purple-50",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: 3,
    name: "Procuração — Pedro Oliveira.pdf",
    case: "0002345-67.2024.8.26.0300",
    client: "Pedro Oliveira",
    type: "Procuração",
    size: "156 KB",
    uploadDate: "2026-02-23",
    category: "Documento",
    categoryColor: "text-slate-700",
    categoryBg: "bg-slate-50",
    iconBg: "bg-slate-50",
    iconColor: "text-slate-600",
  },
  {
    id: 4,
    name: "Contrato Social — Ana Costa.pdf",
    case: "0003456-78.2024.8.26.0400",
    client: "Ana Costa",
    type: "Contrato",
    size: "3.2 MB",
    uploadDate: "2026-02-22",
    category: "Documento",
    categoryColor: "text-slate-700",
    categoryBg: "bg-slate-50",
    iconBg: "bg-slate-50",
    iconColor: "text-slate-600",
  },
  {
    id: 5,
    name: "Recurso de Apelação — Carlos Mendes.pdf",
    case: "0004567-89.2024.8.26.0500",
    client: "Carlos Mendes",
    type: "Recurso",
    size: "2.1 MB",
    uploadDate: "2026-02-21",
    category: "Recurso",
    categoryColor: "text-amber-700",
    categoryBg: "bg-amber-50",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    id: 6,
    name: "Sentença — Lucia Ferreira.pdf",
    case: "0005678-90.2024.8.26.0600",
    client: "Lucia Ferreira",
    type: "Sentença",
    size: "890 KB",
    uploadDate: "2026-02-20",
    category: "Decisão",
    categoryColor: "text-emerald-700",
    categoryBg: "bg-emerald-50",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: 7,
    name: "Acordo de Homologação — Roberto Lima.pdf",
    case: "0006789-01.2024.8.26.0700",
    client: "Roberto Lima",
    type: "Acordo",
    size: "1.2 MB",
    uploadDate: "2026-02-19",
    category: "Acordo",
    categoryColor: "text-teal-700",
    categoryBg: "bg-teal-50",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    id: 8,
    name: "Laudo Pericial — Sandra Alves.pdf",
    case: "0007890-12.2024.8.26.0800",
    client: "Sandra Alves",
    type: "Laudo",
    size: "5.7 MB",
    uploadDate: "2026-02-18",
    category: "Prova",
    categoryColor: "text-rose-700",
    categoryBg: "bg-rose-50",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
];

const categories = [
  { name: "Todos", icon: FolderOpen },
  { name: "Inicial", icon: FilePlus },
  { name: "Resposta", icon: FileText },
  { name: "Recurso", icon: Scale },
  { name: "Decisão", icon: Gavel },
  { name: "Documento", icon: File },
  { name: "Prova", icon: Shield },
  { name: "Acordo", icon: FileCheck },
];

export function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isDragging, setIsDragging] = useState(false);

  const filteredDocuments = mockDocuments.filter((documentItem) => {
    const matchesSearch =
      documentItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      documentItem.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      documentItem.case.includes(searchTerm);

    const matchesCategory =
      selectedCategory === "Todos" ||
      documentItem.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files);
    alert(`${files.length} arquivo(s) enviado(s) com sucesso!`);
  };

  const handleFileInput = (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length > 0) {
      alert(`${files.length} arquivo(s) enviado(s) com sucesso!`);
    }
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
              Documentos
            </h1>
          </div>

          <p className="text-slate-500 pl-3.5" style={{ fontSize: "13px" }}>
            Gerencie e organize os documentos dos casos
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            label: "Total",
            value: mockDocuments.length,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Esta Semana",
            value: 3,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Petições",
            value: 1,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "MB Total",
            value: "17.5",
            color: "text-slate-600",
            bg: "bg-slate-50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} rounded-2xl p-4 text-center`}
          >
            <p
              className={`font-bold ${stat.color}`}
              style={{ fontSize: "22px", lineHeight: 1 }}
            >
              {stat.value}
            </p>

            <p className="text-slate-500 mt-1" style={{ fontSize: "10px" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl transition-all ${
          isDragging
            ? "border-blue-500 bg-blue-50 scale-[1.01]"
            : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-10 text-center">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${
              isDragging ? "bg-blue-100" : "bg-slate-100"
            }`}
          >
            <Upload
              className={`w-7 h-7 ${
                isDragging ? "text-blue-600" : "text-slate-400"
              }`}
            />
          </div>

          <h3
            className="text-slate-900 font-semibold mb-1"
            style={{ fontSize: "15px" }}
          >
            {isDragging
              ? "Solte os arquivos aqui"
              : "Arraste e solte seus arquivos"}
          </h3>

          <p className="text-slate-400 mb-5" style={{ fontSize: "13px" }}>
            ou clique para selecionar do seu computador
          </p>

          <label htmlFor="file-upload" className="cursor-pointer">
            <span
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl transition-colors font-medium"
              style={{ fontSize: "13px" }}
            >
              <Upload className="w-4 h-4" />
              Selecionar Arquivos
            </span>

            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileInput}
            />
          </label>

          <p className="text-slate-400 mt-4" style={{ fontSize: "11px" }}>
            PDF, DOC, DOCX, JPG, PNG • Máx. 10MB por arquivo
          </p>
        </div>
      </div>

      {/* Search + Count */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

          <Input
            type="text"
            placeholder="Buscar documentos..."
            className="pl-10 h-11 bg-white border-slate-200 rounded-xl"
            style={{ fontSize: "13px" }}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 flex items-center gap-2 flex-shrink-0">
          <Folder className="w-4 h-4 text-blue-600" />
          <span
            className="text-blue-800 font-bold"
            style={{ fontSize: "14px" }}
          >
            {filteredDocuments.length}
          </span>
          <span className="text-blue-600" style={{ fontSize: "11px" }}>
            arquivos
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => {
          const count =
            category.name === "Todos"
              ? mockDocuments.length
              : mockDocuments.filter(
                  (documentItem) => documentItem.category === category.name,
                ).length;

          const Icon = category.icon;

          return (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === category.name
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
              style={{ fontSize: "12px" }}
            >
              <Icon className="w-3.5 h-3.5" />
              {category.name}

              {count > 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-full ${
                    selectedCategory === category.name
                      ? "bg-white/20"
                      : "bg-slate-100"
                  }`}
                  style={{ fontSize: "10px", fontWeight: 600 }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Documents List */}
      <div className="space-y-2.5">
        {filteredDocuments.map((documentItem) => (
          <div
            key={documentItem.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="p-4 flex items-center gap-4">
              <div
                className={`w-11 h-11 ${documentItem.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                <FileText className={`w-5 h-5 ${documentItem.iconColor}`} />
              </div>

              <div className="flex-1 min-w-0">
                <h4
                  className="text-slate-900 font-semibold truncate"
                  style={{ fontSize: "13px" }}
                >
                  {documentItem.name}
                </h4>

                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span
                    className="flex items-center gap-1 text-slate-400"
                    style={{ fontSize: "11px" }}
                  >
                    <User className="w-3 h-3" />
                    {documentItem.client}
                  </span>

                  <span
                    className="flex items-center gap-1 text-slate-400"
                    style={{ fontSize: "11px" }}
                  >
                    <File className="w-3 h-3" />
                    {documentItem.case}
                  </span>

                  <span
                    className="flex items-center gap-1 text-slate-400"
                    style={{ fontSize: "11px" }}
                  >
                    <Calendar className="w-3 h-3" />
                    {new Date(documentItem.uploadDate).toLocaleDateString(
                      "pt-BR",
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <span
                    className={`block px-2.5 py-0.5 rounded-full mb-1 ${documentItem.categoryBg} ${documentItem.categoryColor} font-medium`}
                    style={{ fontSize: "10px" }}
                  >
                    {documentItem.type}
                  </span>

                  <span
                    className="text-slate-400 block text-right"
                    style={{ fontSize: "10px" }}
                  >
                    {documentItem.size}
                  </span>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 bg-slate-50 hover:bg-blue-50 rounded-xl flex items-center justify-center transition-colors">
                    <Eye className="w-3.5 h-3.5 text-slate-400 hover:text-blue-600" />
                  </button>

                  <button className="w-8 h-8 bg-slate-50 hover:bg-blue-50 rounded-xl flex items-center justify-center transition-colors">
                    <Download className="w-3.5 h-3.5 text-slate-400 hover:text-blue-600" />
                  </button>

                  <button className="w-8 h-8 bg-slate-50 hover:bg-red-50 rounded-xl flex items-center justify-center transition-colors">
                    <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-300" />
          </div>

          <p
            className="text-slate-600 font-medium"
            style={{ fontSize: "15px" }}
          >
            Nenhum documento encontrado
          </p>

          <p className="text-slate-400 mt-1" style={{ fontSize: "13px" }}>
            Tente ajustar os filtros de busca
          </p>
        </div>
      )}
    </div>
  );
}
