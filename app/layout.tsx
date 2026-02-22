import "./globals.css";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./context/AuthContext";
import AIAssistant from "./components/AIAssistant";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <AIAssistant />
      </body>
    </html>
  );
}