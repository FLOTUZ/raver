import { AutorizationGuardComponent } from "@/components/admin";
import { AuthAdminProvider } from "@/providers/auth-admin.provider";

interface PrivateLayoutProps {
  children: React.ReactNode;
}
const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <AuthAdminProvider>
      <AutorizationGuardComponent>{children}</AutorizationGuardComponent>
    </AuthAdminProvider>
  );
};

export default PrivateLayout;
