// Configuração do Formulário de Contato
// Escolha uma das opções abaixo e configure conforme necessário

export const contactConfig = {
  // Opção 1: Formspree (Gratuito - Recomendado para começar)
  formspree: {
    enabled: true,
    formId: 'xpwlqwpq', // ✅ SEU FORM ID REAL CONFIGURADO!
    endpoint: 'https://formspree.io/f/'
  },

  // Opção 2: EmailJS (Profissional - Requer conta)
  emailjs: {
    enabled: false,
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    userId: 'YOUR_USER_ID',
    toEmail: 'wesleytrabalhos1801@gmail.com'
  },

  // Opção 3: Endpoint próprio (Para quem tem backend)
  customEndpoint: {
    enabled: false,
    url: '/api/contact'
  },

  // Configurações gerais
  general: {
    recipientEmail: 'wesleytrabalhos1801@gmail.com',
    enableValidation: true,
    enableSpamProtection: true
  }
}

// Instruções de configuração:
/*
1. FORMSPREE (Mais fácil - Gratuito):
   - Acesse: https://formspree.io/
   - Crie uma conta gratuita
   - Crie um novo formulário
   - Copie o Form ID (ex: xrgjqjqj)
   - Substitua 'YOUR_FORM_ID' pelo ID real

2. EMAILJS (Mais profissional):
   - Acesse: https://www.emailjs.com/
   - Crie uma conta
   - Configure um serviço de email (Gmail, Outlook, etc.)
   - Crie um template de email
   - Copie os IDs e substitua no config

3. ENDPOINT PRÓPRIO:
   - Crie um endpoint no seu backend
   - Configure CORS adequadamente
   - Implemente validação e envio de email
*/ 