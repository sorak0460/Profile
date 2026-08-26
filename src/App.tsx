import { useEffect, useState, useRef } from 'react';
import CustomCursor from './CustomCursor';
import Background3D from './Background3D';
import { useMagnetic } from './useMagnetic';
import './index.css';

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useClock() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, '0');
    
    const update = () => {
      const now = new Date();
      const tyo = `/TYO ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const lon = new Date(utc + 3600000 * 1);
      const nyc = new Date(utc + 3600000 * -4);
      const par = new Date(utc + 3600000 * 2);
      
      setTimeStr(`${tyo}  /LON ${pad(lon.getHours())}:${pad(lon.getMinutes())}  /NYC ${pad(nyc.getHours())}:${pad(nyc.getMinutes())}  /PAR ${pad(par.getHours())}:${pad(par.getMinutes())}`);
    };
    
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return timeStr;
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('sora_theme') as 'dark' | 'light') || 'dark';
  });
  const [navScrolled, setNavScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);

  const clockStr = useClock();
  useReveal();
  useMagnetic();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sora_theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setNavScrolled(y > 50);
      
      if (y > lastY.current && y > 200) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleCopy = (text: string, e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget.querySelector('.game-sub') as HTMLElement;
    if (el) {
      const original = el.innerText;
      navigator.clipboard.writeText(text).then(() => {
        el.innerText = 'Copied!';
        setTimeout(() => el.innerText = original, 2000);
      });
    }
  };

  return (
    <>
      <CustomCursor />
      <Background3D theme={theme} />

      <nav className={`nav ${navScrolled ? 'scrolled' : ''} ${navHidden ? 'hidden-nav' : ''}`}>
        <div className="nav-left">
          <a href="#hero" className="nav-logo">SORA</a>
        </div>
        <div className="nav-center">
          <span className="nav-clock">{clockStr}</span>
        </div>
        <div className="nav-right">
          <button className="theme-btn magnetic" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="section hero-section">
        <div className="hero-content">
          <p className="hero-tag reveal stagger-1">/ PROFILE</p>
          <div className="hero-title-wrap">
            <h1 className="hero-title reveal stagger-2">
              <span className="hero-title-line">A CREATIVE</span>
              <span className="hero-title-line hero-title-right">[ DEVELOPER ]</span>
            </h1>
          </div>
          <div className="hero-bottom reveal stagger-3">
            <div className="hero-bottom-left">
              <p className="hero-desc">
                Web Designer / App Developer / UI Engineer<br/>
                Based in Kumamoto, Japan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="section-inner">
          <div className="section-divider"></div>
          <p className="section-tag reveal">/ ABOUT</p>
          <div className="about-layout">
            <div className="about-left reveal">
              <p className="about-bio">
                熊本出身のクリエイター。Webデザイン、アプリ開発、UIデザインを手がけています。美しいインターフェースとユーザー体験を追求し、テクノロジーとデザインの融合を目指しています。
              </p>
            </div>
            <div className="about-right reveal">
              <div className="about-info-item">
                <span className="about-info-label">NAME</span>
                <span className="about-info-value">Sora K</span>
                <span className="blue-dot"></span>
              </div>
              <div className="about-info-item">
                <span className="about-info-label">BIRTHDAY</span>
                <span className="about-info-value">2013 / 09 / 03</span>
                <span className="blue-dot"></span>
              </div>
              <div className="about-info-item">
                <span className="about-info-label">LOCATION</span>
                <span className="about-info-value">Kumamoto, Japan</span>
                <span className="blue-dot"></span>
              </div>
              <div className="about-info-item">
                <span className="about-info-label">ROLE</span>
                <span className="about-info-value">Web Designer / UI Engineer / App Developer</span>
                <span className="blue-dot"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="section-inner">
          <div className="section-divider"></div>
          <p className="section-tag reveal">/ SKILLS</p>
          <div className="skills-list">
            {[
              { num: '01', name: 'Web Design', tag: 'DESIGN' },
              { num: '02', name: 'App Development', tag: 'DEV' },
              { num: '03', name: 'UI / UX Design', tag: 'DESIGN' },
              { num: '04', name: 'Frontend Engineering', tag: 'DEV' },
              { num: '05', name: 'CLI / AI Development', tag: 'DEV' }
            ].map(skill => (
              <div key={skill.num} className="skill-row reveal">
                <span className="skill-num">{skill.num}</span>
                <span className="skill-name">{skill.name}</span>
                <span className="skill-tag">{skill.tag}</span>
                <span className="blue-dot"></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="section">
        <div className="section-inner">
          <div className="section-divider"></div>
          <p className="section-tag reveal">/ WORKS</p>
          <div className="works-grid">
            <div className="work-card reveal">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <span className="work-num">01</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '6px 14px', background: 'var(--blue)', color: 'var(--white)', letterSpacing: '2px' }}>APP</span>
              </div>
              <h3 className="work-title">AI Avatar Chat</h3>
              <p className="work-desc">
                AIとアバターを駆使したリアルタイムAIチャットアプリ。Android端末専用アプリケーション（APK形式）として提供しています。
              </p>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '5px 12px', border: '1px solid var(--border)', color: 'var(--gray)', letterSpacing: '1px' }}>AI</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '5px 12px', border: '1px solid var(--border)', color: 'var(--gray)', letterSpacing: '1px' }}>Android</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '5px 12px', border: '1px solid var(--border)', color: 'var(--gray)', letterSpacing: '1px' }}>Avatar</span>
              </div>
              <a href="https://drive.google.com/file/d/1ILkZZei-cIMxye7zFuIJGcTUyvZtfmgu/view" target="_blank" rel="noopener noreferrer" className="work-download-btn magnetic">
                DOWNLOAD →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="section">
        <div className="section-inner">
          <div className="section-divider"></div>
          <p className="section-tag reveal">/ GAMES</p>
          <p className="reveal" style={{ color: 'var(--gray)', marginBottom: '32px', fontSize: '0.9rem' }}>クリックでIDをコピーできます</p>
          <div className="games-grid">
            {[
              { icon: '⚔️', name: '原神', sub: 'UID: 1817956924', copy: '1817956924' },
              { icon: '🎮', name: 'Xbox', sub: 'BraveWings#9521', copy: 'BraveWings#9521' },
              { icon: '⛏️', name: 'Minecraft', sub: 'マイクラ', copy: '' },
              { icon: '🎯', name: 'APEX', sub: 'Apex Legends', copy: '' },
              { icon: '🔫', name: 'VALORANT', sub: 'Tactical Shooter', copy: '' },
              { icon: '🚗', name: 'GTA', sub: 'Grand Theft Auto', copy: '' }
            ].map((game, i) => (
              <div key={i} className="game-item reveal clickable" onClick={game.copy ? (e) => handleCopy(game.copy, e) : undefined}>
                <span className="game-icon" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{game.icon}</span>
                <h3 className="game-name">{game.name}</h3>
                <p className="game-sub">{game.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section id="links" className="section">
        <div className="section-inner">
          <div className="section-divider"></div>
          <p className="section-tag reveal">/ LINKS</p>
          <p className="reveal" style={{ color: 'var(--gray)', marginBottom: '32px', fontSize: '0.9rem' }}>DMはTikTokにお願いします 🙏</p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { num: '01', name: 'Instagram', handle: '@sora18161', url: 'https://www.instagram.com/sora18161/' },
              { num: '02', name: 'TikTok Main', handle: '@sora.k94', url: 'https://www.tiktok.com/@sora.k94' },
              { num: '03', name: 'TikTok Sub', handle: '@sora_code', url: 'https://www.tiktok.com/@sora_code' },
              { num: '04', name: 'Threads', handle: '@sora18161', url: 'https://www.threads.com/@sora18161' },
              { num: '05', name: 'Discord', handle: 'Profile', url: 'https://discord.com/users/1400621675048996985' },
              { num: '06', name: 'LINE', handle: '友だち追加', url: 'https://line.me/ti/p/Vby8L2URqB' },
              { num: '07', name: 'GitHub', handle: '@sorak0460', url: 'https://github.com/sorak0460' }
            ].map(link => (
              <a key={link.num} href={link.url} target="_blank" rel="noopener noreferrer" className="link-row reveal">
                <span className="link-num">{link.num}</span>
                <span className="link-name">{link.name}</span>
                <span className="link-handle">{link.handle}</span>
                <span className="link-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="section-divider"></div>
        <div className="footer-top">
          <span>&copy; SORA 2026</span>
          <span className="nav-clock">{clockStr}</span>
          <span style={{ display: 'flex', gap: '24px' }}>
            <a href="https://www.instagram.com/sora18161/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.tiktok.com/@sora.k94" target="_blank" rel="noopener noreferrer">TikTok</a>
          </span>
        </div>
        <div className="footer-credit">Created by Sora K</div>
        <div className="footer-big-text" aria-hidden="true">
          <div className="footer-marquee">
            <span>SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;</span>
            <span>SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;</span>
          </div>
          <div className="footer-marquee footer-marquee-reverse">
            <span>SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;</span>
            <span>SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;SORA&nbsp;&nbsp;</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
