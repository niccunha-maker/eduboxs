export const SITE_NAME = "EduBoxs";
export const SITE_DESCRIPTION =
  "Kit escolar completo conforme a lista do colégio, entregue direto na escola. Simplifique a volta às aulas do seu filho.";

export const WHATSAPP_NUMBER = "5511953646172";
export const WHATSAPP_MESSAGE_DEFAULT =
  "Olá! Gostaria de saber mais sobre os kits escolares da EduBoxs para o colégio do meu filho.";

export const MERCADO_PAGO_PUBLIC_KEY =
  import.meta.env.VITE_MP_PUBLIC_KEY || "";

export const STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;
