import { useEffect, useState } from 'react';
import { MapPin, Calendar, Gamepad2, Link as LinkIcon, Download, Smartphone, Layout, Code2, Sparkles, Send } from 'lucide-react';
import './index.css';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.66a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.06z"/>
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LineIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.55 8.888 8.528 9.619.333.072.785.22.9.52.1.28.064.717.031 1.004-.04.349-.256 1.545-.313 1.884-.076.452-.355 1.737 1.52.946 1.874-.791 10.1-5.952 12.181-9.155C23.621 13.568 24 11.982 24 10.304zm-15.602 3.197H6.262c-.328 0-.594-.266-.594-.594V7.275c0-.328.266-.594.594-.594h.023c.328 0 .594.266.594.594v5.038h1.519c.328 0 .594.266.594.594v.024c0 .327-.266.593-.594.593zm2.535-1.188c0 .328-.266.594-.594.594h-.024c-.328 0-.594-.266-.594-.594V7.275c0-.328.266-.594.594-.594h.024c.328 0 .594.266.594.594v5.632zm4.568 0c0 .328-.266.594-.594.594h-.024c-.328 0-.594-.266-.594-.594V9.281l-1.951 3.526c-.035.064-.085.116-.145.152-.061.037-.129.056-.2.056h-.023c-.328 0-.594-.266-.594-.594V7.275c0-.328.266-.594.594-.594h.024c.328 0 .594.266.594.594v4.137l1.95-3.526c.036-.064.086-.116.146-.152.06-.037.129-.056.2-.056h.023c.328 0 .594.266.594.594v5.632zm4.567-3.901H18.55v1.503h1.518c.328 0 .594.266.594.594v.023c0 .328-.266.594-.594.594H18.55v1.782h1.518c.328 0 .594.266.594.594h-.023c-.328 0-.594-.266-.594-.594V7.275c0-.328.266-.594.594-.594h2.135c.328 0 .594.266.594.594v.024c0 .328-.266.593-.594.593z"/>
  </svg>
);

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const roles = [
    { name: "Web Designer", icon: <Layout className="w-4 h-4" /> },
    { name: "App Developer", icon: <Smartphone className="w-4 h-4" /> },
    { name: "UI Designer", icon: <Sparkles className="w-4 h-4" /> },
    { name: "CLI Developer", icon: <Code2 className="w-4 h-4" /> },
    { name: "AI Developer", icon: <Code2 className="w-4 h-4" /> },
  ];

  const games = [
    { name: "原神", id: "UID: 1817956924" },
    { name: "Minecraft", id: "" },
    { name: "APEX", id: "" },
    { name: "VALORANT", id: "" },
    { name: "GTA", id: "" },
    { name: "Xbox", id: "ID: BraveWings#9521" },
  ];

  const links = [
    { name: "Instagram", url: "https://www.instagram.com/sora18161/", icon: <InstagramIcon className="w-5 h-5" /> },
    { name: "TikTok Main", url: "https://www.tiktok.com/@sora.k94", icon: <TikTokIcon className="w-5 h-5" /> },
    { name: "TikTok Sub", url: "https://www.tiktok.com/@sora_code", icon: <TikTokIcon className="w-5 h-5" /> },
    { name: "Threads", url: "https://www.threads.com/@sora18161", icon: <LinkIcon className="w-5 h-5" /> },
    { name: "Discord", url: "https://discord.com/users/1400621675048996985", icon: <DiscordIcon className="w-5 h-5" /> },
    { name: "LINE", url: "https://line.me/ti/p/Vby8L2URqB", icon: <LineIcon className="w-5 h-5" /> },
    { name: "GitHub", url: "https://github.com/sorak0460", icon: <GithubIcon className="w-5 h-5" /> },
  ];

  if (!mounted) return null;

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="animate-fade-in-up" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '-0.05em' }}>
            <span className="text-gradient">Sora</span> K
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Creative Developer & Designer
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.8rem' }}>
            {roles.map((role, i) => (
              <span 
                key={i} 
                className={`glass-panel animate-fade-in-up delay-${Math.min(i + 1, 5) * 100}`}
                style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', borderRadius: '9999px', animationFillMode: 'forwards' }}
              >
                {role.icon} {role.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section animate-fade-in-up delay-300" style={{ animationFillMode: 'forwards' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>About Me</h2>
        <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.8rem', background: 'var(--glass-bg)', borderRadius: '12px' }}><MapPin className="w-5 h-5 text-gradient" /></div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>Kumamoto, Japan</div>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.8rem', background: 'var(--glass-bg)', borderRadius: '12px' }}><Calendar className="w-5 h-5 text-gradient" /></div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Born</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>2013 / 9 / 3</div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Games Section */}
      <section className="section animate-fade-in-up delay-400" style={{ animationFillMode: 'forwards' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Playing</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {games.map((game, i) => (
            <div key={i} className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem' }}>
              <div style={{ padding: '0.8rem', background: 'var(--glass-bg)', borderRadius: '12px', color: 'var(--accent-1)' }}>
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <div style={{ fontWeight: '600' }}>{game.name}</div>
                {game.id && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{game.id}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* App Download Section */}
      <section className="section animate-fade-in-up delay-500" style={{ animationFillMode: 'forwards', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>My Applications</h2>
        <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 2rem' }}>
          <Sparkles className="w-10 h-10 text-gradient" style={{ margin: '0 auto 1.5rem auto' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI Avatar Chat</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Android端末専用アプリケーション (APK形式)</p>
          <a href="https://drive.google.com/file/d/1ILkZZei-cIMxye7zFuIJGcTUyvZtfmgu/view" target="_blank" rel="noopener noreferrer" className="btn-primary btn-glow">
            <Download className="w-5 h-5" style={{ marginRight: '0.5rem' }} /> Download APK
          </a>
        </div>
      </section>

      {/* Links & Contact Section */}
      <section className="section animate-fade-in-up delay-500" style={{ animationFillMode: 'forwards' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Connect</h2>
        
        <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))', padding: '2rem', borderRadius: '16px', border: '1px solid var(--accent-1)', textAlign: 'center', marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '1rem', borderRadius: '50%' }}>
            <Send className="w-6 h-6" style={{ color: 'var(--accent-1)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Contact Me</h3>
            <p style={{ color: 'var(--text-muted)' }}>ご用件やDMは、TIKTOKまでお願いいたします。</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {links.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', padding: '1.5rem' }}>
              {link.icon}
              <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{link.name}</span>
            </a>
          ))}
        </div>
      </section>
      
      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4rem' }}>
        &copy; {new Date().getFullYear()} Sora K. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
