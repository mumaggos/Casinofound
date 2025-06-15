import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não estão definidas');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ===========================================
// FUNÇÕES DE USUÁRIOS E AUTENTICAÇÃO
// ===========================================

// Salvar dados do usuário
export const saveUserData = async (walletAddress, userData) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .upsert({
        wallet_address: walletAddress.toLowerCase(),
        ...userData,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'wallet_address'
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
    throw error;
  }
};

// Obter dados do usuário
export const getUserData = async (walletAddress) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress.toLowerCase())
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    return null;
  }
};

// ===========================================
// FUNÇÕES DE TRANSAÇÕES
// ===========================================

// Salvar transação
export const saveTransaction = async (transactionData) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        ...transactionData,
        created_at: new Date().toISOString()
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao salvar transação:', error);
    throw error;
  }
};

// Obter histórico de transações do usuário
export const getUserTransactions = async (walletAddress) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('wallet_address', walletAddress.toLowerCase())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao obter transações:', error);
    return [];
  }
};

// ===========================================
// FUNÇÕES DE STAKING
// ===========================================

// Salvar evento de staking
export const saveStakingEvent = async (stakingData) => {
  try {
    const { data, error } = await supabase
      .from('staking_events')
      .insert({
        ...stakingData,
        created_at: new Date().toISOString()
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao salvar evento de staking:', error);
    throw error;
  }
};

// Obter histórico de staking do usuário
export const getUserStakingHistory = async (walletAddress) => {
  try {
    const { data, error } = await supabase
      .from('staking_events')
      .select('*')
      .eq('wallet_address', walletAddress.toLowerCase())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao obter histórico de staking:', error);
    return [];
  }
};

// ===========================================
// FUNÇÕES DE NEWSLETTER
// ===========================================

// Inscrever na newsletter
export const subscribeNewsletter = async (email, language = 'pt') => {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase(),
        language,
        subscribed_at: new Date().toISOString(),
        is_active: true
      });

    if (error) {
      // Se o email já existe, atualizar
      if (error.code === '23505') {
        const { data: updateData, error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({
            is_active: true,
            language,
            updated_at: new Date().toISOString()
          })
          .eq('email', email.toLowerCase());

        if (updateError) throw updateError;
        return updateData;
      }
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Erro ao inscrever na newsletter:', error);
    throw error;
  }
};

// ===========================================
// FUNÇÕES DE CONFIGURAÇÕES DO SITE
// ===========================================

// Obter configurações do site
export const getSiteSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (error) {
    console.error('Erro ao obter configurações:', error);
    return null;
  }
};

// Atualizar configurações do site (apenas admin)
export const updateSiteSettings = async (settings, adminWallet) => {
  try {
    // Verificar se é admin
    const adminWalletAddress = import.meta.env.VITE_ADMIN_WALLET?.toLowerCase();
    if (adminWallet.toLowerCase() !== adminWalletAddress) {
      throw new Error('Acesso negado: apenas o administrador pode alterar configurações');
    }

    const { data, error } = await supabase
      .from('site_settings')
      .upsert({
        ...settings,
        updated_at: new Date().toISOString(),
        updated_by: adminWallet.toLowerCase()
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error);
    throw error;
  }
};

// ===========================================
// FUNÇÕES DE ESTATÍSTICAS
// ===========================================

// Obter estatísticas gerais
export const getGeneralStats = async () => {
  try {
    const [
      { count: totalUsers },
      { count: totalTransactions },
      { count: totalStakers },
      { count: newsletterSubscribers }
    ] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('transactions').select('*', { count: 'exact', head: true }),
      supabase.from('staking_events').select('wallet_address', { count: 'exact', head: true }),
      supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true)
    ]);

    return {
      totalUsers: totalUsers || 0,
      totalTransactions: totalTransactions || 0,
      totalStakers: totalStakers || 0,
      newsletterSubscribers: newsletterSubscribers || 0
    };
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    return {
      totalUsers: 0,
      totalTransactions: 0,
      totalStakers: 0,
      newsletterSubscribers: 0
    };
  }
};

// ===========================================
// FUNÇÕES DE LOGS DE ADMIN
// ===========================================

// Salvar log de ação do admin
export const saveAdminLog = async (action, details, adminWallet) => {
  try {
    const { data, error } = await supabase
      .from('admin_logs')
      .insert({
        admin_wallet: adminWallet.toLowerCase(),
        action,
        details,
        created_at: new Date().toISOString()
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao salvar log do admin:', error);
    throw error;
  }
};

// Obter logs do admin
export const getAdminLogs = async (adminWallet, limit = 50) => {
  try {
    // Verificar se é admin
    const adminWalletAddress = import.meta.env.VITE_ADMIN_WALLET?.toLowerCase();
    if (adminWallet.toLowerCase() !== adminWalletAddress) {
      throw new Error('Acesso negado: apenas o administrador pode ver os logs');
    }

    const { data, error } = await supabase
      .from('admin_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao obter logs do admin:', error);
    return [];
  }
};

// ===========================================
// FUNÇÕES UTILITÁRIAS
// ===========================================

// Verificar se é administrador
export const isAdmin = (walletAddress) => {
  const adminWallet = import.meta.env.VITE_ADMIN_WALLET?.toLowerCase();
  return walletAddress?.toLowerCase() === adminWallet;
};

// Verificar status da conexão com Supabase
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('id')
      .limit(1);

    return !error;
  } catch (error) {
    console.error('Erro na conexão com Supabase:', error);
    return false;
  }
};

