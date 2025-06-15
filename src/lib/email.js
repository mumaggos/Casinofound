// ===========================================
// SISTEMA DE EMAIL FUNCIONAL COM FORMSPREE
// ===========================================

// Configuração do Formspree (serviço gratuito de email)
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID';

// Função para enviar email via Formspree
export const sendEmail = async (emailData) => {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailData.email,
        subject: emailData.subject || 'Contato do site CasinoFound',
        message: emailData.message,
        name: emailData.name || 'Usuário',
        _replyto: emailData.email,
        _subject: emailData.subject || 'Novo contato do CasinoFound',
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, error: error.message };
  }
};

// Função para inscrever na newsletter
export const subscribeToNewsletter = async (email, language = 'pt') => {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        subject: 'Nova inscrição na newsletter CasinoFound',
        message: `Nova inscrição na newsletter do CasinoFound.\n\nEmail: ${email}\nIdioma: ${language}\nData: ${new Date().toLocaleString('pt-PT')}`,
        _replyto: email,
        _subject: 'Nova inscrição na newsletter CasinoFound',
        type: 'newsletter_subscription',
        language: language,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Erro ao inscrever na newsletter:', error);
    return { success: false, error: error.message };
  }
};

// Função para enviar notificação de transação
export const sendTransactionNotification = async (walletAddress, transactionData) => {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@casinofound.me', // Email do administrador
        subject: 'Nova transação no CasinoFound',
        message: `Nova transação realizada no CasinoFound.\n\nCarteira: ${walletAddress}\nTipo: ${transactionData.type}\nQuantidade: ${transactionData.amount}\nMétodo: ${transactionData.paymentMethod || 'N/A'}\nHash: ${transactionData.hash}\nData: ${new Date().toLocaleString('pt-PT')}`,
        _subject: 'Nova transação no CasinoFound',
        type: 'transaction_notification',
        wallet_address: walletAddress,
        transaction_type: transactionData.type,
        amount: transactionData.amount,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Erro ao enviar notificação de transação:', error);
    return { success: false, error: error.message };
  }
};

// Função para enviar email de contato
export const sendContactEmail = async (contactData) => {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: contactData.email,
        subject: contactData.subject || 'Contato do site CasinoFound',
        message: `Nome: ${contactData.name}\nEmail: ${contactData.email}\nAssunto: ${contactData.subject}\n\nMensagem:\n${contactData.message}`,
        name: contactData.name,
        _replyto: contactData.email,
        _subject: `Contato CasinoFound: ${contactData.subject}`,
        type: 'contact_form',
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Erro ao enviar email de contato:', error);
    return { success: false, error: error.message };
  }
};

// Função para validar email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Função para configurar Formspree (instruções para o usuário)
export const getFormspreeSetupInstructions = () => {
  return {
    steps: [
      '1. Acesse https://formspree.io e crie uma conta gratuita',
      '2. Crie um novo formulário no dashboard',
      '3. Copie o endpoint do formulário (ex: https://formspree.io/f/xvgpkjqw)',
      '4. Adicione o endpoint no arquivo .env como VITE_FORMSPREE_ENDPOINT',
      '5. Configure o email de destino nas configurações do formulário',
      '6. Ative as notificações por email se desejar',
    ],
    features: [
      '✅ 50 submissões gratuitas por mês',
      '✅ Proteção contra spam',
      '✅ Notificações por email',
      '✅ Dashboard para visualizar submissões',
      '✅ Integração simples via API',
      '✅ Sem necessidade de backend próprio',
    ],
    note: 'O Formspree é um serviço gratuito e confiável para formulários de contato e newsletter.',
  };
};

// Função para testar conexão com Formspree
export const testFormspreeConnection = async () => {
  try {
    const testData = {
      email: 'test@casinofound.me',
      subject: 'Teste de conexão',
      message: 'Este é um teste de conexão com o Formspree.',
      name: 'Sistema de Teste',
    };

    const result = await sendEmail(testData);
    return result;
  } catch (error) {
    console.error('Erro no teste de conexão:', error);
    return { success: false, error: error.message };
  }
};

