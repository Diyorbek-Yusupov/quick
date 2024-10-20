import Footer from "@/components/footer";

interface WithFooterPagesLayout {
  children: React.ReactNode;
}

function WithFooterPagesLayout({ children }: WithFooterPagesLayout) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export default WithFooterPagesLayout;
