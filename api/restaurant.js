import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Supabase credentials not configured' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: remoteData, error } = await supabase
      .from('application_state')
      .select('data')
      .eq('id', 'current_state')
      .single();

    if (error) throw error;

    const state = JSON.parse(remoteData.data);
    const settings = state.settings || {};

    res.status(200).json({ 
      success: true, 
      data: {
        name: settings.restaurantName || 'Tasca do Vereda',
        phone: settings.phone || '',
        address: settings.address || '',
        logo: settings.appLogoUrl || '',
        currency: settings.currency || 'Kz'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}