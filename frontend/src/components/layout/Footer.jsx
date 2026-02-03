const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-inner">
      <div>
        <p className="brand">Talent<span className="brand-accent">Forge</span></p>
        <p className="muted">Building meaningful connections between ambitious people and bold companies.</p>
      </div>
      <div className="footer-links">
        <a href="mailto:hello@talentforge.io">Support</a>
        <a href="/jobs">Browse jobs</a>
        <a href="/auth/register">Hire talent</a>
      </div>
    </div>
    <p className="footer-meta">© {new Date().getFullYear()} TalentForge. All rights reserved.</p>
  </footer>
);

export default Footer;
