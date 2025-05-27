import NavHeader from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavHeader />
      {children}
      <Footer />
    </>
  );
}
