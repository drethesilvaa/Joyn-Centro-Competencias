export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    </div>
  );
}
