// Teste de debug para o menu digital standalone
(function() {
  'use strict';
  
  console.log('[MenuDigital] === INICIANDO DEBUG ===');
  
  // Configuração do Supabase
  const SUPABASE_URL = 'https://yxbwprglwqhxybyosfio.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4Yndwcmdsd3FoeHlieW9zZmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2OTk2OTgsImV4cCI6MjA0OTI3NTY5OH0.qiGyo9n9Ig3_vq7z5lhtE9VeiR6nQn8hHM6K2Si7cKM';
  
  // Teste rápido de conexão
  console.log('[MenuDigital] Testando conexão com Supabase...');
  
  fetch(`${SUPABASE_URL}/rest/v1/dishes?select=id,name,price&limit=3`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  })
  .then(response => {
    console.log('[MenuDigital] ✅ Conexão estabelecida! Status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('[MenuDigital] 📊 Dados recebidos:', data.length, 'pratos');
    data.forEach(dish => {
      console.log(`   - ${dish.name}: ${dish.price} Kz`);
    });
  })
  .catch(error => {
    console.error('[MenuDigital] ❌ Erro de conexão:', error.message);
  });
  
  // Teste com is_visible_digital
  setTimeout(() => {
    console.log('[MenuDigital] Testando filtro is_visible_digital...');
    
    fetch(`${SUPABASE_URL}/rest/v1/dishes?select=*&is_visible_digital=eq.true&limit=5`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    })
    .then(response => {
      console.log('[MenuDigital] ✅ Filtro testado! Status:', response.status);
      return response.json();
    })
    .then(data => {
      console.log('[MenuDigital] 📊 Pratos visíveis:', data.length);
      data.forEach(dish => {
        console.log(`   - ${dish.name}: ${dish.price} Kz | Visível: ${dish.is_visible_digital}`);
      });
    })
    .catch(error => {
      console.error('[MenuDigital] ❌ Erro no filtro:', error.message);
    });
  }, 2000);
  
  // Teste de categorias
  setTimeout(() => {
    console.log('[MenuDigital] Testando categorias...');
    
    fetch(`${SUPABASE_URL}/rest/v1/categories?select=*&limit=5`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    })
    .then(response => {
      console.log('[MenuDigital] ✅ Categorias testadas! Status:', response.status);
      return response.json();
    })
    .then(data => {
      console.log('[MenuDigital] 📂 Categorias:', data.length);
      data.forEach(cat => {
        console.log(`   - ${cat.name} (ID: ${cat.id})`);
      });
    })
    .catch(error => {
      console.error('[MenuDigital] ❌ Erro nas categorias:', error.message);
    });
  }, 4000);
  
  console.log('[MenuDigital] === DEBUG FINALIZADO ===');
})();