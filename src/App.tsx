import { useEffect, useState, useRef } from 'react';
import CustomCursor from './CustomCursor';
import Background3D from './Background3D';
import Magnetic from './Magnetic';
import SmoothScroll from './SmoothScroll';
import TermsModal from './TermsModal';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import './index.css';

function Clock() {
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

  return <>{timeStr}</>;
}

// Animation Variants
const containerVar: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVar: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
    }
  }
};

const titleVar: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95, filter: 'blur(15px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 20,
    }
  }
};

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('sora_theme') as 'dark' | 'light') || 'dark';
  });
  const [showTOS, setShowTOS] = useState(() => {
    return localStorage.getItem('sora_tos_accepted') !== 'true';
  });
  const [navScrolled, setNavScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);

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

  const acceptTOS = () => {
    localStorage.setItem('sora_tos_accepted', 'true');
    setShowTOS(false);
  };

  const openTOS = () => {
    setShowTOS(true);
  };

  return (
    <SmoothScroll>
      <TermsModal isOpen={showTOS} onAccept={acceptTOS} />
      <CustomCursor />
      <Background3D theme={theme} />

      <nav className={`nav ${navScrolled ? 'scrolled' : ''} ${navHidden ? 'hidden-nav' : ''}`}>
        <div className="nav-left">
          <a href="#hero" className="nav-logo">SORA</a>
        </div>
        <div className="nav-center">
          <span className="nav-clock"><Clock /></span>
        </div>
        <div className="nav-right">
          <Magnetic>
            <button className="theme-btn" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </Magnetic>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        id="hero" 
        className="section hero-section"
        variants={containerVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
      >
        <div className="hero-content">
          <motion.p variants={itemVar} className="hero-tag">/ PROFILE</motion.p>
          <div className="hero-title-wrap">
            <motion.h1 variants={titleVar} className="hero-title">
              <span className="hero-title-line">A CREATIVE</span>
              <span className="hero-title-line hero-title-right">[ DEVELOPER ]</span>
            </motion.h1>
          </div>
          <motion.div variants={itemVar} className="hero-bottom">
            <div className="hero-bottom-left">
              <p className="hero-desc">
                Web Designer / App Developer / UI Engineer<br/>
                Based in Kumamoto, Japan
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="section"
        variants={containerVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-150px" }}
      >
        <div className="section-inner">
          <div className="section-divider"></div>
          <motion.p variants={itemVar} className="section-tag">/ ABOUT</motion.p>
          <div className="about-layout">
            <motion.div variants={itemVar} className="about-left">
              <p className="about-bio">
                熊本出身のクリエイター。Webデザイン、アプリ開発、UIデザインを手がけています。美しいインターフェースとユーザー体験を追求し、テクノロジーとデザインの融合を目指しています。
              </p>
            </motion.div>
            <motion.div variants={containerVar} className="about-right">
              <motion.div variants={itemVar} className="about-info-item">
                <span className="about-info-label">NAME</span>
                <span className="about-info-value">Sora K</span>
                <span className="blue-dot"></span>
              </motion.div>
              <motion.div variants={itemVar} className="about-info-item">
                <span className="about-info-label">BIRTHDAY</span>
                <span className="about-info-value">2013 / 09 / 03</span>
                <span className="blue-dot"></span>
              </motion.div>
              <motion.div variants={itemVar} className="about-info-item">
                <span className="about-info-label">LOCATION</span>
                <span className="about-info-value">Kumamoto, Japan</span>
                <span className="blue-dot"></span>
              </motion.div>
              <motion.div variants={itemVar} className="about-info-item">
                <span className="about-info-label">ROLE</span>
                <span className="about-info-value">Web Designer / UI Engineer / App Developer</span>
                <span className="blue-dot"></span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        id="skills" 
        className="section"
        variants={containerVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-150px" }}
      >
        <div className="section-inner">
          <div className="section-divider"></div>
          <motion.p variants={itemVar} className="section-tag">/ SKILLS</motion.p>
          <div className="skills-list">
            {[
              { num: '01', name: 'Web Design', tag: 'DESIGN' },
              { num: '02', name: 'App Development', tag: 'DEV' },
              { num: '03', name: 'UI / UX Design', tag: 'DESIGN' },
              { num: '04', name: 'Frontend Engineering', tag: 'DEV' },
              { num: '05', name: 'CLI / AI Development', tag: 'DEV' }
            ].map((skill, index) => (
              <motion.div key={skill.num} variants={itemVar} custom={index} className="skill-row">
                <span className="skill-num">{skill.num}</span>
                <span className="skill-name">{skill.name}</span>
                <span className="skill-tag">{skill.tag}</span>
                <span className="blue-dot"></span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Works Section */}
      <motion.section 
        id="works" 
        className="section"
        variants={containerVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-150px" }}
      >
        <div className="section-inner">
          <div className="section-divider"></div>
          <motion.p variants={itemVar} className="section-tag">/ WORKS</motion.p>
          <div className="works-grid">
            <motion.div variants={itemVar} className="work-card">
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
              <Magnetic>
                <a href="https://drive.google.com/file/d/1ILkZZei-cIMxye7zFuIJGcTUyvZtfmgu/view" target="_blank" rel="noopener noreferrer" className="work-download-btn">
                  DOWNLOAD →
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Games Section */}
      <motion.section 
        id="games" 
        className="section"
        variants={containerVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-150px" }}
      >
        <div className="section-inner">
          <div className="section-divider"></div>
          <motion.p variants={itemVar} className="section-tag">/ GAMES</motion.p>
          <motion.p variants={itemVar} style={{ color: 'var(--gray)', marginBottom: '32px', fontSize: '0.9rem' }}>クリックでIDをコピーできます</motion.p>
          <div className="games-grid">
            {[
              { icon: '⚔️', name: '原神', sub: 'UID: 1817956924', copy: '1817956924' },
              { icon: '🎮', name: 'Xbox', sub: 'BraveWings#9521', copy: 'BraveWings#9521' },
              { icon: '⛏️', name: 'Minecraft', sub: 'マイクラ', copy: '' },
              { icon: '🎯', name: 'APEX', sub: 'Apex Legends', copy: '' },
              { icon: '🔫', name: 'VALORANT', sub: 'Tactical Shooter', copy: '' },
              { icon: '🚗', name: 'GTA', sub: 'Grand Theft Auto', copy: '' }
            ].map((game, i) => (
              <motion.div variants={itemVar} key={i} className="game-item clickable" onClick={game.copy ? (e: any) => handleCopy(game.copy, e) : undefined}>
                <span className="game-icon" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{game.icon}</span>
                <h3 className="game-name">{game.name}</h3>
                <p className="game-sub">{game.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Links Section */}
      <motion.section 
        id="links" 
        className="section"
        variants={containerVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-150px" }}
      >
        <div className="section-inner">
          <div className="section-divider"></div>
          <motion.p variants={itemVar} className="section-tag">/ LINKS</motion.p>
          <motion.p variants={itemVar} style={{ color: 'var(--gray)', marginBottom: '32px', fontSize: '0.9rem' }}>DMはTikTokにお願いします 🙏</motion.p>
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
              <motion.a variants={itemVar} key={link.num} href={link.url} target="_blank" rel="noopener noreferrer" className="link-row">
                <span className="link-num">{link.num}</span>
                <span className="link-name">{link.name}</span>
                <span className="link-handle">{link.handle}</span>
                <span className="link-arrow">→</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="section-divider"></div>
        <div className="footer-top">
          <span>&copy; SORA 2026. All Rights Reserved.</span>
          <span className="nav-clock"><Clock /></span>
          <span style={{ display: 'flex', gap: '24px' }}>
            <button onClick={openTOS} style={{ color: 'var(--gray)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '2px' }} className="magnetic">TERMS</button>
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
    </SmoothScroll>
  );
}

export default App;
