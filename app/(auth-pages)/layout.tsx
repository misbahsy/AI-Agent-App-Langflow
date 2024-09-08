export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col gap-12 items-center justify-center min-h-screen">
      {children}
    </div>
  );
}
