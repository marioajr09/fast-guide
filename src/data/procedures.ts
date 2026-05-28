import { Zap, Sun, Hand, Sparkles, Syringe, Radio } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ForgotKey = "parametros" | "tempo" | "sequencia" | "configuracao";

export interface QuickInfo {
  title: string;
  videoLength: string;
  video?: VideoSource;
  tutorial: string[];
  checklist: string[];
  commonErrors: string[];
  contraindications: string[];
  parameters: { label: string; value: string }[];
}

export type VideoSource =
  | {
      type: "youtube";
      url: string;
      title?: string;
    }
  | {
      type: "local";
      src: string;
      title?: string;
      poster?: string;
    };

export interface Procedure {
  id: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  color: string;
  info: QuickInfo;
}

export const procedures: Procedure[] = [
  {
    id: "corrente-russa",
    name: "Ultrassom",
    icon: Zap,
    tagline: "Lipólise",
    color: "from-indigo-500 to-violet-600",
    info: {
      title: "Ultrassom",
      videoLength: "00:32",
      video: {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=Z84XlfAMfJ0",
        title: "Demonstração de Ultrassom",
      },
      tutorial: [
        "Higienize a área e posicione os eletrodos sobre o ventre muscular.",
        "Use gel condutor abundante para evitar resistência.",
        "Inicie com intensidade baixa e aumente até contração visível confortável.",
      ],
      checklist: [
        "Higienização: Limpar a área tratada com gaze e álcool 70%.",
        "Acoplamento: Aplique uma camada de gel condutor na região (evitando desta forma queimar o paciente)",
        "Movimentação: Deslize o cabeçote do aparelho de forma constante e lenta, cobrindo todo o quadrante estipulado (geralmente em formato circular).",
        "Tempo: O tempo de aplicação varia conforme a área tratada, calculando a área total sobre a ERA do cabeçote.",
        "Itens: Duas cubetas (uma para o gel que será aplicado na paciente e a outra para retirar o gel após o fim da aplicação).",
      ],
      commonErrors: [
        "Cálculo errado",
        "Pouco gel condutor",
        "Não deslizar constantemente",
        "Deixar a ponteira parada",
        "Parâmetros incorretos",
      ],
      contraindications: [
        "Gestantes/Gravidez",
        "Marcapasso",
        "Câncer ativo",
        "Doenças infecciosas",
        "Trombose",
        "Proteses",
        "Pele lesionada",
      ],
      parameters: [
        { label: "Intensidade", value: "3W/cm²" },
        { label: "Modo", value: "Contínuo" },
        { label: "Cálculo da área", value: "Altura x largura = ycm² (Região aplicada)" },
        { label: "Tempo total", value: "ycm² ÷ ERA = min" },
      ],
    },
  },
  {
    id: "led",
    name: "LED",
    icon: Sun,
    tagline: "Fototerapia",
    color: "from-amber-400 to-pink-500",
    info: {
      title: "LED Terapia",
      videoLength: "00:25",
      video: {
        type: "local",
        src: "/videos/terapia_led.mp4",
        title: "Demonstração de Terapia LED",
      },
      tutorial: [
        "Higienize a pele e retire maquiagem.",
        "Proteja os olhos do cliente com óculos opacos.",
        "Selecione a cor conforme o objetivo do tratamento.",
        "Posicione o aparelho a 5–10 cm da pele.",
        "Inicie a sessão e monitore o conforto do cliente.",
      ],
      checklist: [
        "Pele limpa e seca",
        "Óculos de proteção colocados",
        "Cor/intensidade do LED selecionada",
        "Distância de 5-10cm conferida",
        "Tempo programado",
        "Cliente sem desconforto",
      ],
      commonErrors: [
        "Esquecer proteção ocular",
        "Distância incorreta do aparelho",
        "Usar sobre maquiagem ou ativos fotossensibilizantes",
      ],
      contraindications: [
        "Uso de isotretinoína",
        "Fotossensibilidade",
        "Lúpus, epilepsia fotossensível",
      ],
      parameters: [
        { label: "Vermelho", value: "630 nm — anti-aging" },
        { label: "Azul", value: "415 nm — acne" },
        { label: "Âmbar", value: "590 nm — manchas" },
        { label: "Tempo", value: "10–20 min" },
      ],
    },
  },
  {
    id: "massagem",
    name: "Massagem",
    icon: Hand,
    tagline: "Manual modeladora",
    color: "from-emerald-400 to-teal-600",
    info: {
      title: "Massagem Modeladora",
      videoLength: "00:38",
      video: {
        type: "local",
        src: "/videos/massagem.mp4",
        title: "Demonstração de massagem",
      },
      tutorial: [
        "Aplique óleo ou creme de deslize uniformemente.",
        "Inicie com manobras de deslizamento superficial.",
        "Progrida para amassamento e percussão na área-alvo.",
      ],
      checklist: [
        "Maca limpa",
        "Óleo/creme em quantidade suficiente",
        "Aquecimento prévio da musculatura",
        "Drenagem ao final",
      ],
      commonErrors: [
        "Pressão excessiva causando hematoma",
        "Pular fase de aquecimento",
        "Não finalizar com drenagem",
      ],
      contraindications: [
        "Varizes calibrosas",
        "Trombose",
        "Inflamações agudas",
      ],
      parameters: [
        { label: "Duração", value: "45–60 min" },
        { label: "Pressão", value: "Moderada a profunda" },
        { label: "Sentido", value: "Distal → proximal" },
      ],
    },
  },
  {
    id: "limpeza-pele",
    name: "Limpeza de Pele",
    icon: Sparkles,
    tagline: "Higienização profunda",
    color: "from-sky-400 to-blue-600",
    info: {
      title: "Limpeza de Pele Profunda",
      videoLength: "00:35",
      tutorial: [
        "Higienize com sabonete adequado ao tipo de pele.",
        "Aplique esfoliante e emoliente conforme necessidade.",
        "Realize extração com gaze e dedos protegidos.",
        "Finalize com tônico, máscara calmante e protetor.",
      ],
      checklist: [
        "Higienização",
        "Esfoliação",
        "Emoliência (vapor 8–10 min)",
        "Extração",
        "Alta frequência",
        "Máscara calmante",
        "FPS",
      ],
      commonErrors: [
        "Extração sem emoliência adequada",
        "Pressão excessiva gerando lesão",
        "Não aplicar FPS no final",
      ],
      contraindications: [
        "Acne grau III/IV ativa",
        "Rosácea em crise",
        "Herpes ativo",
      ],
      parameters: [
        { label: "Vapor de ozônio", value: "8–10 min" },
        { label: "Alta frequência", value: "3–5 min" },
        { label: "Sessão total", value: "60–75 min" },
      ],
    },
  },
  {
    id: "microagulhamento",
    name: "Microagulhamento",
    icon: Syringe,
    tagline: "Indução de colágeno",
    color: "from-rose-400 to-fuchsia-600",
    info: {
      title: "Microagulhamento",
      videoLength: "00:30",
      tutorial: [
        "Antissepsia com clorexidina aquosa.",
        "Aplicar anestésico tópico e aguardar 30–40 min.",
        "Passar dermaroller/caneta em 4 direções até eritema uniforme.",
        "Aplicar ativo permeável e máscara calmante.",
      ],
      checklist: [
        "Material estéril",
        "Antissepsia",
        "Anestésico aplicado",
        "Profundidade da agulha definida",
        "Ativo de permeação",
        "Pós: FPS rigoroso",
      ],
      commonErrors: [
        "Reutilizar ponteira",
        "Profundidade incorreta para a região",
        "Aplicar ativo não indicado para permeação",
      ],
      contraindications: [
        "Gestantes e lactantes",
        "Isotretinoína recente (<6 meses)",
        "Infecções ativas, queloides",
      ],
      parameters: [
        { label: "Face — rejuvenescimento", value: "0,5–1,0 mm" },
        { label: "Estrias e cicatrizes", value: "1,5–2,0 mm" },
        { label: "Couro cabeludo", value: "0,5–1,0 mm" },
        { label: "Intervalo entre sessões", value: "30 dias" },
      ],
    },
  },
  {
    id: "radiofrequencia",
    name: "Radiofrequência",
    icon: Radio,
    tagline: "Aquecimento dérmico",
    color: "from-orange-400 to-red-600",
    info: {
      title: "Radiofrequência Facial",
      videoLength: "00:33",
      tutorial: [
        "Higienize a pele e aplique gel próprio de RF.",
        "Movimentos circulares contínuos sem parar em um ponto.",
        "Monitore temperatura: 40–42 °C por 5–8 min por área.",
      ],
      checklist: [
        "Gel de RF (não condutor)",
        "Termômetro infravermelho",
        "Eletrodo limpo",
        "Movimentos contínuos",
        "Hidratação pós",
      ],
      commonErrors: [
        "Parar o movimento sobre um ponto (queimadura)",
        "Gel insuficiente",
        "Não controlar a temperatura",
      ],
      contraindications: [
        "Implantes metálicos na área",
        "Marcapasso",
        "Gestantes, câncer ativo",
      ],
      parameters: [
        { label: "Temperatura alvo", value: "40–42 °C" },
        { label: "Tempo por área", value: "5–8 min" },
        { label: "Movimentos", value: "Circulares contínuos" },
        { label: "Intervalo", value: "7–15 dias" },
      ],
    },
  },
];

export const forgotOptions: { key: ForgotKey; label: string; hint: string }[] = [
  { key: "parametros", label: "Parâmetros", hint: "Frequência, intensidade, tempo" },
  { key: "tempo", label: "Tempo e Dose", hint: "Duração por área e energia recomendada (Joules)" },
  { key: "sequencia", label: "Sequência", hint: "Ordem das etapas" },
  { key: "configuracao", label: "Ajustes e movimentos", hint: "Como ajustar o aparelho, manobras e direção" },
];
