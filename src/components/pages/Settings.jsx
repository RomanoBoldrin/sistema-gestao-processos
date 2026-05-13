import { useState } from "react";
import {
  Settings,
  Moon,
  Sun,
  Monitor,
  Bell,
  BellOff,
  Shield,
  FileText,
  HelpCircle,
  MessageSquare,
  Lock,
  User,
  Trash2,
  ChevronRight,
  Check,
  Mail,
  Phone,
  Globe,
  Key,
  LogOut,
  AlertTriangle,
  Download,
  Camera,
} from "lucide-react";

const SectionTitle = ({ icon: Icon, title, description }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-9 h-9 bg-blue-600/15 border border-blue-600/25 rounded-xl flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-blue-400" />
    </div>
    <div>
      <h2 className="text-white font-semibold" style={{ fontSize: "15px" }}>
        {title}
      </h2>
      {description && (
        <p className="text-slate-500" style={{ fontSize: "12px" }}>
          {description}
        </p>
      )}
    </div>
  </div>
);

const ToggleSwitch = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between py-3">
    <div>
      <p
        className="text-slate-200"
        style={{ fontSize: "13px", fontWeight: 500 }}
      >
        {label}
      </p>
      {description && (
        <p className="text-slate-500 mt-0.5" style={{ fontSize: "11px" }}>
          {description}
        </p>
      )}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ${
        enabled ? "bg-blue-600" : "bg-slate-700"
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200 ${
          enabled ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  </div>
);

const LinkRow = ({ icon: Icon, label, description, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 py-3 text-left group rounded-xl px-1 -mx-1 hover:bg-slate-800/50 transition-colors ${
      danger ? "hover:bg-red-500/5" : ""
    }`}
  >
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        danger ? "bg-red-500/10" : "bg-slate-800"
      }`}
    >
      <Icon
        className={`w-4 h-4 ${danger ? "text-red-400" : "text-slate-400"}`}
      />
    </div>
    <div className="flex-1 min-w-0">
      <p
        className={`font-medium ${danger ? "text-red-400" : "text-slate-200"}`}
        style={{ fontSize: "13px" }}
      >
        {label}
      </p>
      {description && (
        <p className="text-slate-500 truncate" style={{ fontSize: "11px" }}>
          {description}
        </p>
      )}
    </div>
    <ChevronRight
      className={`w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform ${danger ? "text-red-400/50" : "text-slate-600"}`}
    />
  </button>
);

const Divider = () => <div className="h-px bg-slate-800 my-1" />;

export function SettingsPage({ theme, setTheme }) {
  const [activeTab, setActiveTab] = useState("aparencia");

  const [notifications, setNotifications] = useState({
    prazos: true,
    audiencias: true,
    documentos: false,
    clientes: true,
    faturamento: true,
    email: true,
    push: false,
    sms: false,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const tabs = [
    { id: "aparencia", label: "Aparência", icon: Sun },
    { id: "notificacoes", label: "Notificações", icon: Bell },
    { id: "conta", label: "Conta", icon: User },
    { id: "privacidade", label: "Privacidade", icon: Shield },
    { id: "ajuda", label: "Central de Ajuda", icon: HelpCircle },
    { id: "contato", label: "Fale Conosco", icon: MessageSquare },
    { id: "termos", label: "Termos", icon: FileText },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/60 px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1
              className="text-slate-900 dark:text-white font-semibold"
              style={{ fontSize: "18px" }}
            >
              Configurações
            </h1>
            <p className="text-slate-500" style={{ fontSize: "12px" }}>
              Personalize sua experiência no sistema
            </p>
          </div>
        </div>
      </div>

      <div className="flex h-full">
        {/* Sidebar Tabs */}
        <div className="w-52 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700/60 p-3 flex-shrink-0 min-h-[calc(100vh-81px)]">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span
                    className="font-medium truncate"
                    style={{ fontSize: "12px" }}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-2xl">
            {/* Aparência */}
            {activeTab === "aparencia" && (
              <div>
                <SectionTitle
                  icon={Sun}
                  title="Aparência"
                  description="Personalize o visual do sistema"
                />

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 space-y-5">
                  <div>
                    <p
                      className="text-slate-700 dark:text-slate-300 font-medium mb-3"
                      style={{ fontSize: "13px" }}
                    >
                      Tema do sistema
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "light", label: "Claro", icon: Sun },
                        { id: "dark", label: "Escuro", icon: Moon },
                        { id: "system", label: "Sistema", icon: Monitor },
                      ].map((t) => {
                        const TIcon = t.icon;
                        const isSelected = theme === t.id;
                        return (
                          <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all ${
                              isSelected
                                ? "border-blue-500 bg-blue-500/5"
                                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                isSelected
                                  ? "bg-blue-600 text-white"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              <TIcon className="w-4 h-4" />
                            </div>
                            <span
                              className={`font-medium ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"}`}
                              style={{ fontSize: "12px" }}
                            >
                              {t.label}
                            </span>
                            {isSelected && (
                              <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <p
                      className="text-slate-700 dark:text-slate-300 font-medium mb-3"
                      style={{ fontSize: "13px" }}
                    >
                      Tamanho da fonte
                    </p>
                    <div className="flex items-center gap-3">
                      {["Pequeno", "Médio", "Grande"].map((size, i) => (
                        <button
                          key={size}
                          className={`flex-1 py-2 rounded-xl border text-center transition-all ${
                            i === 1
                              ? "border-blue-500 bg-blue-500/5 text-blue-600 dark:text-blue-400"
                              : "border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300"
                          }`}
                          style={{ fontSize: `${11 + i}px` }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <p
                      className="text-slate-700 dark:text-slate-300 font-medium mb-3"
                      style={{ fontSize: "13px" }}
                    >
                      Idioma
                    </p>
                    <select
                      className="w-full h-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500"
                      style={{ fontSize: "13px" }}
                    >
                      <option>Português (Brasil)</option>
                      <option>English (US)</option>
                      <option>Español</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notificações */}
            {activeTab === "notificacoes" && (
              <div>
                <SectionTitle
                  icon={Bell}
                  title="Notificações"
                  description="Gerencie como e quando receber alertas"
                />

                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5">
                    <p
                      className="text-slate-500 uppercase tracking-widest mb-3"
                      style={{ fontSize: "10px", fontWeight: 600 }}
                    >
                      Tipos de Notificação
                    </p>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      <ToggleSwitch
                        enabled={notifications.prazos}
                        onChange={(v) =>
                          setNotifications({ ...notifications, prazos: v })
                        }
                        label="Prazos processuais"
                        description="Alertas de vencimento de prazos"
                      />
                      <ToggleSwitch
                        enabled={notifications.audiencias}
                        onChange={(v) =>
                          setNotifications({ ...notifications, audiencias: v })
                        }
                        label="Audiências e sessões"
                        description="Lembretes de audiências agendadas"
                      />
                      <ToggleSwitch
                        enabled={notifications.documentos}
                        onChange={(v) =>
                          setNotifications({ ...notifications, documentos: v })
                        }
                        label="Novos documentos"
                        description="Quando documentos forem adicionados"
                      />
                      <ToggleSwitch
                        enabled={notifications.clientes}
                        onChange={(v) =>
                          setNotifications({ ...notifications, clientes: v })
                        }
                        label="Atividades de clientes"
                        description="Atualizações de cadastro e comunicação"
                      />
                      <ToggleSwitch
                        enabled={notifications.faturamento}
                        onChange={(v) =>
                          setNotifications({ ...notifications, faturamento: v })
                        }
                        label="Faturamento"
                        description="Pagamentos e faturas em aberto"
                      />
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5">
                    <p
                      className="text-slate-500 uppercase tracking-widest mb-3"
                      style={{ fontSize: "10px", fontWeight: 600 }}
                    >
                      Canais
                    </p>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      <ToggleSwitch
                        enabled={notifications.email}
                        onChange={(v) =>
                          setNotifications({ ...notifications, email: v })
                        }
                        label="E-mail"
                        description="Receber notificações por e-mail"
                      />
                      <ToggleSwitch
                        enabled={notifications.push}
                        onChange={(v) =>
                          setNotifications({ ...notifications, push: v })
                        }
                        label="Notificações push"
                        description="Alertas no navegador"
                      />
                      <ToggleSwitch
                        enabled={notifications.sms}
                        onChange={(v) =>
                          setNotifications({ ...notifications, sms: v })
                        }
                        label="SMS"
                        description="Mensagens de texto para urgências"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Conta */}
            {activeTab === "conta" && (
              <div>
                <SectionTitle
                  icon={User}
                  title="Gerenciamento de Conta"
                  description="Gerencie suas informações e acesso"
                />

                <div className="space-y-4">
                  {/* Profile Card */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                          <span
                            className="text-white font-semibold"
                            style={{ fontSize: "22px" }}
                          >
                            AD
                          </span>
                        </div>
                        <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-full flex items-center justify-center transition-colors">
                          <Camera className="w-3 h-3 text-white" />
                        </button>
                      </div>
                      <div>
                        <p
                          className="text-white font-semibold"
                          style={{ fontSize: "15px" }}
                        >
                          Dr. Advogado
                        </p>
                        <p
                          className="text-slate-400"
                          style={{ fontSize: "12px" }}
                        >
                          admin@direitopublico.com
                        </p>
                        <span
                          className="inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full px-2 py-0.5 mt-1"
                          style={{ fontSize: "10px" }}
                        >
                          <Check className="w-2.5 h-2.5" /> Conta Verificada
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          className="text-slate-500 block mb-1"
                          style={{ fontSize: "11px" }}
                        >
                          Nome completo
                        </label>
                        <input
                          defaultValue="Dr. Advogado"
                          className="w-full h-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                          style={{ fontSize: "13px" }}
                        />
                      </div>
                      <div>
                        <label
                          className="text-slate-500 block mb-1"
                          style={{ fontSize: "11px" }}
                        >
                          OAB
                        </label>
                        <input
                          defaultValue="SP 123456"
                          className="w-full h-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                          style={{ fontSize: "13px" }}
                        />
                      </div>
                      <div>
                        <label
                          className="text-slate-500 block mb-1"
                          style={{ fontSize: "11px" }}
                        >
                          E-mail
                        </label>
                        <input
                          defaultValue="admin@direitopublico.com"
                          className="w-full h-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                          style={{ fontSize: "13px" }}
                        />
                      </div>
                      <div>
                        <label
                          className="text-slate-500 block mb-1"
                          style={{ fontSize: "11px" }}
                        >
                          Telefone
                        </label>
                        <input
                          defaultValue="(11) 99999-0000"
                          className="w-full h-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                          style={{ fontSize: "13px" }}
                        />
                      </div>
                    </div>

                    <button className="mt-4 h-10 px-5 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white rounded-xl font-medium transition-all text-sm shadow-lg shadow-blue-900/20">
                      Salvar alterações
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5">
                    <p
                      className="text-slate-500 uppercase tracking-widest mb-3"
                      style={{ fontSize: "10px", fontWeight: 600 }}
                    >
                      Segurança
                    </p>
                    <LinkRow
                      icon={Key}
                      label="Alterar senha"
                      description="Última alteração há 30 dias"
                      onClick={() => setShowPasswordModal(true)}
                    />
                    <Divider />
                    <LinkRow
                      icon={Download}
                      label="Exportar meus dados"
                      description="Baixar todos os seus dados em JSON"
                      onClick={() => {}}
                    />
                    <Divider />
                    <LinkRow
                      icon={LogOut}
                      label="Encerrar todas as sessões"
                      description="Desconectar de todos os dispositivos"
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Privacidade */}
            {activeTab === "privacidade" && (
              <div>
                <SectionTitle
                  icon={Shield}
                  title="Política de Privacidade"
                  description="Como tratamos seus dados"
                />

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6 space-y-5">
                  {[
                    {
                      title: "Coleta de dados",
                      text: "Coletamos apenas os dados necessários para o funcionamento do sistema, incluindo informações de processos, clientes e documentos inseridos por você. Não compartilhamos dados com terceiros sem seu consentimento explícito.",
                    },
                    {
                      title: "Armazenamento e segurança",
                      text: "Todas as informações são armazenadas com criptografia AES-256 em servidores localizados no Brasil, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).",
                    },
                    {
                      title: "Seus direitos (LGPD)",
                      text: "Você tem direito de acessar, corrigir, excluir ou exportar seus dados a qualquer momento. Para exercer esses direitos, utilize as opções em Gerenciamento de Conta ou entre em contato com nossa equipe.",
                    },
                    {
                      title: "Cookies e rastreamento",
                      text: "Utilizamos cookies estritamente necessários para manter sua sessão ativa. Não utilizamos cookies de rastreamento publicitário ou compartilhamos dados com plataformas de anúncios.",
                    },
                    {
                      title: "Retenção de dados",
                      text: "Seus dados são mantidos enquanto sua conta estiver ativa. Após exclusão da conta, os dados são removidos permanentemente em até 30 dias, exceto quando exigido por obrigação legal.",
                    },
                  ].map((section) => (
                    <div key={section.title}>
                      <h3
                        className="text-slate-200 font-semibold mb-1.5"
                        style={{ fontSize: "13px" }}
                      >
                        {section.title}
                      </h3>
                      <p
                        className="text-slate-500 leading-relaxed"
                        style={{ fontSize: "12px" }}
                      >
                        {section.text}
                      </p>
                    </div>
                  ))}

                  <div className="pt-2">
                    <p className="text-slate-600" style={{ fontSize: "11px" }}>
                      Última atualização: 01 de maio de 2025 • Versão 2.1
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Central de Ajuda */}
            {activeTab === "ajuda" && (
              <div>
                <SectionTitle
                  icon={HelpCircle}
                  title="Central de Ajuda"
                  description="Encontre respostas para suas dúvidas"
                />

                <div className="space-y-3">
                  {[
                    {
                      q: "Como cadastrar um novo processo?",
                      a: "Clique no botão azul (+) no canto inferior direito da tela para abrir o formulário de cadastro. Preencha todos os campos obrigatórios e clique em Criar Caso.",
                    },
                    {
                      q: "Como exportar documentos em PDF?",
                      a: "Acesse a seção Documentos, selecione o arquivo desejado e clique no ícone de download. O arquivo será salvo no formato original ou convertido para PDF.",
                    },
                    {
                      q: "Como configurar alertas de prazo?",
                      a: "Vá em Configurações > Notificações e ative a opção Prazos processuais. Você pode definir com quantos dias de antecedência deseja ser notificado na aba Calendário.",
                    },
                    {
                      q: "É possível ter múltiplos usuários?",
                      a: "Sim. O plano Equipe permite adicionar advogados e assistentes com diferentes níveis de permissão. Acesse Gerenciamento de Conta para convidar membros.",
                    },
                    {
                      q: "Como fazer backup dos dados?",
                      a: "Acesse Configurações > Gerenciamento de Conta > Exportar meus dados para baixar todos os seus dados em formato JSON. Recomendamos fazer backup mensalmente.",
                    },
                    {
                      q: "O sistema funciona offline?",
                      a: "O sistema requer conexão com a internet para funcionar completamente.",
                    },
                  ].map((item, i) => (
                    <details
                      key={i}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden group"
                    >
                      <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer list-none">
                        <span
                          className="text-slate-200 font-medium"
                          style={{ fontSize: "13px" }}
                        >
                          {item.q}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="px-5 pb-4 border-t border-slate-800">
                        <p
                          className="text-slate-500 leading-relaxed pt-3"
                          style={{ fontSize: "12px" }}
                        >
                          {item.a}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Fale Conosco */}
            {activeTab === "contato" && (
              <div>
                <SectionTitle
                  icon={MessageSquare}
                  title="Fale Conosco"
                  description="Entre em contato com nossa equipe"
                />

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        icon: Mail,
                        label: "E-mail",
                        value: "suporte@direitopublico.com",
                      },
                      {
                        icon: Phone,
                        label: "Telefone",
                        value: "(11) 3000-0000",
                      },
                      {
                        icon: Globe,
                        label: "Site",
                        value: "www.direitopublico.com",
                      },
                    ].map((c) => {
                      const Icon = c.icon;
                      return (
                        <div
                          key={c.label}
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 flex flex-col items-center text-center gap-2"
                        >
                          <div className="w-9 h-9 bg-blue-600/10 border border-blue-600/20 rounded-xl flex items-center justify-center">
                            <Icon className="w-4 h-4 text-blue-400" />
                          </div>
                          <p
                            className="text-slate-500"
                            style={{ fontSize: "10px" }}
                          >
                            {c.label}
                          </p>
                          <p
                            className="text-slate-300 font-medium"
                            style={{ fontSize: "11px" }}
                          >
                            {c.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5">
                    <p
                      className="text-slate-300 font-semibold mb-4"
                      style={{ fontSize: "14px" }}
                    >
                      Enviar mensagem
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label
                          className="text-slate-500 block mb-1"
                          style={{ fontSize: "11px" }}
                        >
                          Assunto
                        </label>
                        <select
                          className="w-full h-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500"
                          style={{ fontSize: "13px" }}
                        >
                          <option>Suporte técnico</option>
                          <option>Dúvida sobre funcionalidade</option>
                          <option>Problema com cobrança</option>
                          <option>Sugestão de melhoria</option>
                          <option>Outro</option>
                        </select>
                      </div>
                      <div>
                        <label
                          className="text-slate-500 block mb-1"
                          style={{ fontSize: "11px" }}
                        >
                          Mensagem
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Descreva sua dúvida ou problema em detalhes..."
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-700 dark:text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                          style={{ fontSize: "13px" }}
                        />
                      </div>
                      <button className="h-10 px-6 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white rounded-xl font-medium transition-all text-sm shadow-lg shadow-blue-900/20">
                        Enviar mensagem
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl px-4 py-3">
                    <p
                      className="text-blue-400 font-medium"
                      style={{ fontSize: "12px" }}
                    >
                      ⏱ Tempo médio de resposta: até 4 horas úteis
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Termos */}
            {activeTab === "termos" && (
              <div>
                <SectionTitle
                  icon={FileText}
                  title="Termos de Uso"
                  description="Condições de uso do sistema"
                />

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6 space-y-5">
                  {[
                    {
                      title: "1. Aceitação dos termos",
                      text: "Ao utilizar o Sistema de Gestão de Processos, você concorda com estes Termos de Uso. Se não concordar com alguma condição, solicitamos que encerre o uso do sistema.",
                    },
                    {
                      title: "2. Uso permitido",
                      text: "O sistema é licenciado para uso exclusivo de advogados, escritórios de advocacia e profissionais jurídicos devidamente habilitados. É vedada a revenda, sublicenciamento ou uso indevido da plataforma.",
                    },
                    {
                      title: "3. Responsabilidade pelos dados",
                      text: "O usuário é o único responsável pela veracidade, integridade e legalidade dos dados inseridos no sistema. A Direito Público Ltda. não se responsabiliza por informações incorretas ou uso inadequado do sistema.",
                    },
                    {
                      title: "4. Disponibilidade do serviço",
                      text: "Garantimos disponibilidade de 99,5% ao mês. Manutenções programadas serão comunicadas com antecedência mínima de 24 horas. Não nos responsabilizamos por falhas decorrentes de problemas na infraestrutura de internet do usuário.",
                    },
                    {
                      title: "5. Propriedade intelectual",
                      text: "Todo o código-fonte, design e funcionalidades do sistema são propriedade exclusiva da Direito Público Ltda. e protegidos pela legislação de propriedade intelectual brasileira.",
                    },
                    {
                      title: "6. Rescisão",
                      text: "Reservamos o direito de suspender ou encerrar contas que violem estes termos, com ou sem aviso prévio, dependendo da gravidade da infração.",
                    },
                  ].map((section) => (
                    <div key={section.title}>
                      <h3
                        className="text-slate-200 font-semibold mb-1.5"
                        style={{ fontSize: "13px" }}
                      >
                        {section.title}
                      </h3>
                      <p
                        className="text-slate-500 leading-relaxed"
                        style={{ fontSize: "12px" }}
                      >
                        {section.text}
                      </p>
                    </div>
                  ))}

                  <div className="pt-2 flex items-center justify-between">
                    <p className="text-slate-600" style={{ fontSize: "11px" }}>
                      Última atualização: 01 de maio de 2025 • Versão 3.0
                    </p>
                    <button
                      className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                      style={{ fontSize: "11px" }}
                    >
                      <Download className="w-3 h-3" /> Baixar PDF
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h3
              className="text-white font-semibold text-center mb-2"
              style={{ fontSize: "16px" }}
            >
              Excluir conta?
            </h3>
            <p
              className="text-slate-400 text-center mb-5"
              style={{ fontSize: "13px" }}
            >
              Esta ação é permanente e irreversível. Todos os seus dados,
              processos e documentos serão excluídos.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full h-10 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors text-sm"
              >
                Cancelar
              </button>
              <button className="w-full h-10 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors text-sm">
                Excluir permanentemente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-white font-semibold mb-4"
              style={{ fontSize: "16px" }}
            >
              Alterar senha
            </h3>
            <div className="space-y-3">
              {["Senha atual", "Nova senha", "Confirmar nova senha"].map(
                (label, i) => (
                  <div key={label}>
                    <label
                      className="text-slate-500 block mb-1"
                      style={{ fontSize: "11px" }}
                    >
                      {label}
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full h-10 bg-slate-800 border border-slate-700 rounded-xl px-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                      style={{ fontSize: "13px" }}
                    />
                  </div>
                ),
              )}
            </div>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 h-10 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors text-sm"
              >
                Cancelar
              </button>
              <button className="flex-1 h-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-medium text-sm">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
