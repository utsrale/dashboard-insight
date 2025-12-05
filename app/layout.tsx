import type { Metadata } from 'next';
import './globals.css';
import { DashboardProvider } from '@/lib/contexts/DashboardContext';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export const metadata: Metadata = {
    title: 'Dashboard Insight AI - UMKM',
    description: 'Platform SaaS untuk UMKM mencatat transaksi, membuat konten, dan mengembangkan usaha dengan AI',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id" suppressHydrationWarning className="h-full overflow-hidden">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="h-full overflow-hidden">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <DashboardProvider>
                        {children}
                    </DashboardProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
