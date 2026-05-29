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

export interface ProcedureExtraTab {
  key: string;
  label: string;
  groups: ParameterGroup[];
}

export interface QuickInfo {
  title: string;
  video?: VideoSource;
  tutorial: string[];
  checklist: string[];
  commonErrors: string[];
  contraindications: string[];
  parameters: ParameterItem[];
  parameterGroups?: ParameterGroup[];
  extraTabs?: ProcedureExtraTab[];
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
  legacyIds?: string[];
  name: string;
  icon: LucideIcon;
  tagline: string;
  color: string;
  info: QuickInfo;
}

export const procedures: Procedure[] = [
  {
    id: "ultrassom",
    legacyIds: ["corrente-russa"],
    name: "Ultrassom",
    icon: Zap,
    tagline: "Lipólise",
    color: "from-indigo-500 to-violet-600",
    info: {
      title: "Ultrassom",
      video: {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=Z84XlfAMfJ0",
        title: "Demonstração de Ultrassom",
      },
      tutorial: [
        "Higienize a área tratada com gaze e álcool 70%.",
        "Aplique uma camada suficiente de gel condutor para garantir o acoplamento do cabeçote.",
        "Calcule o tempo de aplicação conforme a área tratada e a ERA do cabeçote.",
        "Deslize o cabeçote de forma constante e lenta, cobrindo todo o quadrante estipulado.",
        "Mantenha movimentos geralmente circulares, sem deixar a ponteira parada.",
        "Ao finalizar, retire o gel da região com a cubeta separada para descarte/limpeza.",
      ],
      checklist: [
        "Higienização: Limpar a área tratada com gaze e álcool 70%.",
        "Acoplamento: Aplique uma camada de gel condutor na região (evitando assim queimar o paciente)",
        "Movimentação: Deslize o cabeçote do aparelho de forma constante e lenta, cobrindo todo o quadrante estipulado (geralmente em formato circular).",
        "Tempo: O tempo de aplicação varia conforme a área tratada, calculando a área total sobre a ERA do cabeçote.",
        "Itens: Duas cubetas: uma para o gel que será aplicado na paciente e a outra para retirar o gel após o fim da aplicação.",
      ],
      commonErrors: [
        "Cálculo errado",
        "Pouco gel condutor",
        "Não deslizar constantemente",
        "Deixar a ponteira parada",
        "Parâmetros incorretos",
      ],
      contraindications: [
        "Gravidez",
        "Marcapasso",
        "Câncer ativo",
        "Doenças infecciosas",
        "Trombose",
        "Próteses",
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
      video: {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=er5gAur_KlA",
        title: "Demonstração de Terapia LED",
      },
      tutorial: [
        "Higienize a pele e retire maquiagem.",
        "Proteja os olhos do cliente com óculos opacos.",
        "Selecione a cor conforme o objetivo do tratamento.",
        "Confira a potência do aparelho e calcule o tempo conforme a energia desejada.",
        "Posicione o aparelho conforme orientação do equipamento utilizado.",
        "Inicie a sessão e monitore conforto, sensibilidade e reação da pele.",
      ],
      checklist: [
        "Pele limpa e seca",
        "Óculos de proteção colocados",
        "Cor do LED selecionada conforme objetivo",
        "Potência do aparelho conferida",
        "Tempo calculado pela fórmula E = P x t",
        "Histórico de fotossensibilidade avaliado",
        "Cliente sem desconforto",
      ],
      commonErrors: [
        "Esquecer proteção ocular",
        "Escolher a cor sem considerar o objetivo do tratamento",
        "Não converter mW para W antes de calcular o tempo",
        "Confundir energia em Joules com potência em Watts",
        "Programar o tempo sem usar a potência do equipamento",
        "Usar sobre maquiagem ou ativos fotossensibilizantes",
        "Aplicar após exposição solar intensa ou em pele muito irritada",
      ],
      contraindications: [
        "Pele bronzeada recentemente",
        "Exposição solar intensa antes ou após a aplicação",
        "Feridas abertas ou infecções no local",
        "Câncer de pele ou lesões suspeitas",
        "Gestação, dependendo da área e do equipamento",
        "Epilepsia fotossensível",
        "Uso de medicamentos fotossensibilizantes",
        "Inflamações intensas na região",
        "Vitiligo, principalmente em lasers que atuam em pigmento",
        "Pele muito sensível ou irritada",
        "Febre ou doenças infecciosas ativas",
        "Histórico de queimaduras fáceis ou hiperpigmentação",
      ],
      parameters: [
        { label: "Violeta", value: "370–450 nm" },
        { label: "Azul", value: "450–495 nm" },
        { label: "Verde", value: "495–570 nm" },
        { label: "Amarela/âmbar", value: "570–620 nm" },
        { label: "Vermelha", value: "620–750 nm" },
        { label: "Infravermelha", value: "750–1200 nm" },
      ],
      parameterGroups: [
        {
          title: "Cálculo de energia",
          items: [
            { label: "Fórmula", value: "E = P x t" },
            { label: "E", value: "Energia em Joules (J)" },
            { label: "P", value: "Potência em Watts (W)" },
            { label: "t", value: "Tempo em segundos (s)" },
            { label: "Exemplo", value: "0,2 W x 10 s = 2 J" },
          ],
        },
        {
          title: "Conversão de potência",
          items: [
            { label: "Regra", value: "1 W = 1000 mW" },
            { label: "200 mW", value: "0,2 W" },
            { label: "500 mW", value: "0,5 W" },
          ],
        },
        {
          title: "Cálculo do tempo",
          items: [
            { label: "Fórmula", value: "t = E ÷ P" },
            { label: "Quando usar", value: "Quando já sabe os Joules e a potência" },
            { label: "Exemplo", value: "4 J ÷ 0,2 W = 20 s" },
            { label: "Resultado", value: "Aplicar por 20 segundos" },
          ],
        },
      ],
      extraTabs: [
        {
          key: "luzes",
          label: "Luzes",
          groups: [
            {
              title: "Luzes e ações",
              items: [
                {
                  label: "Violeta",
                  value: "370–450 nm: calmante, regeneradora, cicatrização e revitalização",
                },
                { label: "Azul", value: "450–495 nm: bactericida, anti-inflamatória e acne" },
                {
                  label: "Verde",
                  value: "495–570 nm: clareamento de manchas e equilíbrio da pigmentação",
                },
                {
                  label: "Amarela/âmbar",
                  value: "570–620 nm: circulação, hidratação, luminosidade e peles sensíveis",
                },
                {
                  label: "Vermelha",
                  value: "620–750 nm: colágeno, elastina, rejuvenescimento e cicatrização",
                },
                {
                  label: "Infravermelha",
                  value: "750–1200 nm: regeneração profunda, analgesia e inflamações",
                },
              ],
            },
            {
              title: "Indicações por cor",
              items: [
                {
                  label: "Luz violeta",
                  value: "Regeneração da pele, cicatrização e revitalização",
                },
                { label: "Luz azul", value: "Acne, ação bactericida e controle da oleosidade" },
                { label: "Luz verde", value: "Clareamento de manchas e uniformização da pele" },
                {
                  label: "Luz amarela/âmbar",
                  value: "Hidratação, circulação e sensibilidade da pele",
                },
                {
                  label: "Luz vermelha",
                  value: "Rejuvenescimento, colágeno, cicatrização e flacidez",
                },
                {
                  label: "Luz infravermelha",
                  value: "Analgesia, inflamação, regeneração profunda e dor muscular",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: "drenagem-linfatica",
    legacyIds: ["massagem"],
    name: "Drenagem Linfática",
    icon: Hand,
    tagline: "Desintoxicação e relaxamento",
    color: "from-emerald-400 to-teal-600",
    info: {
      title: "Drenagem Linfática",
      video: {
        type: "local",
        src: "/videos/massagem.mp4",
        title: "Demonstração de massagem",
      },
      tutorial: [
        "Avalie contraindicações e objetivos do paciente antes de iniciar.",
        "Inicie abrindo os gânglios linfáticos, independentemente da técnica escolhida.",
        "Comece pelas regiões proximais para preparar o caminho da linfa.",
        "Siga o trajeto fisiológico da linfa em direção aos linfonodos correspondentes.",
        "Use movimentos suaves, lentos, rítmicos e sem dor.",
        "Finalize direcionando a linfa para os linfonodos correspondentes.",
      ],
      checklist: [
        "Contraindicações avaliadas",
        "Paciente confortável e posicionado",
        "Linfonodos estimulados antes das manobras",
        "Regiões proximais trabalhadas antes das distais",
        "Pressão leve e superficial mantida",
        "Ritmo lento, contínuo e repetido",
        "Direção respeitando vasos linfáticos e linfonodos",
        "Finalização com direcionamento da linfa",
      ],
      commonErrors: [
        "Utilizar pressão excessiva",
        "Fazer movimentos rápidos",
        "Não respeitar o sentido do fluxo linfático",
        "Não iniciar pelas regiões proximais e linfonodos",
        "Deixar a técnica dolorosa",
        "Realizar manobras agressivas",
        "Não avaliar contraindicações do paciente",
        "Fazer movimentos sem ritmo e repetição adequada",
      ],
      contraindications: [
        "Febre",
        "Infecções agudas",
        "Trombose",
        "Insuficiência cardíaca descompensada",
        "Câncer sem liberação médica",
        "Hipotensão intensa",
        "Processos inflamatórios agudos",
        "Problemas renais graves",
      ],
      parameters: [
        { label: "Pressão", value: "Leve e superficial" },
        { label: "Ritmo", value: "Lento, rítmico e contínuo" },
        { label: "Direção", value: "Sentido dos vasos linfáticos e linfonodos" },
        { label: "Repetições", value: "5–7 vezes por região" },
        { label: "Duração", value: "45–60 min" },
        { label: "Frequência", value: "1–3 vezes por semana" },
      ],
      parameterGroups: [
        {
          title: "Parâmetros gerais",
          items: [
            { label: "Pressão", value: "Leve, suave e superficial" },
            { label: "Ritmo", value: "Lento, rítmico e contínuo" },
            { label: "Direção", value: "Trajeto fisiológico da linfa até os linfonodos" },
            { label: "Repetições", value: "5–7 vezes por região" },
            { label: "Velocidade", value: "Aproximadamente 5–7 movimentos por minuto" },
            { label: "Duração", value: "45–60 min" },
            { label: "Frequência", value: "1–3 vezes por semana" },
          ],
        },
        {
          title: "Objetivos",
          items: [
            { label: "Edema", value: "Reduzir retenção de líquidos e inchaço" },
            { label: "Circulação linfática", value: "Estimular o fluxo da linfa" },
            { label: "Tecidos", value: "Eliminar toxinas e melhorar equilíbrio hídrico" },
            { label: "Bem-estar", value: "Promover relaxamento e sensação de leveza" },
          ],
        },
        {
          title: "Indicações",
          items: [
            { label: "Retenção de líquidos", value: "Inchaço corporal e facial" },
            { label: "Pós-operatório", value: "Cirurgias plásticas, conforme liberação" },
            { label: "Celulite", value: "Fibroedema geloide" },
            { label: "Gestantes", value: "Somente após liberação médica" },
            { label: "Circulação", value: "Má circulação e pernas cansadas" },
            { label: "Estética e bem-estar", value: "Relaxamento e equilíbrio dos tecidos" },
          ],
        },
      ],
      extraTabs: [
        {
          key: "metodos",
          label: "Métodos",
          groups: [
            {
              title: "Método Vodder",
              items: [
                { label: "Base", value: "Movimentos suaves, lentos e rítmicos" },
                { label: "Pressão", value: "Leve e superficial" },
                { label: "Ritmo", value: "Lento e contínuo" },
                { label: "Direção", value: "Sentido dos vasos linfáticos e linfonodos" },
                { label: "Repetições", value: "5–7 vezes por região" },
                { label: "Duração", value: "45–60 min" },
                { label: "Frequência", value: "1–3 vezes por semana" },
              ],
            },
            {
              title: "Movimentos do Vodder",
              items: [
                {
                  label: "Círculos fixos",
                  value: "Movimentos circulares suaves nos linfonodos para prepará-los",
                },
                {
                  label: "Bombeamento",
                  value: "Pressão leve e relaxamento para estimular a linfa",
                },
                { label: "Chamada", value: "Prepara os caminhos linfáticos para a drenagem" },
                { label: "Reabsorção", value: "Direciona a linfa para os linfonodos" },
                {
                  label: "Movimento rotatório",
                  value: "Movimentos amplos e suaves para estimular o fluxo linfático",
                },
              ],
            },
            {
              title: "Método Leduc",
              items: [
                { label: "Pressão", value: "Leve e suave, sem dor ou hiperemia" },
                { label: "Ritmo", value: "Lento, rítmico e contínuo" },
                {
                  label: "Direção",
                  value: "Trajeto fisiológico da linfa em direção aos linfonodos",
                },
                { label: "Velocidade", value: "Aproximadamente 5–7 movimentos por minuto" },
                { label: "Tempo", value: "45–60 min" },
              ],
            },
            {
              title: "Manobras do Leduc",
              items: [
                {
                  label: "Captação",
                  value: "Estimula a absorção da linfa pelos capilares linfáticos",
                },
                { label: "Evacuação", value: "Conduz a linfa pelos vasos linfáticos" },
              ],
            },
          ],
        },
        {
          key: "sequencia",
          label: "Sequência",
          groups: [
            {
              title: "Regra inicial",
              items: [
                {
                  label: "1º passo",
                  value: "Abrir os gânglios linfáticos, independentemente da técnica",
                },
                { label: "2º passo", value: "Iniciar as manobras para direcionamento da linfa" },
              ],
            },
            {
              title: "Sequência corporal",
              items: [
                { label: "Linfonodos", value: "Cervicais, axilares e inguinais" },
                { label: "Regiões proximais", value: "Abdômen, coxas e braços" },
                { label: "Regiões distais", value: "Pernas, pés e mãos" },
                {
                  label: "Finalização",
                  value: "Direcionar a linfa para os linfonodos correspondentes",
                },
              ],
            },
            {
              title: "Sequência facial",
              items: [
                { label: "1", value: "Estímulo dos linfonodos cervicais e supraclaviculares" },
                { label: "2", value: "Drenagem do pescoço" },
                { label: "3", value: "Região do queixo" },
                { label: "4", value: "Bochechas" },
                { label: "5", value: "Região dos olhos" },
                { label: "6", value: "Testa" },
                {
                  label: "7",
                  value: "Finalização direcionando a linfa para os gânglios cervicais",
                },
              ],
            },
          ],
        },
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
      contraindications: ["Acne grau III/IV ativa", "Rosácea em crise", "Herpes ativo"],
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
        "Aplique drug delivery ou ativos indicados conforme o objetivo.",
        "Finalize com orientações pós-procedimento.",
      ],
      checklist: [
        "Material estéril",
        "Pele higienizada",
        "Antissepsia realizada",
        "Anestésico aplicado quando necessário",
        "Profundidade definida",
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
      extraTabs: [
        {
          key: "movimentos",
          label: "Movimentos",
          groups: [
            {
              title: "Movimentos",
              items: [
                { label: "Horizontal", value: "Movimento linear horizontal" },
                { label: "Vertical", value: "Movimento linear vertical" },
                { label: "Diagonal", value: "Movimento linear diagonal" },
              ],
            },
            {
              title: "Técnica",
              items: [
                { label: "Pele", value: "Deve estar tracionada" },
                { label: "Pressão", value: "Uniforme e controlada" },
                { label: "Repetição", value: "Não repetir excessivamente na mesma área" },
              ],
            },
          ],
        },
        {
          key: "pos",
          label: "Pós",
          groups: [
            {
              title: "Reações esperadas",
              items: [
                { label: "Vermelhidão", value: "Reação comum após o procedimento" },
                { label: "Sensação de calor", value: "Pode ocorrer nas primeiras horas" },
                { label: "Edema leve", value: "Inchaço discreto esperado no pós" },
                {
                  label: "Ressecamento e descamação leve",
                  value: "Pode acontecer durante a recuperação da pele",
                },
                { label: "Recuperação média", value: "3–5 dias" },
              ],
            },
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
      video: {
        type: "local",
        src: "/videos/radiofrequencia.mp4",
        title: "Demonstração de radiofrequência",
      },
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

export function resolveProcedureId(id: string) {
  const procedure = procedures.find((item) => item.id === id || item.legacyIds?.includes(id));
  return procedure?.id ?? null;
}

export function findProcedureById(id: string) {
  const procedureId = resolveProcedureId(id);
  return procedureId ? procedures.find((item) => item.id === procedureId) : undefined;
}

export function normalizeProcedureIds(ids: string[]) {
  return Array.from(
    new Set(ids.map((id) => resolveProcedureId(id) ?? id).filter((id) => id.length > 0)),
  );
}

export function normalizeProcedureRecord<T>(record: Record<string, T>) {
  return Object.entries(record).reduce<Record<string, T>>((normalized, [id, value]) => {
    const procedureId = resolveProcedureId(id) ?? id;
    if (!(procedureId in normalized)) normalized[procedureId] = value;
    return normalized;
  }, {});
}

export const forgotOptions: { key: ForgotKey; label: string; hint: string }[] = [
  { key: "parametros", label: "Parâmetros", hint: "Frequência, intensidade, tempo" },
  { key: "tempo", label: "Tempo e Dose", hint: "Duração por área e energia recomendada (Joules)" },
  { key: "sequencia", label: "Sequência", hint: "Ordem das etapas" },
  {
    key: "configuracao",
    label: "Ajustes e movimentos",
    hint: "Como ajustar o aparelho, manobras e direção",
  },
];
