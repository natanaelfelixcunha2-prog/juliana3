/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  MessageCircle,
  Check,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Instagram,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Smile,
  Clock,
  UserCheck,
  CalendarCheck,
  Stethoscope,
} from 'lucide-react';
import { EXPERT_INFO, EXPERT_PHOTOS, RESULT_PHOTOS, ResultPhoto } from './data/expertData';

// Componente de Imagem com Fallback Seguro (Zero-Broken-Image Policy)
function SafeImage({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-square',
}: {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EFECE6] text-[#5C5650] p-6 text-center ${aspectClass} ${className}`}
      >
        <Smile className="w-8 h-8 mb-2 text-[#8C6D46] opacity-70" />
        <span className="text-xs font-medium">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#EFECE6] ${aspectClass} ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EFECE6] animate-pulse" aria-hidden="true" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

// Botão de CTA Principal focado em conversão no WhatsApp
function WhatsAppButton({
  label = 'Agendar primeira consulta gratuita no WhatsApp',
  subtext = 'Resposta rápida · Sem compromisso',
  fullWidth = true,
  variant = 'primary',
}: {
  label?: string;
  subtext?: string;
  fullWidth?: boolean;
  variant?: 'primary' | 'light';
}) {
  const baseStyles =
    variant === 'primary'
      ? 'bg-[#186346] hover:bg-[#134E37] text-white shadow-lg shadow-[#186346]/20'
      : 'bg-[#FAF8F5] hover:bg-white text-[#181615] shadow-lg shadow-black/20';

  return (
    <div className={fullWidth ? 'w-full' : 'inline-block'}>
      <a
        href={EXPERT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-150 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#186346] ${
          fullWidth ? 'w-full' : ''
        } ${baseStyles}`}
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform duration-150 group-hover:scale-105" />
        <span className="text-center leading-snug">{label}</span>
      </a>
      {subtext && (
        <p
          className={`mt-2.5 text-xs sm:text-sm text-center font-medium tracking-normal ${
            variant === 'primary' ? 'text-[#5C5650]' : 'text-[#D6D1C7]'
          }`}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}

export default function App() {
  // Controle de exibição da galeria (mostrar inicialmente 12 no mobile para carregamento rápido, com botão de ver todas as 25)
  const [showAllResults, setShowAllResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    'todos' | 'estetica' | 'reabilitacao' | 'sorrisos'
  >('todos');

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxList, setLightboxList] = useState<{ url: string; label: string }[]>([]);

  const filteredResults: ResultPhoto[] =
    selectedCategory === 'todos'
      ? RESULT_PHOTOS
      : RESULT_PHOTOS.filter((item) => item.category === selectedCategory);

  const visibleResults = showAllResults ? filteredResults : filteredResults.slice(0, 12);

  const openLightbox = (items: { url: string; label: string }[], index: number) => {
    setLightboxList(items);
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + lightboxList.length) % lightboxList.length);
  }, [lightboxIndex, lightboxList.length]);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % lightboxList.length);
  }, [lightboxIndex, lightboxList.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181615] flex flex-col selection:bg-[#186346]/15 selection:text-[#186346]">
      {/* =====================================================================
          1. HERO (PRIMEIRA DOBRA - SEM MENU, 100% FOCADO NA DRA. JULIANA)
      ====================================================================== */}
      <main className="flex-1">
        <section className="relative pt-6 pb-14 sm:pt-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Foto Grande do Expert - Mobile First */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col">
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E0D8] bg-[#EFECE6] shadow-sm h-full">
                <SafeImage
                  src={EXPERT_PHOTOS[0].url}
                  alt="Dra. Juliana Vasconcelos - Dentista em Tianguá"
                  aspectClass="aspect-[4/5] lg:aspect-auto lg:h-full"
                  className="w-full h-full"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 sm:p-6 text-white">
                  <p className="text-xs sm:text-sm font-medium text-[#EAE5DC]">
                    Atendimento particular e humanizado
                  </p>
                  <p className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
                    Dra. Juliana Vasconcelos
                  </p>
                  <p className="text-xs text-[#D6D1C7] mt-0.5">
                    Rua Zeferino Ferreira · Tianguá-CE
                  </p>
                </div>
              </div>
            </div>

            {/* Copy Principal em 1ª Pessoa */}
            <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-medium text-[#7A6348] mb-3 tracking-normal">
                Clínico Geral · Ortodontia · Infantil · Clareamento · Facetas em Resina
              </p>

              <h1
                className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-[#181615] leading-[1.1] tracking-tight mb-5"
                style={{ textWrap: 'balance' }}
              >
                Eu sou Juliana Vasconcelos, Dentista em Tianguá.
              </h1>

              <p className="text-base sm:text-lg text-[#4A4540] leading-relaxed mb-6 max-w-2xl">
                Cuido do seu sorriso e da saúde bucal da sua família com atenção aos detalhes,
                mão leve e resultados naturais. Na nossa primeira conversa, avalio o seu caso
                pessoalmente e explico exatamente o que você realmente precisa — com total
                transparência e sem pressa.
              </p>

              {/* Destaques rápidos em texto limpo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 text-sm text-[#3B3733]">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#186346] shrink-0" />
                  <span>Avaliação individualizada comigo</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#186346] shrink-0" />
                  <span>Planejamento claro e sem surpresas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#186346] shrink-0" />
                  <span>Atendimento adulto e infantil</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#186346] shrink-0" />
                  <span>Estética dental com aspecto natural</span>
                </div>
              </div>

              {/* Botão Principal */}
              <div className="max-w-xl">
                <WhatsAppButton
                  label="Agendar primeira consulta gratuita no WhatsApp"
                  subtext="Resposta rápida · Sem compromisso"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            2. BLOCO "QUEM SOU EU" (AUTORIDADE PESSOAL EM 1ª PESSOA)
        ====================================================================== */}
        <section className="py-16 sm:py-24 bg-[#F3EFEA] border-y border-[#E5E0D8] px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Foto secundária do Expert */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-[#E2DDD5] bg-[#FAF8F5]">
                  <SafeImage
                    src={EXPERT_PHOTOS[1].url}
                    alt="Dra. Juliana Vasconcelos em atendimento no consultório"
                    aspectClass="aspect-[4/5]"
                  />
                </div>
              </div>

              {/* Texto humano e direto em 1ª pessoa */}
              <div className="lg:col-span-7">
                <p className="text-xs sm:text-sm font-medium text-[#7A6348] mb-2">
                  Prazer em conhecer você
                </p>
                <h2
                  className="font-display text-3xl sm:text-4xl font-semibold text-[#181615] leading-tight mb-5"
                  style={{ textWrap: 'balance' }}
                >
                  Mais do que tratar dentes, meu compromisso é devolver a sua segurança ao sorrir.
                </h2>

                <div className="space-y-4 text-base text-[#4A4540] leading-relaxed mb-7">
                  <p>
                    Sei que muitas pessoas adiam a ida ao dentista por medo de sentir dor, por
                    experiências anteriores apressadas ou por receio de orçamentos confusos.
                  </p>
                  <p>
                    Por isso, escolhi fazer uma odontologia diferente aqui em Tianguá. Aqui você
                    não é atendido em linha de produção: <strong>eu mesma acompanho você</strong>{' '}
                    desde a primeira conversa até a conclusão do seu tratamento.
                  </p>
                  <p>
                    Seja para transformar o sorriso com facetas em resina e clareamento, alinhar os
                    dentes com ortodontia ou cuidar da saúde bucal das crianças e da família, meu
                    foco é unir técnica apurada, delicadeza e honestidade.
                  </p>
                </div>

                {/* Bullets com diferenciais */}
                <ul className="space-y-3 border-t border-[#E2DDD5] pt-6">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#186346] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#2C2926]">
                      <strong>Olhar estético e natural:</strong> Facetas em resina e clareamento
                      planejados para valorizar a sua identidade, sem exageros.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#186346] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#2C2926]">
                      <strong>Cuidado completo em um só lugar:</strong> Clínico Geral, Ortodontia,
                      Odontopediatria (Infantil) e Estética Dental.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#186346] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#2C2926]">
                      <strong>Paciência e escuta:</strong> Explico cada passo de forma simples para
                      que você decida com total segurança.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. BLOCO "RESULTADOS REAIS" (PROVA VISUAL FORTE + LIGHTBOX)
        ====================================================================== */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="text-xs sm:text-sm font-medium text-[#7A6348] mb-2">
              Casos clínicos reais · Tianguá-CE
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#181615] leading-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              Transformações reais de quem confiou no meu trabalho
            </h2>
            <p className="text-base text-[#4A4540] leading-relaxed">
              Toque em qualquer foto abaixo para ampliar em tela cheia e observar de perto os
              detalhes de cor, formato, alinhamento e naturalidade.
            </p>
          </div>

          {/* Controles de Filtro Interativos (permitidos pela regra de botões funcionais) */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex flex-wrap items-center justify-center gap-1 p-1.5 bg-[#EFECE6] rounded-xl border border-[#E5E0D8]">
              {[
                { id: 'todos', label: `Todos (${RESULT_PHOTOS.length})` },
                { id: 'estetica', label: 'Facetas & Clareamento' },
                { id: 'reabilitacao', label: 'Reabilitação & Cuidado' },
                { id: 'sorrisos', label: 'Sorrisos Renovados' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(
                      tab.id as 'todos' | 'estetica' | 'reabilitacao' | 'sorrisos'
                    );
                    setShowAllResults(false);
                  }}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-[#FAF8F5] text-[#181615] shadow-xs'
                      : 'text-[#5C5650] hover:text-[#181615]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Resultados (2 colunas no mobile para leitura rápida, 3-4 no desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {visibleResults.map((photo, idx) => (
              <button
                key={photo.url}
                type="button"
                onClick={() =>
                  openLightbox(
                    filteredResults.map((r) => ({ url: r.url, label: r.label })),
                    idx
                  )
                }
                className="group relative rounded-xl overflow-hidden border border-[#E5E0D8] bg-[#EFECE6] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#186346] cursor-pointer"
                aria-label={`Abrir imagem ${idx + 1}: ${photo.label}`}
              >
                <SafeImage
                  src={photo.url}
                  alt={`${photo.label} - Dra. Juliana Vasconcelos`}
                  aspectClass="aspect-square"
                  className="group-hover:scale-[1.03] transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150 flex items-end justify-between p-3">
                  <span className="text-xs font-medium text-white line-clamp-1">
                    {photo.label}
                  </span>
                  <span className="w-7 h-7 rounded-lg bg-black/50 text-white flex items-center justify-center shrink-0">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Botão para expandir toda a galeria caso haja mais de 12 itens */}
          {filteredResults.length > 12 && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShowAllResults((prev) => !prev)}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-[#D4CEC3] bg-[#FAF8F5] hover:bg-[#EFECE6] text-sm font-semibold text-[#181615] transition-colors cursor-pointer"
              >
                {showAllResults
                  ? 'Mostrar menos fotos'
                  : `Ver todas as ${filteredResults.length} fotos de resultados`}
              </button>
            </div>
          )}

          {/* Aviso ético discreto obrigatório */}
          <p className="mt-6 text-xs text-center text-[#6E675F]">
            Resultados podem variar de pessoa para pessoa. Imagens divulgadas com finalidade
            informativa mediante autorização.
          </p>
        </section>

        {/* =====================================================================
            4. BLOCO "POR QUE CONFIAR EM MIM?" (6 CARDS DE DIFERENCIAIS)
        ====================================================================== */}
        <section className="py-16 sm:py-24 bg-[#F3EFEA] border-t border-[#E5E0D8] px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-xs sm:text-sm font-medium text-[#7A6348] mb-2">
                Meus princípios de atendimento
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold text-[#181615] leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Por que confiar o seu sorriso a mim?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: UserCheck,
                  title: '01. Atendimento 100% comigo',
                  description:
                    'Você não será atendido por um profissional diferente a cada visita. Eu planejo e executo pessoalmente o seu tratamento.',
                },
                {
                  icon: ShieldCheck,
                  title: '02. Avaliação honesta e ética',
                  description:
                    'Indico apenas os procedimentos realmente necessários para a sua saúde e estética, respeitando o seu momento.',
                },
                {
                  icon: Sparkles,
                  title: '03. Estética natural sem exageros',
                  description:
                    'Facetas em resina e clareamento planejados para harmonizar com o seu rosto, mantendo textura e brilho de dente natural.',
                },
                {
                  icon: HeartHandshake,
                  title: '04. Mão leve e zero pressa',
                  description:
                    'Consultas com tempo reservado para ouvir você, explicar cada etapa e garantir um procedimento confortável e tranquilo.',
                },
                {
                  icon: Smile,
                  title: '05. Carinho com crianças e adultos',
                  description:
                    'Atendimento infantil acolhedor para criar memórias positivas desde cedo, além de ortodontia e clínico geral para toda a família.',
                },
                {
                  icon: Clock,
                  title: '06. Clareza em prazos e valores',
                  description:
                    'Antes de iniciar qualquer etapa, você recebe um plano detalhado e transparente, com opções viáveis para o seu orçamento.',
                },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-2xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#EFECE6] text-[#7A6348] flex items-center justify-center mb-4">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#181615] mb-2">{item.title}</h3>
                      <p className="text-sm text-[#4A4540] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            5. CTA INTERMEDIÁRIO (QUEBRA DE OBJEÇÃO + WHATSAPP)
        ====================================================================== */}
        <section className="py-14 sm:py-20 bg-[#1D2420] text-[#FAF8F5] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs sm:text-sm font-medium text-[#C5A880] mb-2">
              Tire suas dúvidas sem custo
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold leading-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              Em dúvida sobre qual procedimento é o ideal para o seu caso?
            </h2>
            <p className="text-base sm:text-lg text-[#D6D1C7] leading-relaxed mb-8 max-w-2xl mx-auto">
              Você não precisa decidir nada agora. Na sua{' '}
              <strong className="text-white">primeira consulta gratuita</strong>, eu avalio o seu
              sorriso com calma, respondo todas as suas perguntas e mostro as possibilidades reais
              para você decidir no seu tempo.
            </p>
            <div className="max-w-md mx-auto">
              <WhatsAppButton
                label="Quero agendar minha avaliação gratuita"
                subtext="Atendimento em Tianguá · Sem compromisso"
                variant="primary"
              />
            </div>
          </div>
        </section>

        {/* =====================================================================
            6. BLOCO "COMO FUNCIONA A PRIMEIRA CONSULTA" (3 PASSOS SIMPLES)
        ====================================================================== */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs sm:text-sm font-medium text-[#7A6348] mb-2">
              Simples, rápido e transparente
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-[#181615] leading-tight mb-3"
              style={{ textWrap: 'balance' }}
            >
              Como funciona a sua primeira consulta gratuita
            </h2>
            <p className="text-base text-[#4A4540]">
              Em apenas 3 passos você dá o primeiro passo para cuidar do seu sorriso sem nenhum
              compromisso financeiro inicial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 'Passo 01',
                icon: MessageCircle,
                title: 'Toque no botão do WhatsApp',
                description:
                  'Você será direcionado para falar diretamente com a minha equipe de agendamento pelo WhatsApp de forma rápida.',
              },
              {
                step: 'Passo 02',
                icon: CalendarCheck,
                title: 'Escolha o melhor horário',
                description:
                  'Combinamos o dia e horário mais confortáveis para a sua rotina aqui no consultório na Rua Zeferino Ferreira, em Tianguá.',
              },
              {
                step: 'Passo 03',
                icon: Stethoscope,
                title: 'Avaliação gratuita comigo',
                description:
                  'Avalio seu sorriso pessoalmente, conversamos sobre seus objetivos e entrego seu planejamento completo sem compromisso.',
              },
            ].map((item) => {
              const StepIcon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-[#F3EFEA] border border-[#E5E0D8] rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-semibold text-[#7A6348] tracking-wide">
                        {item.step}
                      </span>
                      <StepIcon className="w-5 h-5 text-[#186346]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#181615] mb-2.5">{item.title}</h3>
                    <p className="text-sm text-[#4A4540] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================================
            7. BLOCO "MAIS PROVAS" (EXPERT + BASTIDORES COM LEGENDAS CURTAS)
        ====================================================================== */}
        <section className="py-16 sm:py-24 bg-[#F3EFEA] border-t border-[#E5E0D8] px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mb-10">
              <p className="text-xs sm:text-sm font-medium text-[#7A6348] mb-2">
                Bastidores e dedicação diária
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold text-[#181615] leading-tight mb-3"
                style={{ textWrap: 'balance' }}
              >
                Cuidado pensado para você se sentir em casa
              </h2>
              <p className="text-base text-[#4A4540]">
                Conheça um pouco mais da minha rotina de atendimento em Tianguá e o cuidado dedicado
                a cada paciente.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {EXPERT_PHOTOS.map((photo, index) => (
                <div
                  key={photo.url}
                  onClick={() =>
                    openLightbox(
                      EXPERT_PHOTOS.map((p) => ({ url: p.url, label: p.caption })),
                      index
                    )
                  }
                  className="group bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#E5E0D8] flex flex-col cursor-pointer transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <SafeImage
                    src={photo.url}
                    alt={photo.caption}
                    aspectClass="aspect-[4/5]"
                    className="w-full"
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-[#181615] mb-1">
                        {photo.caption}
                      </h3>
                      <p className="text-xs text-[#5C5650] leading-relaxed">{photo.subcaption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            8. CTA FINAL (DECISÃO)
        ====================================================================== */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="bg-[#FAF8F5] border border-[#DFD9CE] rounded-3xl p-6 sm:p-12 text-center shadow-xs">
            <p className="text-xs sm:text-sm font-medium text-[#186346] mb-2">
              Primeira Consulta Gratuita · Vagas na Agenda
            </p>
            <h2
              className="font-display text-3xl sm:text-5xl font-semibold text-[#181615] leading-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              Vamos conversar sobre o sorriso que você merece ter?
            </h2>
            <p className="text-base sm:text-lg text-[#4A4540] leading-relaxed max-w-2xl mx-auto mb-8">
              Clique no botão abaixo para me chamar no WhatsApp. Vai ser um prazer receber você no
              meu consultório em Tianguá, entender sua necessidade e planejar o seu melhor sorriso
              com toda segurança.
            </p>

            <div className="max-w-lg mx-auto">
              <WhatsAppButton
                label="Agendar primeira consulta gratuita no WhatsApp"
                subtext="Resposta rápida · Sem compromisso · Rua Zeferino Ferreira, Tianguá-CE"
              />
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          9. RODAPÉ SIMPLES
      ====================================================================== */}
      <footer className="bg-[#F3EFEA] border-t border-[#E5E0D8] py-12 px-4 sm:px-6 lg:px-8 text-[#4A4540]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-display text-2xl font-semibold text-[#181615]">
              Dra. Juliana Vasconcelos
            </p>
            <p className="text-xs sm:text-sm text-[#5C5650] mt-1">
              Dentista em Tianguá · Clínico Geral · Ortodontia · Infantil · Clareamento Dental ·
              Facetas em Resina
            </p>
            <p className="flex items-center gap-1.5 text-xs sm:text-sm text-[#5C5650] mt-2">
              <MapPin className="w-4 h-4 text-[#7A6348] shrink-0" />
              <span>Endereço: Rua Zeferino Ferreira | Tianguá-CE</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={EXPERT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#181615] hover:text-[#186346] transition-colors py-2 px-3 rounded-lg border border-[#D4CEC3] bg-[#FAF8F5]"
            >
              <Instagram className="w-4 h-4 text-[#7A6348]" />
              <span>{EXPERT_INFO.instagramHandle}</span>
            </a>

            <a
              href={EXPERT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#186346] hover:text-[#134E37] transition-colors py-2 px-3 rounded-lg border border-[#186346]/30 bg-[#FAF8F5]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-[#E5E0D8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E675F] gap-2">
          <p>© {new Date().getFullYear()} Dra. Juliana Vasconcelos. Todos os direitos reservados.</p>
          <p>Atendimento odontológico particular em Tianguá-CE.</p>
        </div>
      </footer>

      {/* =====================================================================
          LIGHTBOX MODAL (VISUALIZAÇÃO EM TELA CHEIA)
      ====================================================================== */}
      {lightboxIndex !== null && lightboxList[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Visualização da imagem em tela cheia"
        >
          {/* Botão Fechar */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar imagem"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navegação Anterior */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-3 sm:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Imagem Central */}
          <div
            className="max-w-3xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxList[lightboxIndex].url}
              alt={lightboxList[lightboxIndex].label}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl border border-white/15 shadow-2xl"
            />
            <div className="mt-3 text-center">
              <p className="text-sm font-medium text-white">
                {lightboxList[lightboxIndex].label}
              </p>
              <p className="text-xs text-white/60 tabular-nums mt-0.5">
                Foto {lightboxIndex + 1} de {lightboxList.length}
              </p>
            </div>
          </div>

          {/* Navegação Próxima */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-3 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

