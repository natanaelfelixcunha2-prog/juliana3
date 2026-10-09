export const EXPERT_INFO = {
  name: 'Juliana Vasconcelos',
  fullTitle: 'Dra. Juliana Vasconcelos',
  profession:
    'Dentista Tianguá · Clínico Geral · Ortodontia · Infantil · Clareamento Dental · Facetas em Resina',
  specialtiesList: [
    'Clínico Geral',
    'Ortodontia',
    'Odontopediatria (Infantil)',
    'Clareamento Dental',
    'Facetas em Resina',
  ],
  city: 'Tianguá-CE',
  address: 'Rua Zeferino Ferreira | Tianguá-CE',
  whatsappUrl:
    'https://api.whatsapp.com/send/?phone=5588994111660&text&type=phone_number&app_absent=0&utm_source=ig',
  instagramUrl: 'https://www.instagram.com/dra.julianavasconcelos/',
  instagramHandle: '@dra.julianavasconcelos',
};

export interface ExpertPhoto {
  url: string;
  caption: string;
  subcaption: string;
}

export const EXPERT_PHOTOS: ExpertPhoto[] = [
  {
    url: 'https://i.imgur.com/Kt7xikU.jpeg',
    caption: 'Atendimento direto e individualizado',
    subcaption: 'Escuta ativa para entender exatamente o que você deseja no seu sorriso.',
  },
  {
    url: 'https://i.imgur.com/cBbIZck.jpeg',
    caption: 'Planejamento estético detalhado',
    subcaption: 'Cada tratamento é desenhado respeitando a harmonia natural do seu rosto.',
  },
  {
    url: 'https://i.imgur.com/uvYchSE.jpeg',
    caption: 'Ambiente acolhedor em Tianguá',
    subcaption: 'Consultório preparado para que você se sinta tranquilo do início ao fim.',
  },
  {
    url: 'https://i.imgur.com/0GP9aWt.jpeg',
    caption: 'Precisão técnica e delicadeza',
    subcaption: 'Materiais de excelência em facetas em resina, clareamento e ortodontia.',
  },
];

export interface ResultPhoto {
  url: string;
  category: 'todos' | 'estetica' | 'reabilitacao' | 'sorrisos';
  label: string;
}

/**
 * LISTA DE RESULTADOS REAIS (ANTES E DEPOIS / PROVAS SOCIAIS)
 * Para adicionar mais fotos no futuro, basta inserir novos itens neste array.
 */
export const RESULT_PHOTOS: ResultPhoto[] = [
  { url: 'https://i.imgur.com/X8lXkwE.jpeg', category: 'estetica', label: 'Transformação do Sorriso' },
  { url: 'https://i.imgur.com/yJ9A0Sj.jpeg', category: 'estetica', label: 'Harmonia e Naturalidade' },
  { url: 'https://i.imgur.com/owyicTC.jpeg', category: 'reabilitacao', label: 'Resultado Clínico Real' },
  { url: 'https://i.imgur.com/6UlVrAt.jpeg', category: 'estetica', label: 'Estética Dental Avançada' },
  { url: 'https://i.imgur.com/BoFvIh1.jpeg', category: 'sorrisos', label: 'Alinhamento e Proporção' },
  { url: 'https://i.imgur.com/CRbWQ87.jpeg', category: 'estetica', label: 'Facetas e Acabamento Natural' },
  { url: 'https://i.imgur.com/YLQiUmo.jpeg', category: 'reabilitacao', label: 'Reabilitação Funcional e Estética' },
  { url: 'https://i.imgur.com/q6APcYR.jpeg', category: 'sorrisos', label: 'Renovação da Autoestima' },
  { url: 'https://i.imgur.com/4z86EsY.jpeg', category: 'estetica', label: 'Clareamento e Estética' },
  { url: 'https://i.imgur.com/Lj6lQuj.jpeg', category: 'reabilitacao', label: 'Cuidado nos Detalhes' },
  { url: 'https://i.imgur.com/t778m3e.jpeg', category: 'estetica', label: 'Proporção do Sorriso' },
  { url: 'https://i.imgur.com/QrSAGOJ.jpeg', category: 'sorrisos', label: 'Resultado Personalizado' },
  { url: 'https://i.imgur.com/0dyUjer.jpeg', category: 'estetica', label: 'Naturalidade em Resina' },
  { url: 'https://i.imgur.com/FRjP5hB.jpeg', category: 'reabilitacao', label: 'Saúde e Estética Bucal' },
  { url: 'https://i.imgur.com/sXR5cHp.jpeg', category: 'sorrisos', label: 'Sorriso Renovado' },
  { url: 'https://i.imgur.com/G6Tatgp.jpeg', category: 'estetica', label: 'Acabamento e Brilho' },
  { url: 'https://i.imgur.com/mBDvht0.jpeg', category: 'reabilitacao', label: 'Transformação Completa' },
  { url: 'https://i.imgur.com/keifmFq.jpeg', category: 'sorrisos', label: 'Harmonia Facial e Dental' },
  { url: 'https://i.imgur.com/FA0e4B6.jpeg', category: 'estetica', label: 'Estética com Segurança' },
  { url: 'https://i.imgur.com/DNVw4xD.jpeg', category: 'reabilitacao', label: 'Precisão nos Detalhes' },
  { url: 'https://i.imgur.com/tGuvW2w.jpeg', category: 'sorrisos', label: 'Antes e Depois Real' },
  { url: 'https://i.imgur.com/ssp4czM.jpeg', category: 'estetica', label: 'Design de Sorriso' },
  { url: 'https://i.imgur.com/SkhtK2r.jpeg', category: 'reabilitacao', label: 'Cuidado Individualizado' },
  { url: 'https://i.imgur.com/heEF9nv.jpeg', category: 'sorrisos', label: 'Resultado Clínico' },
  { url: 'https://i.imgur.com/30dHgox.jpeg', category: 'estetica', label: 'Sorriso Natural e Iluminado' },
];
