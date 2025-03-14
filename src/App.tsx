import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Toaster as UIToaster } from '@/components/ui/toaster';
import { Toaster } from 'sonner';
import { Layout } from '@/components/layout';
import { Routes } from '@/components/routes';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light">
        <BackgroundGradient variant="default">
          <Layout>
            <Routes />
          </Layout>
        </BackgroundGradient>
        <UIToaster />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
