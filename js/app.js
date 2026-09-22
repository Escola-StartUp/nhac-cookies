/**
 * nhac! COOKIES - Lógica do Aplicativo Responsivo
 * Navegação fluida entre telas, catálogo completo, carrinho interativo e checkout simulado
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. CATÁLOGO COMPLETO DE PRODUTOS ---
  const PRODUCTS = [
    {
      id: 'gotas',
      name: 'Biscoito Cookie com gotas de Chocolate (Clássico)',
      shortTitle: 'Gotas de Chocolate',
      subtitle: 'Macio por dentro, crocante por fora!',
      weight: '35g',
      price: 6.90,
      category: 'classicos',
      badge: 'FEITO À MÃO',
      targetView: 'gotas',
      image: 'public/cookie_tradicional.png',
      bg: '#7132C2'
    },
    {
      id: 'tradicional',
      name: 'Cookie Tradicional Baunilha com Gotas',
      shortTitle: 'Baunilha Tradicional',
      subtitle: 'Massa clássica amanteigada com gotas nobres de chocolate',
      weight: '35g',
      price: 6.90,
      category: 'classicos',
      badge: 'FEITO À MÃO',
      targetView: 'gotas',
      image: 'public/cookie_tradicional.png',
      bg: '#531C0D'
    },
    {
      id: 'recheio',
      name: 'Biscoito Cookie com recheio de Chocolate',
      shortTitle: 'Recheio de Chocolate',
      subtitle: 'Crocante por fora, cremoso por dentro!',
      weight: '40g',
      price: 7.90,
      category: 'recheados',
      badge: 'FEITO À MÃO',
      targetView: 'recheio',
      image: 'public/cookie_recheado.png',
      bg: '#531C0D'
    },
    {
      id: 'redvelvet',
      name: 'Cookie Red Velvet com Gotas de Chocolate',
      shortTitle: 'Red Velvet Especial',
      subtitle: 'Massa aveludada vermelha com gotas nobres',
      weight: '35g',
      price: 7.90,
      category: 'especiais',
      badge: 'RECEITA NOVA',
      image: 'public/cookie01.jpeg',
      bg: '#7132C2'
    },
    {
      id: 'matcha',
      name: 'Cookie Matcha com Gotas de Chocolate',
      shortTitle: 'Matcha Especial',
      subtitle: 'Toque oriental suave com gotas de cacau',
      weight: '35g',
      price: 7.90,
      category: 'especiais',
      badge: 'EDIÇÃO LIMITADA',
      image: 'public/cookie03.jpeg',
      bg: '#531C0D'
    },
    {
      id: 'caixa',
      name: 'Caixa Especial com 12 Cookies Artesanais',
      shortTitle: 'Caixa Roxa Presente 12 un.',
      subtitle: 'Seleção dos melhores sabores na caixa de presente exclusiva',
      weight: '450g',
      price: 49.90,
      category: 'especiais',
      badge: 'MAIS VENDIDO',
      image: 'public/Caixa Roxa de Cookies Artesanais.png'
    }
  ];

  // Estado do Carrinho em Memória
  let cart = [];

  // --- 2. SISTEMA DE NAVEGAÇÃO DE VISTAS / TELAS ---
  const viewPanels = {
    splash: document.getElementById('view-splash'),
    home: document.getElementById('view-home'),
    gotas: document.getElementById('view-gotas'),
    recheio: document.getElementById('view-recheio'),
    catalogo: document.getElementById('view-catalogo')
  };

  const navItems = document.querySelectorAll('.desktop-nav .nav-item');
  const mobileNavBtns = document.querySelectorAll('.mobile-bottom-bar .mobile-nav-btn');
  const screensDropdownPanel = document.getElementById('screens-dropdown-panel');
  const btnScreensMenu = document.getElementById('btn-screens-menu');

  function showView(viewKey) {
    // Se for 'producao' ou 'sobre', exibe a Home e rola suavemente até a seção
    if (viewKey === 'producao' || viewKey === 'sobre') {
      showView('home');
      setTimeout(() => {
        const targetSection = document.getElementById(viewKey);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    // Marca a vista ativa no body (ex.: esconder header na capa splash como no ref)
    document.body.dataset.activeView = viewKey;

    // Oculta todas as vistas
    Object.values(viewPanels).forEach(panel => {
      if (panel) panel.classList.remove('active');
    });

    // Ativa a vista desejada
    const activePanel = viewPanels[viewKey] || viewPanels.home;
    if (activePanel) {
      activePanel.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Atualiza links da barra de navegação Desktop
    navItems.forEach(item => {
      if (item.getAttribute('data-view') === viewKey) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Atualiza botões da barra inferior Mobile
    mobileNavBtns.forEach(btn => {
      const bView = btn.getAttribute('data-view');
      if (bView === viewKey || (viewKey === 'splash' && bView === 'home')) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Fecha menu dropdown e menu lateral mobile
    if (screensDropdownPanel) screensDropdownPanel.classList.remove('show');
    closeMobileDrawer();
  }

  // Delegar cliques de navegação em qualquer elemento com [data-view]
  document.addEventListener('click', (e) => {
    const navBtn = e.target.closest('[data-view]');
    if (navBtn) {
      e.preventDefault();
      const viewKey = navBtn.getAttribute('data-view');
      showView(viewKey);
    }
  });

  // Toggle do Dropdown de Telas
  if (btnScreensMenu && screensDropdownPanel) {
    btnScreensMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      screensDropdownPanel.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      screensDropdownPanel.classList.remove('show');
    });
  }

  // --- 3. MENU LATERAL MOBILE ---
  const mobileDrawer = document.getElementById('mobile-drawer');
  const btnMobileMenu = document.getElementById('btn-mobile-menu');
  const btnDrawerClose = document.getElementById('btn-drawer-close');

  function openMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('active');
  }
  function closeMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
  }

  if (btnMobileMenu) btnMobileMenu.addEventListener('click', openMobileDrawer);
  if (btnDrawerClose) btnDrawerClose.addEventListener('click', closeMobileDrawer);
  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) closeMobileDrawer();
    });
  }

  // --- 4. RENDERIZAÇÃO DO CATÁLOGO DE PRODUTOS ---
  const catalogGrid = document.getElementById('catalog-products-grid');

  function renderCatalog(filterCategory = 'all') {
    if (!catalogGrid) return;
    catalogGrid.innerHTML = '';

    const filtered = PRODUCTS.filter(p => {
      if (filterCategory === 'all') return true;
      return p.category === filterCategory;
    });

    filtered.forEach((prod, idx) => {
      const card = document.createElement('div');
      card.className = 'catalog-product-item';
      card.style.animationDelay = `${Math.min(idx * 0.07, 0.42)}s`;
      if (prod.bg) {
        card.style.borderTop = `8px solid ${prod.bg}`;
      }

      const visualHtml = prod.image 
        ? `<img src="${prod.image}" alt="${prod.name}" class="catalog-cookie-img" loading="lazy">`
        : `<div class="empty-icon">🍪</div>`;

      card.innerHTML = `
        <div class="c-item-img-wrap" data-prod-view="${prod.targetView || ''}"${prod.bg ? ` style="background:${prod.bg}"` : ''}>
          ${visualHtml}
        </div>
        <div class="c-item-info">
          <span class="c-item-meta">${prod.weight} • ${prod.badge}</span>
          <h3 class="c-item-title">${prod.name}</h3>
        </div>
        <div class="c-item-footer">
          <span class="c-item-price">R$ ${prod.price.toFixed(2).replace('.', ',')}</span>
          <button class="btn-nhac-pill btn-card-add" data-add-cart="${prod.id}">Adicionar</button>
        </div>
      `;

      // Clicar na imagem do produto abre sua tela se houver tela dedicada
      const imgWrap = card.querySelector('.c-item-img-wrap');
      if (imgWrap && prod.targetView) {
        imgWrap.style.cursor = 'pointer';
        imgWrap.addEventListener('click', () => {
          showView(prod.targetView);
        });
      }

      catalogGrid.appendChild(card);
    });
  }

  // Filtros de Categoria no Catálogo
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-category');
      renderCatalog(cat);
    });
  });

  renderCatalog('all');

  // --- 5. CARRINHO DE COMPRAS INTERATIVO ---
  const cartSlideover = document.getElementById('cart-slideover');
  const btnCloseCart = document.getElementById('btn-close-cart');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalText = document.getElementById('cart-subtotal-text');
  const cartGrandtotalText = document.getElementById('cart-grandtotal-text');

  function openCart() {
    if (cartSlideover) {
      cartSlideover.classList.add('active');
      cartSlideover.setAttribute('aria-hidden', 'false');
    }
  }

  function closeCart() {
    if (cartSlideover) {
      cartSlideover.classList.remove('active');
      cartSlideover.setAttribute('aria-hidden', 'true');
    }
  }

  // Gatilhos de Abertura do Carrinho
  const cartTriggers = [
    document.getElementById('btn-open-cart'),
    document.getElementById('btn-bottom-open-cart'),
    ...document.querySelectorAll('.btn-cart-trigger')
  ];

  cartTriggers.forEach(btn => {
    if (btn) btn.addEventListener('click', openCart);
  });
  if (btnCloseCart) btnCloseCart.addEventListener('click', closeCart);
  if (cartSlideover) {
    cartSlideover.addEventListener('click', (e) => {
      if (e.target === cartSlideover) closeCart();
    });
  }

  // Adicionar ao Carrinho
  function addToCart(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: prod.id,
        name: prod.shortTitle || prod.name,
        price: prod.price,
        image: prod.image,
        type: prod.type,
        quantity: 1
      });
    }

    updateCartUI();
    showToast(`Adicionado ao carrinho: ${prod.shortTitle} 🍪`);
  }

  // Alterar Quantidade (+ / -)
  function modifyQuantity(productId, delta) {
    const itemIndex = cart.findIndex(i => i.id === productId);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += delta;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
      updateCartUI();
    }
  }

  // Atualizar Interface do Carrinho e Contadores
  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const formattedPrice = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

    // Atualiza contadores em todos os badges
    const badgeIds = ['header-cart-badge', 'mobile-bottom-badge', 'badge-screen-gotas', 'badge-screen-recheio'];
    badgeIds.forEach(id => {
      const badge = document.getElementById(id);
      if (badge) badge.textContent = String(totalCount);
    });

    if (cartSubtotalText) cartSubtotalText.textContent = formattedPrice;
    if (cartGrandtotalText) cartGrandtotalText.textContent = formattedPrice;

    // Renderiza lista de itens no painel
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <div class="empty-icon">🍪</div>
          <p>Seu carrinho está vazio</p>
          <span>Escolha nossos deliciosos cookies para começar!</span>
        </div>
      `;
      return;
    }

    cart.forEach(item => {
      const row = document.createElement('div');
      row.className = 'cart-item-row';

      let thumb = '🍪';
      if (item.image) {
        thumb = `<img src="${item.image}" alt="${item.name}">`;
      }

      row.innerHTML = `
        <div class="cart-item-img">${thumb}</div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span>
        </div>
        <div class="cart-item-controls">
          <button class="btn-qty" data-qty-minus="${item.id}">−</button>
          <span class="qty-num">${item.quantity}</span>
          <button class="btn-qty" data-qty-plus="${item.id}">+</button>
        </div>
      `;
      cartItemsContainer.appendChild(row);
    });
  }

  // Eventos de clique para Adicionar ao Carrinho e Modificar Quantidade
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add-cart]');
    if (addBtn) {
      e.stopPropagation();
      const pId = addBtn.getAttribute('data-add-cart');
      addToCart(pId);
    }

    const minusBtn = e.target.closest('[data-qty-minus]');
    if (minusBtn) {
      const pId = minusBtn.getAttribute('data-qty-minus');
      modifyQuantity(pId, -1);
    }

    const plusBtn = e.target.closest('[data-qty-plus]');
    if (plusBtn) {
      const pId = plusBtn.getAttribute('data-qty-plus');
      modifyQuantity(pId, 1);
    }
  });

  // --- 6. CHECKOUT SIMULADO ---
  const btnTriggerCheckout = document.getElementById('btn-trigger-checkout');
  const checkoutModal = document.getElementById('checkout-modal');
  const btnModalClose = document.getElementById('btn-modal-close');
  const btnModalDone = document.getElementById('btn-modal-done');
  const modalTotalText = document.getElementById('modal-total-text');

  function openCheckoutModal() {
    if (cart.length === 0) {
      showToast('Seu carrinho está vazio! Adicione um cookie antes.');
      return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (modalTotalText) {
      modalTotalText.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
    }

    closeCart();
    if (checkoutModal) checkoutModal.classList.add('active');
  }

  function finishOrder() {
    if (checkoutModal) checkoutModal.classList.remove('active');
    cart = [];
    updateCartUI();
    showToast('Pedido concluído! Bom apetite! 🎉');
    showView('home');
  }

  if (btnTriggerCheckout) btnTriggerCheckout.addEventListener('click', openCheckoutModal);
  if (btnModalClose) btnModalClose.addEventListener('click', finishOrder);
  if (btnModalDone) btnModalDone.addEventListener('click', finishOrder);

  // --- 7. NOTIFICAÇÕES TOAST ---
  const toastStack = document.getElementById('toast-stack');

  function showToast(msg) {
    if (!toastStack) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<span>🍪</span><span>${msg}</span>`;
    toastStack.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  // --- 8. ANIMAÇÕES INTERATIVAS NOS COOKIES DAS TELAS 3 E 4 ---
  const cookieGotas = document.getElementById('interactive-cookie-gotas');
  const cookieRecheio = document.getElementById('interactive-cookie-recheio');

  if (cookieGotas) {
    cookieGotas.addEventListener('click', () => {
      cookieGotas.style.transform = 'scale(1.1) rotate(6deg)';
      showToast('Crocrante por fora e macio por dentro! 😋');
      setTimeout(() => {
        cookieGotas.style.transform = '';
      }, 300);
    });
  }

  if (cookieRecheio) {
    cookieRecheio.addEventListener('click', () => {
      cookieRecheio.style.transform = 'scale(1.1) rotate(-6deg)';
      showToast('Chocolate cremoso derretendo! 🍫');
      setTimeout(() => {
        cookieRecheio.style.transform = '';
      }, 300);
    });
  }

  // --- 9. CARROSSEL AUTOMÁTICO DA PRODUÇÃO ---
  const prodTrack = document.getElementById('prod-carousel-track');
  const prodViewport = document.getElementById('prod-carousel-viewport');
  const prodDotsWrap = document.getElementById('prod-dots');
  const prodPrev = document.getElementById('prod-prev');
  const prodNext = document.getElementById('prod-next');
  const prodCurrent = document.getElementById('prod-current');
  const prodTotal = document.getElementById('prod-total');
  const prodBar = document.getElementById('prod-progress-bar');
  const prodCarousel = document.getElementById('prod-carousel');

  if (prodTrack && prodViewport) {
    const slides = Array.from(prodTrack.children);
    const total = slides.length;
    let index = 0;
    let timer = null;
    const AUTOPLAY_MS = 4200;

    if (prodTotal) prodTotal.textContent = String(total);

    // Dots
    if (prodDotsWrap) {
      prodDotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'prod-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Ir para foto ${i + 1}`);
        dot.addEventListener('click', () => {
          goTo(i);
          restart();
        });
        prodDotsWrap.appendChild(dot);
      });
    }
    const dots = prodDotsWrap ? Array.from(prodDotsWrap.children) : [];

    function goTo(i) {
      index = (i + total) % total;
      prodTrack.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((s, si) => s.classList.toggle('is-active', si === index));
      dots.forEach((d, di) => d.classList.toggle('active', di === index));
      if (prodCurrent) prodCurrent.textContent = String(index + 1);
      if (prodBar) prodBar.style.width = `${((index + 1) / total) * 100}%`;
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function start() {
      stop();
      timer = setInterval(next, AUTOPLAY_MS);
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }
    function restart() { start(); }

    if (prodNext) prodNext.addEventListener('click', () => { next(); restart(); });
    if (prodPrev) prodPrev.addEventListener('click', () => { prev(); restart(); });

    // Pausa no hover / foco (divertido: não gira enquanto o usuário está olhando)
    if (prodCarousel) {
      prodCarousel.addEventListener('mouseenter', stop);
      prodCarousel.addEventListener('mouseleave', start);
      prodCarousel.addEventListener('focusin', stop);
      prodCarousel.addEventListener('focusout', start);
    }

    // Swipe touch + arraste mouse
    let startX = 0;
    let dragging = false;
    prodViewport.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      stop();
    }, { passive: true });
    prodViewport.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) next(); else prev();
      }
      start();
    }, { passive: true });

    prodViewport.addEventListener('mousedown', (e) => {
      dragging = true;
      startX = e.clientX;
      stop();
    });
    window.addEventListener('mouseup', (e) => {
      if (!dragging) return;
      dragging = false;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) next(); else prev();
      }
      start();
    });

    // Teclado
    if (prodCarousel) {
      prodCarousel.setAttribute('tabindex', '0');
      prodCarousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { next(); restart(); }
        if (e.key === 'ArrowLeft') { prev(); restart(); }
      });
    }

    // Pausa quando fora da tela (performance)
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) start();
          else stop();
        });
      }, { threshold: 0.2 }).observe(prodCarousel);
    }

    goTo(0);
    start();
  }

  // --- 10. CARROSSEL AUTOMÁTICO DOS SABORES (centro em destaque, caixa fixa) ---
  const flavorTrack = document.getElementById('flavor-track');
  const flavorViewport = document.getElementById('flavor-viewport');
  const flavorDotsWrap = document.getElementById('flavor-dots');
  const flavorCarousel = document.getElementById('flavor-carousel');

  if (flavorTrack && flavorViewport) {
    const fSlides = Array.from(flavorTrack.children);
    const fTotal = fSlides.length;
    let fIndex = 0;
    let fTimer = null;
    const FLAVOR_MS = 3500;

    if (flavorDotsWrap) {
      flavorDotsWrap.innerHTML = '';
      fSlides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'flavor-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Destacar sabor ${i + 1}`);
        dot.addEventListener('click', () => {
          fGoTo(i);
          fRestart();
        });
        flavorDotsWrap.appendChild(dot);
      });
    }
    const fDots = flavorDotsWrap ? Array.from(flavorDotsWrap.children) : [];

    function fGoTo(i) {
      fIndex = (i + fTotal) % fTotal;
      const card = fSlides[fIndex];
      if (!card) return;
      const gap = parseFloat(getComputedStyle(flavorTrack).gap) || 0;
      const baseW = fSlides[0].offsetWidth;
      const vpW = flavorViewport.clientWidth;
      const containerW = flavorCarousel.parentElement.getBoundingClientRect().width;
      // Sangria lateral máxima: até 30% da largura do container para cards vizinhos sobrarem visíveis
      const bleed = Math.min(Math.max((vpW - baseW) / 2, 0), containerW * 0.3);
      flavorCarousel.style.setProperty('--flavor-bleed', `${bleed}px`);
      const centerOffset = (vpW - baseW) / 2;
      const totalTrackW = fTotal * (baseW + gap) - gap;
      if (totalTrackW <= vpW) {
        flavorTrack.style.transform = `translateX(0px)`;
      } else {
        const x = fIndex * (baseW + gap) - centerOffset;
        flavorTrack.style.transform = `translateX(${-x}px)`;
      }
      fSlides.forEach((s, si) => s.classList.toggle('is-center', si === fIndex));
      fDots.forEach((d, di) => d.classList.toggle('active', di === fIndex));
    }

    function fStart() {
      fStop();
      fTimer = setInterval(() => fGoTo(fIndex + 1), FLAVOR_MS);
    }
    function fStop() {
      if (fTimer) clearInterval(fTimer);
      fTimer = null;
    }
    function fRestart() { fStart(); }

    const flavorPrevBtn = document.getElementById('flavor-prev-btn');
    const flavorNextBtn = document.getElementById('flavor-next-btn');
    if (flavorPrevBtn) {
      flavorPrevBtn.addEventListener('click', () => {
        fGoTo(fIndex - 1);
        fRestart();
      });
    }
    if (flavorNextBtn) {
      flavorNextBtn.addEventListener('click', () => {
        fGoTo(fIndex + 1);
        fRestart();
      });
    }

    if (flavorCarousel) {
      flavorCarousel.addEventListener('mouseenter', fStop);
      flavorCarousel.addEventListener('mouseleave', fStart);
      flavorCarousel.addEventListener('focusin', fStop);
      flavorCarousel.addEventListener('focusout', fStart);
    }

    let fStartX = 0;
    flavorViewport.addEventListener('touchstart', (e) => {
      fStartX = e.touches[0].clientX;
      fStop();
    }, { passive: true });
    flavorViewport.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - fStartX;
      if (Math.abs(dx) > 40) fGoTo(fIndex + (dx < 0 ? 1 : -1));
      fStart();
    }, { passive: true });

    // Arraste com o mouse (desktop)
    let fDragging = false;
    let fMouseStartX = 0;
    let fDragMoved = false;

    flavorViewport.addEventListener('mousedown', (e) => {
      fDragging = true;
      fDragMoved = false;
      fMouseStartX = e.clientX;
      fStop();
      flavorTrack.style.transition = 'none';
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!fDragging) return;
      const dx = e.clientX - fMouseStartX;
      if (Math.abs(dx) > 5) fDragMoved = true;
      const gap = parseFloat(getComputedStyle(flavorTrack).gap) || 0;
      const baseW = fSlides[0].offsetWidth;
      const vpW = flavorViewport.clientWidth;
      const centerOffset = (vpW - baseW) / 2;
      const baseX = fIndex * (baseW + gap) - centerOffset;
      flavorTrack.style.transform = `translateX(${-baseX + dx}px)`;
    });

    window.addEventListener('mouseup', (e) => {
      if (!fDragging) return;
      fDragging = false;
      flavorTrack.style.transition = '';
      const dx = e.clientX - fMouseStartX;
      if (Math.abs(dx) > 60) fGoTo(fIndex + (dx < 0 ? 1 : -1));
      else fGoTo(fIndex);
      fStart();
    });

    // Evita clique acidental em botões/cards após um arraste real
    flavorViewport.addEventListener('click', (e) => {
      if (fDragMoved) {
        e.preventDefault();
        e.stopPropagation();
        fDragMoved = false;
      }
    }, true);

    window.addEventListener('resize', () => fGoTo(fIndex));

    if ('IntersectionObserver' in window && flavorCarousel) {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { fGoTo(fIndex); fStart(); }
          else fStop();
        });
      }, { threshold: 0.2 }).observe(flavorCarousel);
    }

    fGoTo(0);
    fStart();
  }

  // --- 11. ANIMAÇÕES AO ROLAR (ida e volta entre seções) ---
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade');
  revealEls.forEach((el) => {
    const delay = el.getAttribute('data-reveal-delay');
    if (delay) el.style.transitionDelay = `${delay}s`;
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        // Alterna nos dois sentidos: entrando anima, saindo reseta para reanimar ao voltar
        if (en.isIntersecting) en.target.classList.add('visible');
        else en.target.classList.remove('visible');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Inicializa a UI do carrinho
  updateCartUI();

  // --- 12. LGPD (Lei nº 13.709/2018): Consent Manager granular e versionado ---
  // Categorias: necessary (sempre ativo) + functional + statistics + marketing (opt-in).
  // Prova de consentimento: timestamp ISO, versão da política e escolhas (arts. 5º, 8º e 16).
  const LGPD_KEY = 'nhac-cookies-consent';
  const LGPD_POLICY_VERSION = '1.0';
  const LGPD_POLICY_DATE = '2026-09-21';

  const lgpdBanner = document.getElementById('lgpd-banner');
  const lgpdPrefsModal = document.getElementById('lgpd-preferences-modal');
  const lgpdPolicyModal = document.getElementById('lgpd-policy-modal');
  let lgpdLastFocus = null;

  function lgpdRead() {
    try {
      const raw = localStorage.getItem(LGPD_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      // Invalida consentimentos de versão antiga da política: pede novo opt-in.
      if (!data || data.v !== LGPD_POLICY_VERSION) return null;
      return data;
    } catch (e) { return null; }
  }

  function lgpdShowBanner() {
    if (!lgpdBanner) return;
    lgpdBanner.hidden = false;
    delete lgpdBanner.dataset.state;
  }

  function lgpdHideBanner() {
    if (!lgpdBanner) return;
    lgpdBanner.hidden = true;
    lgpdBanner.dataset.state = 'accepted';
  }

  function lgpdOpenModal(modal) {
    if (!modal) return;
    lgpdLastFocus = document.activeElement;
    modal.dataset.open = 'true';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const focusable = modal.querySelector('.lgpd-modal-close, input[type="checkbox"], .lgpd-btn');
    if (focusable) setTimeout(() => focusable.focus(), 60);
  }

  function lgpdCloseModal(modal) {
    if (!modal) return;
    delete modal.dataset.open;
    modal.setAttribute('aria-hidden', 'true');
    // Só devolve o scroll se nenhum outro modal estiver aberto.
    const anyOpen = document.querySelector('.lgpd-modal-backdrop[data-open="true"]');
    if (!anyOpen) document.body.style.overflow = '';
    if (lgpdLastFocus && lgpdLastFocus.focus) {
      try { lgpdLastFocus.focus(); } catch (e) { /* sem foco anterior */ }
    }
  }

  function lgpdSyncToggles(consent) {
    const f = document.getElementById('lgpd-toggle-functional');
    const s = document.getElementById('lgpd-toggle-statistics');
    const m = document.getElementById('lgpd-toggle-marketing');
    if (f) f.checked = !!(consent && consent.functional);
    if (s) s.checked = !!(consent && consent.statistics);
    if (m) m.checked = !!(consent && consent.marketing);
  }

  // Portão de categorias: só executa o que foi consentido.
  // Uso futuro: <script type="text/plain" data-cookiecategory="statistics" data-src="...">
  function lgpdApplyConsent(consent) {
    const allowed = {
      necessary: true,
      functional: !!(consent && consent.functional),
      statistics: !!(consent && consent.statistics),
      marketing: !!(consent && consent.marketing)
    };
    document.querySelectorAll('script[type="text/plain"][data-cookiecategory]').forEach((placeholder) => {
      const cat = (placeholder.getAttribute('data-cookiecategory') || '').toLowerCase();
      if (!allowed[cat] || placeholder.dataset.loaded === 'true') return;
      placeholder.dataset.loaded = 'true';
      const real = document.createElement('script');
      if (placeholder.dataset.src) real.src = placeholder.dataset.src;
      if (placeholder.textContent) real.textContent = placeholder.textContent;
      real.async = true;
      document.head.appendChild(real);
    });
    // Expõe estado para auditoria/debug e para futuras integrações.
    window.nhacConsent = Object.assign({ v: LGPD_POLICY_VERSION }, allowed);
    document.dispatchEvent(new CustomEvent('nhac:consent-updated', { detail: window.nhacConsent }));
  }

  function lgpdSave(choices) {
    const consent = {
      v: LGPD_POLICY_VERSION,
      policyDate: LGPD_POLICY_DATE,
      necessary: true,
      functional: !!choices.functional,
      statistics: !!choices.statistics,
      marketing: !!choices.marketing,
      ts: new Date().toISOString()
    };
    consent.all = consent.functional && consent.statistics && consent.marketing;
    try {
      localStorage.setItem(LGPD_KEY, JSON.stringify(consent));
    } catch (e) { /* localStorage indisponível: mantém banner visível */ return; }
    lgpdApplyConsent(consent);
    lgpdCloseModal(lgpdPrefsModal);
    lgpdHideBanner();
    showToast(
      consent.all ? 'Obrigado! Todas as categorias foram ativadas. 🍪'
        : (!consent.functional && !consent.statistics && !consent.marketing)
          ? 'Preferência salva: só cookies essenciais. ✅'
          : 'Suas preferências de cookies foram salvas. ✅'
    );
  }

  function lgpdOpenPreferences() {
    lgpdSyncToggles(lgpdRead());
    lgpdCloseModal(lgpdPolicyModal);
    lgpdOpenModal(lgpdPrefsModal);
  }

  // Fiação dos botões do banner.
  const lgpdAcceptBtn = document.getElementById('lgpd-accept');
  const lgpdDeclineBtn = document.getElementById('lgpd-decline');
  const lgpdCustomizeBtn = document.getElementById('lgpd-customize');
  if (lgpdAcceptBtn) lgpdAcceptBtn.addEventListener('click', () => lgpdSave({ functional: true, statistics: true, marketing: true }));
  if (lgpdDeclineBtn) lgpdDeclineBtn.addEventListener('click', () => lgpdSave({ functional: false, statistics: false, marketing: false }));
  if (lgpdCustomizeBtn) lgpdCustomizeBtn.addEventListener('click', lgpdOpenPreferences);

  // Botões do modal de preferências.
  const lgpdSaveModal = document.getElementById('lgpd-save-modal');
  const lgpdAcceptAllModal = document.getElementById('lgpd-accept-all-modal');
  const lgpdRejectAllModal = document.getElementById('lgpd-reject-all-modal');
  const lgpdModalClose = document.getElementById('lgpd-modal-close');
  if (lgpdSaveModal) lgpdSaveModal.addEventListener('click', () => {
    lgpdSave({
      functional: document.getElementById('lgpd-toggle-functional')?.checked,
      statistics: document.getElementById('lgpd-toggle-statistics')?.checked,
      marketing: document.getElementById('lgpd-toggle-marketing')?.checked
    });
  });
  if (lgpdAcceptAllModal) lgpdAcceptAllModal.addEventListener('click', () => lgpdSave({ functional: true, statistics: true, marketing: true }));
  if (lgpdRejectAllModal) lgpdRejectAllModal.addEventListener('click', () => lgpdSave({ functional: false, statistics: false, marketing: false }));
  if (lgpdModalClose) lgpdModalClose.addEventListener('click', () => {
    lgpdCloseModal(lgpdPrefsModal);
    // LGPD art. 8º: fechar sem escolher NÃO é consentimento — banner volta.
    if (!lgpdRead()) lgpdShowBanner();
  });

  // Modal da Política de Privacidade e Cookies.
  const lgpdPolicyClose = document.getElementById('lgpd-policy-close');
  const lgpdPolicyOk = document.getElementById('lgpd-policy-ok');
  const lgpdPolicyToPrefs = document.getElementById('lgpd-policy-to-preferences');
  const lgpdOpenPolicyLink = document.getElementById('lgpd-open-policy-link');
  const lgpdOpenPolicyFooter = document.getElementById('lgpd-open-policy-footer');
  function lgpdOpenPolicy() {
    lgpdCloseModal(lgpdPrefsModal);
    lgpdOpenModal(lgpdPolicyModal);
  }
  if (lgpdOpenPolicyLink) lgpdOpenPolicyLink.addEventListener('click', lgpdOpenPolicy);
  if (lgpdOpenPolicyFooter) lgpdOpenPolicyFooter.addEventListener('click', lgpdOpenPolicy);
  if (lgpdPolicyClose) lgpdPolicyClose.addEventListener('click', () => lgpdCloseModal(lgpdPolicyModal));
  if (lgpdPolicyOk) lgpdPolicyOk.addEventListener('click', () => lgpdCloseModal(lgpdPolicyModal));
  if (lgpdPolicyToPrefs) lgpdPolicyToPrefs.addEventListener('click', lgpdOpenPreferences);

  // Fechar modais com ESC / clique fora (sem presumir consentimento).
  [lgpdPrefsModal, lgpdPolicyModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        lgpdCloseModal(modal);
        if (modal === lgpdPrefsModal && !lgpdRead()) lgpdShowBanner();
      }
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    [lgpdPrefsModal, lgpdPolicyModal].forEach((modal) => {
      if (modal && modal.dataset.open === 'true') {
        lgpdCloseModal(modal);
        if (modal === lgpdPrefsModal && !lgpdRead()) lgpdShowBanner();
      }
    });
  });

  // Revogar / rever consentimento pelo rodapé (LGPD art. 18, IX): reabre o painel.
  const lgpdManageBtn = document.getElementById('lgpd-manage');
  if (lgpdManageBtn) lgpdManageBtn.addEventListener('click', lgpdOpenPreferences);

  // Estado inicial: sem prova válida de consentimento → exibe banner.
  const savedConsent = lgpdRead();
  if (savedConsent) {
    lgpdApplyConsent(savedConsent);
    lgpdHideBanner();
    lgpdSyncToggles(savedConsent);
  } else {
    lgpdApplyConsent(null);
    lgpdSyncToggles(null);
    lgpdShowBanner();
  }

  // Landing na capa (ref.png Tela 1): logo ampliado + chamada + Começar
  showView('splash');
});
