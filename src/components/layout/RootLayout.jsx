import { useState } from "react";
import { Plus, Scale, X } from "lucide-react";

import { Sidebar } from "@/components/layout/Sidebar";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RootLayout({ children }) {
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);

  const [formData, setFormData] = useState({
    caseNumber: "",
    clientName: "",
    caseType: "",
    description: "",
    deadline: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Novo caso criado com sucesso!");
    setIsNewCaseOpen(false);
    setFormData({
      caseNumber: "",
      clientName: "",
      caseType: "",
      description: "",
      deadline: "",
    });
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-7 right-7 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white rounded-2xl shadow-xl shadow-blue-900/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-30"
        onClick={() => setIsNewCaseOpen(true)}
        title="Novo Caso"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* New Case Modal Overlay */}
      {isNewCaseOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsNewCaseOpen(false);
          }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 px-7 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
                  <Scale className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <h2
                    className="text-white font-semibold"
                    style={{ fontSize: "17px" }}
                  >
                    Novo Caso
                  </h2>
                  <p className="text-blue-300" style={{ fontSize: "12px" }}>
                    Cadastre um novo processo jurídico
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsNewCaseOpen(false)}
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-7 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="caseNumber"
                    className="text-slate-700 font-medium mb-2 block"
                    style={{ fontSize: "13px" }}
                  >
                    Número do Processo
                  </Label>

                  <Input
                    id="caseNumber"
                    value={formData.caseNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, caseNumber: e.target.value })
                    }
                    placeholder="0000000-00.0000.0.00.0000"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
                    style={{ fontSize: "13px" }}
                    required
                  />
                </div>

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
                    value={formData.clientName}
                    onChange={(e) =>
                      setFormData({ ...formData, clientName: e.target.value })
                    }
                    placeholder="Nome completo"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
                    style={{ fontSize: "13px" }}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="caseType"
                    className="text-slate-700 font-medium mb-2 block"
                    style={{ fontSize: "13px" }}
                  >
                    Tipo de Ação
                  </Label>

                  <Select
                    value={formData.caseType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, caseType: value })
                    }
                  >
                    <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="administrativo">
                        Direito Administrativo
                      </SelectItem>
                      <SelectItem value="constitucional">
                        Direito Constitucional
                      </SelectItem>
                      <SelectItem value="tributario">
                        Direito Tributário
                      </SelectItem>
                      <SelectItem value="previdenciario">
                        Direito Previdenciário
                      </SelectItem>
                      <SelectItem value="civil">Direito Civil</SelectItem>
                      <SelectItem value="trabalhista">
                        Direito Trabalhista
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="deadline"
                    className="text-slate-700 font-medium mb-2 block"
                    style={{ fontSize: "13px" }}
                  >
                    Próximo Prazo
                  </Label>

                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({ ...formData, deadline: e.target.value })
                    }
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white"
                    style={{ fontSize: "13px" }}
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="description"
                  className="text-slate-700 font-medium mb-2 block"
                  style={{ fontSize: "13px" }}
                >
                  Descrição do Caso
                </Label>

                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Descreva o objeto da ação, partes envolvidas e principais fatos..."
                  rows={4}
                  className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white resize-none"
                  style={{ fontSize: "13px" }}
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewCaseOpen(false)}
                  className="flex-1 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
                  style={{ fontSize: "14px" }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-900/20"
                  style={{ fontSize: "14px" }}
                >
                  Criar Caso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
