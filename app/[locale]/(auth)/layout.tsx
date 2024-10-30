interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="container-layout flex gap-5 flex-grow pb-5">
      <div
        className="hidden md:block bg-cover md:w-1/2 lg:w-3/5 rounded-[10px]"
        style={{ backgroundImage: "url(/img/login-bg.jpg)" }}
      ></div>
      <div className="bg-background py-14 px-10 gap-2 xl:px-14 rounded-[10px] flex flex-col flex-grow">
        {children}
      </div>
    </main>
  );
}

export default AuthLayout;
