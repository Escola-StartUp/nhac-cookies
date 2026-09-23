const fs = require('fs');
const path = require('path');

// 1. Update index.html
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const regexSplash = /<section class="view-panel view-splash active" id="view-splash"[\s\S]*?<\/section>/;

const newSplashHtml = `<section class="view-panel view-splash active" id="view-splash" aria-label="Boas-vindas nhac! COOKIES">

      <!-- 1. Formas de fundo desktop e mobile -->
      <img src="public/fundo_desktop.png" alt="" aria-hidden="true" class="abertura-onda-img abertura-desktop-only">
      <img src="elementos_abertura/fundo_mobile.jpg" alt="" aria-hidden="true" class="abertura-onda-img abertura-mobile-only">

      <!-- 2. Conteúdo centralizado e alinhado (Logo, Chamada e Botão) -->
      <div class="abertura-center-content">
        
        <!-- Logo oficial -->
        <div class="abertura-logo-box">
          <img src="public/logo.png" alt="nhac! COOKIES" class="abertura-logo-img">
        </div>

        <!-- Frase de impacto / Chamada -->
        <div class="abertura-texto-box">
          <p class="abertura-slogan">
            Cookies artesanais<br>
            que deixam o dia<br>
            mais gostoso!
          </p>
        </div>

        <!-- Botão "Começar →" e crédito -->
        <div class="abertura-action-box">
          <button class="btn-abertura-comecar" data-view="home" id="btn-splash-start">
            <span>Começar</span>
            <span class="btn-arrow">→</span>
          </button>
          <p class="abertura-origem">Feito à mão em Porto Alegre ★</p>
        </div>

      </div>

    </section>`;

if (regexSplash.test(html)) {
  html = html.replace(regexSplash, newSplashHtml);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('index.html updated successfully');
} else {
  console.log('index.html regex did not match');
}

// 2. Update css/style.css
const cssPath = path.join(__dirname, 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

const regexAberturaCss = /\/\* --- 7\. VISTA 1: SPLASH \(Tela de Abertura\)[\s\S]*?(?=\/\* --- 8\. VISTA 2: TELA INÍCIO)/;

const newAberturaCss = `/* --- 7. VISTA 1: SPLASH (Tela de Abertura) — Centralizado e Responsivo --- */
.view-splash {
  background: #6327B8;
  position: relative;
  overflow: hidden;
  display: none;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
}

.view-splash.active {
  display: flex;
}

/* Oculta header e barra inferior mobile na tela de abertura */
body[data-active-view="splash"] .main-header,
body[data-active-view="splash"] .mobile-bottom-bar {
  display: none !important;
}

body[data-active-view="splash"] .view-splash {
  min-height: 100vh;
  padding-bottom: 0;
}

body[data-active-view="splash"] .app-viewport {
  padding-bottom: 0;
}

/* 1. Imagens de fundo: desktop e mobile */
.abertura-onda-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
  z-index: 1;
}

.abertura-desktop-only {
  display: block;
}

.abertura-mobile-only {
  display: none;
}

/* 2. Conteúdo centralizado em fluxo vertical perfeito */
.abertura-center-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 520px;
  margin: auto;
  gap: 20px;
}

/* 3. Logo oficial — centralizado */
.abertura-logo-box {
  width: 100%;
  max-width: min(340px, 28vw, 36vh);
  display: flex;
  justify-content: center;
  align-items: center;
}

.abertura-logo-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 14px 28px rgba(40, 10, 80, 0.45));
  animation: aberturaLogoPulse 4s ease-in-out infinite alternate;
}

@keyframes aberturaLogoPulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.03);
  }
}

/* 4. Chamada / Slogan — perfeitamente no centro */
.abertura-texto-box {
  width: 100%;
  max-width: 440px;
  text-align: center;
}

.abertura-slogan {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.1vw, 2.1rem);
  font-weight: 800;
  color: #FFD737;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin: 0;
  text-shadow: 0 4px 14px rgba(25, 5, 55, 0.8), 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* 5. Ação: Botão Começar — centralizado */
.abertura-action-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}

.btn-abertura-comecar {
  background: #FFD737;
  color: #4C1C00;
  border: none;
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 1.6vw, 1.55rem);
  font-weight: 800;
  padding: 0.68em 2.4em;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), 0 0 26px rgba(255, 215, 55, 0.45);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.btn-abertura-comecar:hover {
  transform: translateY(-3px) scale(1.04);
  background-color: #FFE266;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.4), 0 0 38px rgba(255, 215, 55, 0.65);
}

.btn-abertura-comecar .btn-arrow {
  font-size: 1.3em;
  line-height: 1;
  transition: transform 0.2s ease;
}

.btn-abertura-comecar:hover .btn-arrow {
  transform: translateX(4px);
}

.abertura-origem {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(0.78rem, 1vw, 1.05rem);
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

/* Responsividade para telas menores e dispositivos móveis (fundo_mobile.jpg) */
@media (max-width: 768px) {
  .view-splash {
    padding: 24px 16px;
  }

  .abertura-desktop-only {
    display: none !important;
  }

  .abertura-mobile-only {
    display: block !important;
  }

  .abertura-center-content {
    max-width: 330px;
    gap: 16px;
  }

  .abertura-logo-box {
    max-width: min(250px, 68vw, 30vh);
  }

  .abertura-slogan {
    font-size: clamp(1.2rem, 5.2vw, 1.55rem);
    line-height: 1.22;
  }

  .btn-abertura-comecar {
    font-size: 1.15rem;
    padding: 0.72em 2.2em;
    width: auto;
  }

  .abertura-origem {
    font-size: 0.82rem;
  }
}

`;

if (regexAberturaCss.test(css)) {
  css = css.replace(regexAberturaCss, newAberturaCss);
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('style.css updated successfully');
} else {
  console.log('style.css regex did not match');
}
