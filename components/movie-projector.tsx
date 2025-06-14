export function MovieProjector({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Основной корпус проектора - делаем ярче */}
      <rect x="25" y="35" width="70" height="30" rx="8" fill="#8b1c24" stroke="#a52a2a" strokeWidth="2" />

      {/* Объектив - делаем ярче */}
      <circle cx="60" cy="50" r="15" fill="#6B6B6B" stroke="#8b1c24" strokeWidth="2" />
      <circle cx="60" cy="50" r="11" fill="#8B8B8B" stroke="#6B6B6B" strokeWidth="1" />
      <circle cx="60" cy="50" r="7" fill="#ABABAB" stroke="#8B8B8B" strokeWidth="1" />
      <circle cx="60" cy="50" r="3" fill="#2A2A2A" />

      {/* Катушки с пленкой - делаем ярче */}
      <circle cx="35" cy="20" r="10" fill="#a52a2a" stroke="#8b1c24" strokeWidth="2" />
      <circle cx="85" cy="20" r="10" fill="#a52a2a" stroke="#8b1c24" strokeWidth="2" />

      {/* Центры катушек */}
      <circle cx="35" cy="20" r="3" fill="#8b1c24" />
      <circle cx="85" cy="20" r="3" fill="#8b1c24" />

      {/* Пленка между катушками - делаем ярче */}
      <path d="M35 30 Q60 25 85 30" stroke="#8b1c24" strokeWidth="4" fill="none" />
      <path d="M35 10 Q60 5 85 10" stroke="#8b1c24" strokeWidth="4" fill="none" />

      {/* Перфорация на пленке */}
      <rect x="45" y="8" width="2" height="1" fill="#5c1115" />
      <rect x="48" y="8" width="2" height="1" fill="#5c1115" />
      <rect x="51" y="8" width="2" height="1" fill="#5c1115" />
      <rect x="67" y="8" width="2" height="1" fill="#5c1115" />
      <rect x="70" y="8" width="2" height="1" fill="#5c1115" />
      <rect x="73" y="8" width="2" height="1" fill="#5c1115" />

      {/* Детали на корпусе - делаем ярче */}
      <rect x="30" y="40" width="10" height="6" rx="3" fill="#a52a2a" />
      <rect x="80" y="40" width="10" height="6" rx="3" fill="#a52a2a" />

      {/* Винтажные ручки - делаем ярче */}
      <circle cx="35" cy="43" r="2" fill="#e8dcc0" />
      <circle cx="85" cy="43" r="2" fill="#e8dcc0" />

      {/* Световой луч - делаем ярче */}
      <path d="M75 50 L100 45 L100 55 Z" fill="#e8dcc0" opacity="0.8" />
      <path d="M100 45 L115 40 L115 60 L100 55 Z" fill="#d4c4a8" opacity="0.7" />

      {/* Подставка - делаем ярче */}
      <rect x="55" y="65" width="10" height="20" fill="#8b1c24" />
      <ellipse cx="60" cy="85" rx="15" ry="5" fill="#a52a2a" />

      {/* Винтажные украшения - делаем ярче */}
      <rect x="40" y="52" width="4" height="2" rx="1" fill="#e8dcc0" />
      <rect x="76" y="52" width="4" height="2" rx="1" fill="#e8dcc0" />

      {/* Логотип или название */}
      <text x="60" y="58" textAnchor="middle" fontSize="4" fill="#e8dcc0" fontFamily="serif">
        CINEMA
      </text>
    </svg>
  )
}
