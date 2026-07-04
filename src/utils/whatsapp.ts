/**
 * Utility to generate a pre-filled WhatsApp link for product quotes and orders.
 */

// Centralized contact number for Quark3D (e.g. +55 (11) 99999-9999)
// The user can easily customize this variable.
export const WHATSAPP_NUMBER = "5512997559353"; 

export interface WhatsAppMessageParams {
  productName: string;
  selectedColor?: string;
  material: string;
  dimensions: string;
}

/**
 * Generates a encoded WhatsApp link with a professional pre-filled message.
 */
export function generateWhatsAppLink({
  productName,
  selectedColor = "Padrão",
  material,
  dimensions,
}: WhatsAppMessageParams): string {
  const message = `Olá Quark3D! Gostaria de solicitar um orçamento para o produto:

📦 *${productName}*
🎨 *Cor:* ${selectedColor}
🔬 *Material:* ${material}
📐 *Dimensões:* ${dimensions}

Gostaria de saber o valor, prazo de produção e opções de frete. Obrigado!`;

  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
}
