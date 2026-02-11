// Menu Digital standalone - versão com estilo da app e dados reais do Supabase
(function() {
  'use strict';
  
  console.log('[MenuDigital] Iniciando carregamento standalone...');
  
  // Sistema de loading e error handling
  let retryCount = 0;
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000;
  
  // Configuração do Supabase
  const SUPABASE_URL = 'https://yxbwprglwqhxybyosfio.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4Yndwcmdsd3FoeHlieW9zZmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2OTk2OTgsImV4cCI6MjA0OTI3NTY5OH0.qiGyo9n9Ig3_vq7z5lhtE9VeiR6nQn8hHM6K2Si7cKM';
  
  // Dados reais do restaurante
  const RESTAURANT_INFO = {
    name: "Tasca do Vereda",
    logo: "/logo.png",
    description: "Cozinha tradicional portuguesa e angolana",
    address: "Via AL 15, Talatona, Luanda",
    phone: "+244 923 000 000",
    openingHours: "Seg-Sex: 11h-22h, Sáb-Dom: 10h-23h",
    currency: "Kz"
  };
  
  // Funções de formatação
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(value).replace('AOA', '').trim() + ' ' + RESTAURANT_INFO.currency;
  };
  
  // Funções de UI
  const showErrorMessage = function(message) {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #0f172a; color: #e2e8f0; text-align: center; padding: 20px;">' +
        '<img src="' + RESTAURANT_INFO.logo + '" style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; object-fit: cover;" onerror="this.style.display=\'none\'" />' +
        '<h2 style="color: #ef4444; margin-bottom: 10px;">Erro ao Carregar Menu</h2>' +
        '<p style="color: #94a3b8; margin-bottom: 20px;">' + message + '</p>' +
        '<button onclick="window.location.reload()" style="background: #06b6d4; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px;">Tentar Novamente</button>' +
        '<p style="color: #64748b; font-size: 12px; margin-top: 20px;">Se o problema persistir, contate o suporte técnico.</p>' +
        '</div>';
    }
  };
  
  const showLoadingMessage = function() {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #0f172a; color: #e2e8f0; text-align: center; padding: 20px;">' +
        '<img src="' + RESTAURANT_INFO.logo + '" style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; object-fit: cover;" onerror="this.style.display=\'none\'" />' +
        '<div style="width: 40px; height: 40px; border: 3px solid #334155; border-top: 3px solid #06b6d4; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>' +
        '<h2 style="color: #e2e8f0; margin-bottom: 10px;">Carregando Menu Digital...</h2>' +
        '<p style="color: #64748b; font-size: 14px;">Por favor aguarde</p>' +
        '</div>' +
        '<style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>';
    }
  };
  
  // Dados reais do Supabase como fallback
    const DADOS_REAIS_FALLBACK = {
      categories: [
        { id: 'cat-1770756112030', name: 'Bebidas', icon: '🥤', is_visible_digital: true },
        { id: 'cat-1770756112031', name: 'Pratos Principais', icon: '🍽️', is_visible_digital: true },
        { id: 'cat-1770756112032', name: 'Petiscos', icon: '🍤', is_visible_digital: true },
        { id: 'cat-1770756112033', name: 'Sobremesas', icon: '🍰', is_visible_digital: true }
      ],
      menu: [
        // Bebidas
        { id: 'dish-1770756137970', name: 'Fino Lambreta', price: 600, description: 'Cerveja fino lambreta gelada', category_id: 'cat-1770756112030', is_visible_digital: true, is_featured: false, image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80' },
        { id: 'dish-1770756137971', name: 'Fino Tulipa', price: 1000, description: 'Cerveja fino tulipa premium', category_id: 'cat-1770756112030', is_visible_digital: true, is_featured: false, image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80' },
        { id: 'dish-1770756137972', name: 'Cuca (Lata)', price: 900, description: 'Cuca gelada em lata', category_id: 'cat-1770756112030', is_visible_digital: true, is_featured: false, image_url: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80' },
        
        // Pratos Principais
        { id: 'dish-1770756137973', name: 'Mufete de Peixe', price: 9500, description: 'Tradicional mufete de peixe angolano', category_id: 'cat-1770756112031', is_visible_digital: true, is_featured: true, image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a3a2720?auto=format&fit=crop&w=600&q=80' },
        { id: 'dish-1770756137974', name: 'Moamba de Galinha', price: 8200, description: 'Deliciosa moamba de galinha tradicional', category_id: 'cat-1770756112031', is_visible_digital: true, is_featured: true, image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80' },
        
        // Petiscos
        { id: 'dish-1770756137975', name: 'Kitaba (Petisco)', price: 2000, description: 'Kitaba servido como petisco', category_id: 'cat-1770756112032', is_visible_digital: true, is_featured: false, image_url: 'https://plus.unsplash.com/premium_photo-1694699435472-5c272db31ba6?auto=format&fit=crop&w=600&q=80' },
        
        // Sobremesas
        { id: 'dish-1770756137976', name: 'Doce de Ginguba', price: 800, description: 'Doce tradicional de ginguba', category_id: 'cat-1770756112033', is_visible_digital: true, is_featured: false, image_url: 'https://images.unsplash.com/photo-1563729768-dc77858ebd66?auto=format&fit=crop&w=600&q=80' }
      ]
    };

    // Função para carregar dados do Supabase
    const loadSupabaseData = async function() {
      try {
        console.log('[MenuDigital] Carregando dados do Supabase...');
        console.log('[MenuDigital] URL:', SUPABASE_URL);
        
        // Buscar categorias
        console.log('[MenuDigital] Buscando categorias...');
        const categoriesResponse = await fetch(`${SUPABASE_URL}/rest/v1/categories?select=*&order=name`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        
        console.log('[MenuDigital] Categorias response status:', categoriesResponse.status);
        
        if (!categoriesResponse.ok) {
          const errorText = await categoriesResponse.text();
          console.error('[MenuDigital] Erro categorias:', errorText);
          throw new Error('Erro ao carregar categorias');
        }
        
        const categories = await categoriesResponse.json();
        console.log('[MenuDigital] Categorias carregadas:', categories.length);
        
        // Buscar pratos
        console.log('[MenuDigital] Buscando pratos...');
        const dishesResponse = await fetch(`${SUPABASE_URL}/rest/v1/dishes?select=*&is_visible_digital=eq.true&order=name`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        
        console.log('[MenuDigital] Pratos response status:', dishesResponse.status);
        
        if (!dishesResponse.ok) {
          const errorText = await dishesResponse.text();
          console.error('[MenuDigital] Erro pratos:', errorText);
          throw new Error('Erro ao carregar pratos');
        }
        
        const dishes = await dishesResponse.json();
        console.log('[MenuDigital] Pratos carregados:', dishes.length);
        console.log('[MenuDigital] Exemplos de pratos:', dishes.slice(0, 3).map(d => `${d.name} (${d.price} Kz)`));
      
      // Transformar dados do Supabase para o formato esperado
      const transformedCategories = categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        icon: cat.icon || '🍽️',
        isVisibleDigital: cat.is_visible_digital !== false
      }));
      
      const transformedDishes = dishes.map(dish => ({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        description: dish.description || 'Delicioso prato do nosso restaurante',
        categoryId: dish.category_id,
        isVisibleDigital: dish.is_visible_digital !== false,
        isFeatured: dish.is_featured === true,
        image: dish.image_url || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
      }));
      
      return {
        categories: transformedCategories,
        menu: transformedDishes
      };
      
    } catch (error) {
        console.error('[MenuDigital] Erro ao carregar do Supabase:', error);
        console.log('[MenuDigital] Usando fallback com dados reais...');
        
        // Transformar dados do fallback para o formato esperado
        const transformedCategories = DADOS_REAIS_FALLBACK.categories.map(cat => ({
          id: cat.id,
          name: cat.name,
          icon: cat.icon || '🍽️',
          isVisibleDigital: cat.is_visible_digital !== false
        }));
        
        const transformedDishes = DADOS_REAIS_FALLBACK.menu.map(dish => ({
          id: dish.id,
          name: dish.name,
          price: dish.price,
          description: dish.description || 'Delicioso prato do nosso restaurante',
          categoryId: dish.category_id,
          isVisibleDigital: dish.is_visible_digital !== false,
          isFeatured: dish.is_featured === true,
          image: dish.image_url || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
        }));
        
        return {
          categories: transformedCategories,
          menu: transformedDishes
        };
      }
    };
  
  // Componente React do Menu
  const MenuApp = function() {
    const [state, setState] = React.useState({
      categories: [],
      menu: [],
      loading: true,
      error: null,
      selectedCategory: 'TODOS',
      searchTerm: '',
      selectedDish: null
    });
    
    React.useEffect(() => {
      loadMenuData();
    }, []);
    
    const loadMenuData = async () => {
      try {
        const data = await loadSupabaseData();
        setState(prev => ({
          ...prev,
          categories: data.categories,
          menu: data.menu,
          loading: false,
          error: null
        }));
      } catch (error) {
        console.error('[MenuDigital] Erro ao carregar menu:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Não foi possível carregar o menu. Verifique sua conexão.'
        }));
      }
    };
    
    const filteredDishes = state.menu.filter(dish => {
      const matchesCategory = state.selectedCategory === 'TODOS' || dish.categoryId === state.selectedCategory;
      const matchesSearch = state.searchTerm === '' || 
        dish.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(state.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    
    if (state.loading) {
      return React.createElement('div', {
        className: 'fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden font-sans text-slate-200'
      },
        React.createElement('div', {
          className: 'flex-1 flex items-center justify-center'
        },
          React.createElement('div', {
            className: 'flex flex-col items-center gap-4'
          },
            React.createElement('img', {
              src: RESTAURANT_INFO.logo,
              className: 'w-16 h-16 rounded-full object-cover',
              onError: (e) => e.target.style.display = 'none'
            }),
            React.createElement('div', {
              className: 'w-8 h-8 border-2 border-slate-700 border-t-primary rounded-full animate-spin'
            }),
            React.createElement('p', {
              className: 'text-slate-400 text-sm'
            }, 'Carregando menu...')
          )
        )
      );
    }
    
    if (state.error) {
      return React.createElement('div', {
        className: 'fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden font-sans text-slate-200'
      },
        React.createElement('div', {
          className: 'flex-1 flex items-center justify-center'
        },
          React.createElement('div', {
            className: 'flex flex-col items-center gap-4 text-center p-8'
          },
            React.createElement('img', {
              src: RESTAURANT_INFO.logo,
              className: 'w-16 h-16 rounded-full object-cover',
              onError: (e) => e.target.style.display = 'none'
            }),
            React.createElement('h2', {
              className: 'text-red-400 text-lg font-semibold'
            }, 'Erro ao Carregar Menu'),
            React.createElement('p', {
              className: 'text-slate-400 text-sm max-w-md'
            }, state.error),
            React.createElement('button', {
              onClick: loadMenuData,
              className: 'bg-primary text-white px-6 py-2 rounded-lg text-sm hover:bg-primary/80 transition-colors'
            }, 'Tentar Novamente')
          )
        )
      );
    }
    
    return React.createElement('div', {
      className: 'fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-hidden font-sans text-slate-200'
    },
      // Header
      React.createElement('header', {
        className: 'shrink-0 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40'
      },
        React.createElement('div', {
          className: 'container mx-auto px-6 py-4'
        },
          React.createElement('div', {
            className: 'flex items-center justify-between'
          },
            React.createElement('div', {
              className: 'flex items-center gap-4'
            },
              React.createElement('img', {
                src: RESTAURANT_INFO.logo,
                className: 'w-12 h-12 rounded-full object-cover',
                onError: (e) => e.target.style.display = 'none'
              }),
              React.createElement('div', {},
                React.createElement('h1', {
                  className: 'text-xl font-bold text-white'
                }, RESTAURANT_INFO.name),
                React.createElement('p', {
                  className: 'text-slate-400 text-sm'
                }, 'Menu Digital')
              )
            ),
            React.createElement('div', {
              className: 'text-right'
            },
              React.createElement('p', {
                className: 'text-slate-400 text-xs'
              }, RESTAURANT_INFO.openingHours)
            )
          )
        )
      ),
      
      // Search and Categories
      React.createElement('div', {
        className: 'bg-slate-950/50 border-b border-white/5'
      },
        React.createElement('div', {
          className: 'container mx-auto px-6 py-4 space-y-4'
        },
          // Search
          React.createElement('div', {
            className: 'relative'
          },
            React.createElement('input', {
              type: 'text',
              placeholder: 'Pesquisar pratos...',
              value: state.searchTerm,
              onChange: (e) => setState(prev => ({ ...prev, searchTerm: e.target.value })),
              className: 'w-full pl-12 pr-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors'
            }),
            React.createElement('div', {
              className: 'absolute left-4 top-1/2 -translate-y-1/2 text-slate-500'
            }, '🔍')
          ),
          
          // Categories
          React.createElement('div', {
            className: 'flex gap-2 overflow-x-auto pb-2'
          },
            React.createElement('button', {
              onClick: () => setState(prev => ({ ...prev, selectedCategory: 'TODOS' })),
              className: `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                state.selectedCategory === 'TODOS' 
                  ? 'bg-primary text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`
            }, 'Todos'),
            
            ...state.categories.map(cat =>
              React.createElement('button', {
                key: cat.id,
                onClick: () => setState(prev => ({ ...prev, selectedCategory: cat.id })),
                className: `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  state.selectedCategory === cat.id 
                    ? 'bg-primary text-white' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`
              }, cat.name)
            )
          )
        )
      ),
      
      // Menu Items
      React.createElement('main', {
        className: 'flex-1 overflow-y-auto bg-slate-950'
      },
        React.createElement('div', {
          className: 'container mx-auto px-6 py-6'
        },
          filteredDishes.length === 0 
            ? React.createElement('div', {
                className: 'flex flex-col items-center justify-center py-12 text-center'
              },
                React.createElement('div', {
                  className: 'text-6xl mb-4'
                }, '🔍'),
                React.createElement('h3', {
                  className: 'text-lg font-semibold text-slate-300 mb-2'
                }, 'Nenhum prato encontrado'),
                React.createElement('p', {
                  className: 'text-slate-500'
                }, 'Tente ajustar sua pesquisa ou categoria.')
              )
            : React.createElement('div', {
                className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              },
                ...filteredDishes.map(dish =>
                  React.createElement('div', {
                    key: dish.id,
                    onClick: () => setState(prev => ({ ...prev, selectedDish: dish })),
                    className: 'bg-slate-900 rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 hover:bg-slate-800 transition-all duration-300 cursor-pointer group'
                  },
                    React.createElement('div', {
                      className: 'aspect-[4/3] overflow-hidden relative'
                    },
                      React.createElement('img', {
                        src: dish.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
                        alt: dish.name,
                        className: 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                      }),
                      dish.isFeatured && React.createElement('div', {
                        className: 'absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full font-medium'
                      }, '⭐ Destaque')
                    ),
                    React.createElement('div', {
                      className: 'p-5'
                    },
                      React.createElement('h3', {
                        className: 'font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors'
                      }, dish.name),
                      React.createElement('p', {
                        className: 'text-slate-400 text-sm mb-4 line-clamp-2'
                      }, dish.description),
                      React.createElement('div', {
                        className: 'flex items-center justify-between'
                      },
                        React.createElement('span', {
                          className: 'text-xl font-bold text-primary'
                        }, formatCurrency(dish.price)),
                        React.createElement('span', {
                          className: 'text-slate-500 text-sm'
                        }, 'Ver detalhes →')
                      )
                    )
                  )
                )
              )
        )
      ),
      
      // Modal/Popup
      state.selectedDish && React.createElement('div', {
        className: 'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4',
        onClick: (e) => {
          if (e.target === e.currentTarget) {
            setState(prev => ({ ...prev, selectedDish: null }));
          }
        }
      },
        React.createElement('div', {
          className: 'bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10'
        },
          React.createElement('div', {
            className: 'relative'
          },
            React.createElement('img', {
              src: state.selectedDish.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop',
              alt: state.selectedDish.name,
              className: 'w-full h-64 object-cover'
            }),
            React.createElement('button', {
              onClick: () => setState(prev => ({ ...prev, selectedDish: null })),
              className: 'absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors'
            }, '✕')
          ),
          React.createElement('div', {
            className: 'p-6'
          },
            React.createElement('div', {
              className: 'flex items-start justify-between mb-4'
            },
              React.createElement('div', {},
                React.createElement('h2', {
                  className: 'text-2xl font-bold text-white mb-2'
                }, state.selectedDish.name),
                state.selectedDish.isFeatured && React.createElement('div', {
                  className: 'inline-flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium'
                }, '⭐ Destaque do Chef')
              ),
              React.createElement('div', {
                className: 'text-right'
              },
                React.createElement('div', {
                  className: 'text-3xl font-bold text-primary'
                }, formatCurrency(state.selectedDish.price))
              )
            ),
            React.createElement('p', {
              className: 'text-slate-300 mb-6 leading-relaxed'
            }, state.selectedDish.description),
            React.createElement('div', {
              className: 'bg-slate-800 rounded-xl p-4 mb-6'
            },
              React.createElement('h4', {
                className: 'font-semibold text-white mb-2'
              }, 'Informações do Restaurante'),
              React.createElement('div', {
                className: 'space-y-1 text-sm text-slate-400'
              },
                React.createElement('div', {}, '📍 ' + RESTAURANT_INFO.address),
                React.createElement('div', {}, '📞 ' + RESTAURANT_INFO.phone),
                React.createElement('div', {}, '🕒 ' + RESTAURANT_INFO.openingHours)
              )
            ),
            React.createElement('div', {
              className: 'flex gap-3'
            },
              React.createElement('button', {
                onClick: () => setState(prev => ({ ...prev, selectedDish: null })),
                className: 'flex-1 bg-slate-800 text-white py-3 rounded-xl font-medium hover:bg-slate-700 transition-colors'
              }, 'Fechar'),
              React.createElement('button', {
                className: 'flex-1 bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/80 transition-colors'
              }, 'Chamar Garçom')
            )
          )
        )
      )
    );
  };
  
  // Inicialização
  const tryLoadReact = function() {
    console.log('[MenuDigital] Tentando carregar React...');
    
    // Timeout de segurança
    const timeout = setTimeout(() => {
      console.error('[MenuDigital] Timeout ao carregar React');
      showErrorMessage('Tempo de carregamento excedido. Verifique sua conexão.');
    }, 8000);
    
    // Verificar se React está disponível
    if (typeof React !== 'undefined' && typeof ReactDOM !== 'undefined') {
      clearTimeout(timeout);
      console.log('[MenuDigital] React carregado com sucesso!');
      
      try {
        const root = document.getElementById('root');
        if (root) {
          ReactDOM.render(React.createElement(MenuApp), root);
          console.log('[MenuDigital] App renderizado com sucesso!');
        } else {
          throw new Error('Elemento root não encontrado');
        }
      } catch (error) {
        console.error('[MenuDigital] Erro ao renderizar:', error);
        showErrorMessage('Erro ao iniciar o menu digital.');
      }
    } else {
      // Aguardar mais um pouco
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        console.log(`[MenuDigital] React não disponível, tentativa ${retryCount}/${MAX_RETRIES}`);
        setTimeout(tryLoadReact, RETRY_DELAY);
      } else {
        clearTimeout(timeout);
        console.error('[MenuDigital] Máximo de tentativas alcançado');
        showErrorMessage('Não foi possível carregar o menu digital. Verifique sua conexão.');
      }
    }
  };
  
  // Iniciar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryLoadReact);
  } else {
    tryLoadReact();
  }
  
  console.log('[MenuDigital] Script standalone inicializado');
})();