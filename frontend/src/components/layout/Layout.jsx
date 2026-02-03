import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Layout = ({ children }) => (
  <div className="app-shell">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
