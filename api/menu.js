import { createClient } from '@supabase/supabase-js';

// Inicializa o cliente Supabase usando variáveis de ambiente do Vercel
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ 
        error: 'Supabase credentials not configured in Vercel environment variables.',
        help: 'Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel project settings.'
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: menuItems, error } = await supabase
      .from('dishes')
      .select('*')
      .eq('is_visible_digital', true);

    if (error) throw error;

    res.status(200).json({ 
      success: true, 
      data: menuItems, 
      count: menuItems.length,
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}