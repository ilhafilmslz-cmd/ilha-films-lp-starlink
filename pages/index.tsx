import { useEffect, useRef, useState, useCallback } from 'react'
import Script from 'next/script'

// ── Ícone WhatsApp ──────────────────────────────────────────────────────────
const WaIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

// ── Links WhatsApp por película ─────────────────────────────────────────────
const WA_BASE = 'https://wa.me/5598970267386'
const WA_LINKS = {
  geral:     `${WA_BASE}?text=Olá!%20Vim%20pelo%20anúncio%20e%20quero%20saber%20mais%20sobre%20a%20promoção%20de%20película.`,
  blue:      `${WA_BASE}?text=Olá!%20Tenho%20interesse%20na%20película%20Window%20Blue%20por%20R%24999.%20Vi%20a%20promoção%20e%20quero%20agendar!`,
  premium:   `${WA_BASE}?text=Olá!%20Tenho%20interesse%20na%20película%20Window%20Premium%20por%20R%24799.%20Vi%20a%20promoção%20e%20quero%20agendar!`,
  maxvision: `${WA_BASE}?text=Olá!%20Tenho%20interesse%20na%20película%20Max%20Vision%20por%20R%241.799.%20Vi%20a%20promoção%20e%20quero%20agendar!`,
}

const MAPS_LINK = 'https://maps.app.goo.gl/kr1uZzcD78XRbJFf7'
const PIXEL_ID = '1463619988729054'

// ── Helper: dispara Pixel + CAPI simultaneamente ────────────────────────────
function trackContact(contentName = 'Pelicula Automotiva') {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Contact')
  }
  fetch('/api/capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content_name: contentName,
      fbc: getCookie('_fbc'),
      fbp: getCookie('_fbp'),
    }),
  }).catch(() => {})
}

function getCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : ''
}

function openWa(url: string, contentName: string) {
  trackContact(contentName)
  window.open(url, '_blank')
}

