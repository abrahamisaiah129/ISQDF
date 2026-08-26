import Navbar from '../components/Navbar';
import Footer from '../components/Footer';  
import TopBar from '../components/Topbar';
import BackToTop from '../ui/BackToTop';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar/>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
