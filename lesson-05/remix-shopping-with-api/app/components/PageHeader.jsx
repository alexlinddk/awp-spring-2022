export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && (
          <h2 className="font-semibold text-gray-400">{subtitle}</h2>
        )}
      </div>
      {children}
    </div>
  );
}