// ── Componente principal ────────────────────────────────────────────────────
export default function Home() {
  const [slide, setSlide] = useState(0)
  const total = 4
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = useCallback(() => setSlide(s => (s + 1) % total), [])

  useEffect(() => {
    timer.current = setInterval(next, 5000)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [next])

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt="facebook pixel"
        />
      </noscript>

      {/* ── URGENCY BAR ── */}
      <div className="urgency-bar">
        <span className="urgency-text">
          🔥 <strong>ÚLTIMAS VAGAS COM R$500 OFF PARA ESTA SEMANA EM SÃO LUÍS!</strong>
        </span>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-carousel" aria-hidden="true">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`hero-carousel-slide${slide === i ? ' active' : ''}`} />
          ))}
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="logo">ILHA FILMS · <span className="blue">PELÍCULAS ORIGINAIS</span></div>

          <div className="badge">Promoção Março & Abril</div>

          <h1>
            <span className="white">INSTALE PELÍCULA PREMIUM </span>
            <span className="blue">E CONCORRA A UMA STARLINK MINI.</span>
          </h1>

          <p className="hero-sub">
            Reduza em até 80% o calor interno com nossas películas{' '}
            <strong>Window Premium, Blue e Max Vision</strong> e ainda concorra a uma{' '}
            <strong>Starlink Mini</strong> exclusiva.
          </p>

          {/* Urgência acima do CTA */}
          <p className="cta-urgency">🔥 Oferta limitada ao Mês do Consumidor</p>

          <button
            className="cta-main"
            onClick={() => openWa(WA_LINKS.geral, 'CTA Hero')}
          >
            <WaIcon />
            RESGATAR R$500,00 OFF
          </button>

          <p className="hero-note">Consulte as regras da campanha.</p>
        </div>
      </section>

      {/* ── OFERTAS ── */}
      <section className="section">
        <p className="section-label">Serviços elegíveis</p>
        <h2 className="section-title">Escolha sua película</h2>
        <div className="divider" />

        <div className="offers-grid">

          <div className="offer-card" onClick={() => openWa(WA_LINKS.blue, 'Window Blue')}>
            <div className="offer-name">Window Blue</div>
            <div className="offer-price-old">de R$ 1.490</div>
            <div className="offer-price-new"><span>R$</span>999</div>
            <div className="offer-savings">Economia de R$500,00</div>
            <ul className="offer-features">
              <li>Proteção solar avançada</li>
              <li>Tonalidade azulada premium</li>
              <li>Redução de calor</li>
              <li>Concorre ao sorteio</li>
            </ul>
            <button className="offer-cta-btn">Quero essa → WhatsApp</button>
          </div>

          <div className="offer-card featured" onClick={() => openWa(WA_LINKS.premium, 'Window Premium')}>
            <div className="offer-name">Window Premium</div>
            <div className="offer-price-old">de R$ 1.290</div>
            <div className="offer-price-new"><span>R$</span>799</div>
            <div className="offer-savings">Economia de R$500,00</div>
            <ul className="offer-features">
              <li>Alta performance térmica</li>
              <li>Proteção UV completa</li>
              <li>Maior privacidade</li>
              <li>Concorre ao sorteio</li>
            </ul>
            <button className="offer-cta-btn">Quero essa → WhatsApp</button>
          </div>

          <div className="offer-card" onClick={() => openWa(WA_LINKS.maxvision, 'Max Vision')}>
            <div className="offer-name">Max Vision</div>
            <div className="offer-price-old">de R$ 2.000</div>
            <div className="offer-price-new"><span>R$</span>1.799</div>
            <div className="offer-savings">Economia de R$201</div>
            <ul className="offer-features">
              <li>Tecnologia máxima</li>
              <li>Visibilidade perfeita</li>
              <li>Proteção total UV/IR</li>
              <li>Concorre ao sorteio</li>
            </ul>
            <button className="offer-cta-btn">Quero essa → WhatsApp</button>
          </div>

        </div>
      </section>

      {/* ── STARLINK ── */}
      <div className="starlink-section">
        <div className="starlink-inner">
          <span className="starlink-icon">🛰️</span>
          <h2 className="starlink-title">
            Concorra a uma<br />
            <span className="highlight">Starlink Mini</span>
          </h2>
          <p className="starlink-desc">
            Quem aplicar qualquer uma das películas elegíveis em março ou abril
            entra automaticamente no sorteio. Simples assim.
          </p>
          <div className="starlink-steps">
            <div className="step"><div className="step-num">1</div>Aplique a película</div>
            <div className="step-arrow">→</div>
            <div className="step"><div className="step-num">2</div>Entra no sorteio</div>
            <div className="step-arrow">→</div>
            <div className="step"><div className="step-num">3</div>Sorteio em maio</div>
          </div>
        </div>
      </div>

      {/* ── BENEFÍCIOS ── */}
      <section className="section">
        <p className="section-label">Por que Ilha Films</p>
        <h2 className="section-title">Película de verdade</h2>
        <div className="divider" />
        <div className="benefits-grid">
          <div className="benefit-card">
            <span className="benefit-icon">🌡️</span>
            <div className="benefit-title">Menos calor</div>
            <p className="benefit-desc">Reduz até 60% do calor no interior do carro. Essencial em São Luís.</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">🕶️</span>
            <div className="benefit-title">Mais privacidade</div>
            <p className="benefit-desc">Vidros escurecidos com qualidade e dentro da legislação.</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">☀️</span>
            <div className="benefit-title">Proteção UV</div>
            <p className="benefit-desc">Bloqueia raios UV que danificam o interior e a pele.</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">✅</span>
            <div className="benefit-title">Aplicação profissional</div>
            <p className="benefit-desc">Equipe especializada, sem bolhas, sem imperfeições.</p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <div className="final-cta">
        <h2>Pronto pra proteger<br />seu carro?</h2>
        <p>Agende agora pelo WhatsApp. Atendimento rápido, sem enrolação.</p>
        <div className="cta-group">
          <p className="cta-urgency">🔥 Oferta limitada ao Mês do Consumidor</p>
          <button
            className="cta-main"
            onClick={() => openWa(WA_LINKS.geral, 'CTA Final')}
          >
            <WaIcon />
            RESGATAR R$500,00 OFF
          </button>
          <p className="cta-secondary">Só em março e abril · São Luís - MA</p>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <strong>ILHA FILMS</strong> · Películas Automotivas · São Luís - MA<br />
        <a 
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-map-link"
        >
          📍 Av. Jerônimo de Albuquerque, 93 - Cohafuma, São Luís - MA, 65070-650
        </a>
        <br />
        Sorteio realizado em maio. Prêmio: Mini Starlink. Não inclui instalação. Não conversível em dinheiro.<br />
        © 2026 Ilha Films. Todos os direitos reservados.
      </footer>
    </>
  )
}