import AuthProvider from "./contexts/AuthContext";
import Routes from "./routes";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
