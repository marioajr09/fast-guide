import { Zap, Sun, Hand, Sparkles, Syringe, Radio } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ForgotKey = "parametros" | "tempo" | "sequencia" | "configuracao";

export interface ParameterItem {
  label: string;
  value: string;
}

export interface ParameterGroup {
  title: string;
  items: ParameterItem[];
}

export interface QuickInfo {
  title: string;
  videoLength: string;
  video?: VideoSource;
  tutorial: string[];
  checklist: string[];
  commonErrors: string[];
  contraindications: string[];
  parameters: ParameterItem[];
  parameterGroups?: ParameterGroup[];
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
        type: "youtube",
        url: "https://www.youtube.com/watch?v=er5gAur_KlA",
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
    name: "Drenagem Linfática",
    icon: Hand,
    tagline: "Desintoxicação e relaxamento",
    color: "from-emerald-400 to-teal-600",
    info: {
      title: "Drenagem Linfática",
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
      video: {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=ZWxUxGPZ9EM",
        title: "Demonstração de Limpeza de Pele",
      },
      tutorial: [
        "Higienize a pele com produto adequado ao tipo de pele.",
        "Realize a esfoliação para remover células mortas e preparar a pele.",
        "Aplique uma camada emoliente em creme e gaze com emoliente líquido; deixe agir por cerca de 20 minutos.",
        "Realize a extração com cuidado, usando gaze e dedos protegidos.",
        "Faça a cauterização conforme o protocolo utilizado.",
        "Aplique máscara ou sérum de tratamento e deixe agir por aproximadamente 10 minutos.",
        "Finalize com máscara calmante ou finalizadora.",
        "Aplique filtro solar para proteção após o procedimento.",
      ],
      checklist: [
        "Higienização",
        "Esfoliação",
        "Emoliência",
        "Extração",
        "Cauterização",
        "Máscara ou sérum de tratamento",
        "Máscara para finalizar",
        "Filtro solar",
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
        { label: "Camada emoliente em creme + gaze com emoliente líquido", value: "20min" },
        { label: "Máscara de tratamento", value: "10min" },
        { label: "Sessão total", value: "1h-1h20min" },
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
      video: {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=fcZ_l8hUGZ8",
        title: "Demonstração de Microagulhamento",
      },
      tutorial: [
        "Higienize a pele antes de iniciar o procedimento.",
        "Realize antissepsia adequada da área tratada.",
        "Aplique anestésico quando necessário e aguarde o tempo indicado.",
        "Realize o microagulhamento com movimentos horizontais, verticais e diagonais.",
        "Mantenha a pele tracionada, com pressão uniforme e controlada.",
        "Movimentos: Horizontal, vertical e diagonal.",
        "Não repetir excessivamente na mesma área.",
        "Aplique drug delivery ou ativos indicados conforme o objetivo.",
        "Finalize com orientações pós-procedimento.",
      ],
      checklist: [
        "Material estéril",
        "Pele higienizada",
        "Antissepsia",
        "Anestésico (se necessário)",
        "Pele tracionada",
        "Ativo de drug delivery selecionado",
        "Orientações pós-procedimento passadas",
      ],
      commonErrors: [
        "Excesso de pressão",
        "Sobrepor áreas",
        "Fazer movimentos curvos",
        "Não tracionar a pele",
        "Levantar o aparelho em movimento",
        "Usar cosméticos contaminados",
        "Não respeitar intervalo entre sessões",
      ],
      contraindications: [
        "Acne ativa",
        "Infecção de pele",
        "Rosácea ativa",
        "Diabetes descompensada",
        "Gravidez",
        "Uso de isotretinoína (Roacutan)",
        "Tendência a queloide",
        "Câncer de pele",
        "Distúrbios hemorrágicos",
        "Uso de anticoagulantes",
        "Alergia a metais",
      ],
      parameters: [
        { label: "Face", value: "20–40 min" },
        { label: "Couro cabeludo", value: "15–30 min" },
        { label: "Estrias e cicatrizes", value: "10–20 min" },
        { label: "Média de sessões (conforme objetivo)", value: "4-10" },
      ],
      parameterGroups: [
        {
          title: "Tempo e dose",
          items: [
            { label: "Face", value: "20–40 min" },
            { label: "Couro cabeludo", value: "15–30 min" },
            { label: "Estrias/cicatrizes", value: "10–20 min" },
            { label: "Sessões", value: "4–10, conforme objetivo" },
          ],
        },
        {
          title: "Tamanho das agulhas",
          items: [
            { label: "Drug delivery", value: "0,25–0,50 mm" },
            { label: "Rejuvenescimento", value: "0,50–1,0 mm" },
            { label: "Melasma/manchas", value: "0,25–0,50 mm" },
            { label: "Poros dilatados", value: "0,50–1,0 mm" },
            { label: "Cicatriz de acne", value: "até 1,0 mm" },
            { label: "Estrias", value: "1,5–2,5 mm" },
            { label: "Couro cabeludo/alopecia", value: "0,5–1,5 mm" },
            { label: "Flacidez corporal", value: "1,0–2,0 mm" },
          ],
        },
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
      title: "Radiofrequência",
      videoLength: "00:33",
      tutorial: [
        "Higienize a pele da área tratada.",
        "Aplique gel glicerinado e confira se há meio de deslizamento suficiente.",
        "Ajuste o aparelho conforme a área e o objetivo do tratamento.",
        "Faça a aplicação com a ponteira sempre em movimento.",
        "Monitore a temperatura durante toda a aplicação.",
        "Finalize com hidratação usando creme calmante.",
      ],
      checklist: [
        "Higienização",
        "Aplicar gel glicerinado",
        "Aplicação do meio de deslizamento",
        "Ajuste do aparelho",
        "Aplicação",
        "Controle da temperatura",
        "Hidratação com creme calmante",
      ],
      commonErrors: [
        "Não monitorar a temperatura",
        "Usar potência excessiva",
        "Deixar a ponteira parada",
        "Usar pouco meio de deslizamento",
        "Uso inadequado de gel glicerinado",
        "Aplicar rápido demais",
        "Aplicar em região facial com gordura, como bochechas",
      ],
      contraindications: [
        "Marcapasso",
        "Gestantes",
        "Lactantes",
        "Câncer",
        "Epilepsia",
        "Dermatites",
        "Implantes metálicos",
        "Uso de corticoides ou anti-inflamatórios",
      ],
      parameters: [
        { label: "Facial", value: "38–40 °C" },
        { label: "Corporal", value: "40–42 °C" },
        { label: "Intervalo entre sessões", value: "21 dias" },
        { label: "Média de sessões", value: "4–10" },
      ],
      parameterGroups: [
        // {
        //   title: "Indicações",
        //   items: [
        //     { label: "Facial e corporal", value: "Flacidez" },
        //     { label: "Face", value: "Rugas e linhas finas" },
        //     { label: "Corpo", value: "Celulite e estrias" },
        //     { label: "Reparação", value: "Cicatrizes" },
        //     { label: "Objetivo geral", value: "Rejuvenescimento e elasticidade" },
        //   ],
        // },
        {
          title: "Temperatura",
          items: [
            { label: "Facial", value: "38–40 °C" },
            { label: "Corporal", value: "40–42 °C" },
            { label: "Atenção facial", value: "Evitar regiões com gordura, como bochechas" },
          ],
        },
        {
          title: "Tempo",
          items: [
            { label: "Facial", value: "Por quadrante, geralmente 5 x 5" },
            { label: "Corporal 10 x 10", value: "10 min" },
            { label: "Corporal 15 x 15", value: "15 min" },
            { label: "Corporal 20 x 20", value: "20 min" },
          ],
        },
        {
          title: "Sessões",
          items: [
            { label: "Frequência", value: "1 sessão a cada 21 dias" },
            { label: "Justificativa", value: "Tempo de regeneração de colágeno" },
            { label: "Quantidade média", value: "4–10 sessões" },
          ],
        },
        {
          title: "Movimentos por área",
          items: [
            { label: "Facial", value: "Circulares pequenos e ascendentes" },
            { label: "Pressão facial", value: "Leve" },
            { label: "Corporal", value: "Circulares amplos e lentos" },
            { label: "Pressão corporal", value: "Moderada" },
          ],
        },
        {
          title: "Recomendações por área",
          items: [
            { label: "Flacidez facial", value: "Menor temperatura e movimentos delicados" },
            { label: "Áreas ósseas", value: "Aplicar com cuidado" },
            { label: "Flacidez corporal", value: "Aquecimento mais intenso e ponteira maior" },
            { label: "Celulite", value: "Movimentos lentos e maior tempo na região" },
            { label: "Estrias", value: "Foco localizado e temperatura controlada" },
            { label: "Abdômen", value: "Movimentos amplos e sem excesso de calor" },
          ],
        },
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
