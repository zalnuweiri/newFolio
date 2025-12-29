interface StatsBarProps {
  theme: 'dark' | 'light';
}

export function StatsBar({ theme }: StatsBarProps) {
  const stats = [
    { value: '25', label: 'Age' },
    { value: '5', label: 'Years of experience' },
    { value: '26', label: 'Projects worked on' },
    { value: '6', label: 'Industries served' },
  ];

  return (
    <div className="w-full flex justify-center items-center py-8">
      <div className="flex items-center gap-12 md:gap-16">
        {stats.map((stat, index) => (
          <>
            <div key={index} className="flex flex-col items-center gap-2">
              <div 
                className={`text-5xl md:text-6xl lg:text-7xl ${theme === 'dark' ? 'text-white/90' : 'text-black/90'}`}
                style={{ fontFamily: "'Righteous', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className={`text-[10px] md:text-xs uppercase tracking-widest text-center ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                {stat.label}
              </div>
            </div>
            {index < stats.length - 1 && (
              <div className={`w-px h-16 md:h-20 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />
            )}
          </>
        ))}
      </div>
    </div>
  );
}