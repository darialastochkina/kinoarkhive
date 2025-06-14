export function FilmReel() {
  return (
    <div className="film-strip">
      <div className="film-holes-top">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`hole-top-${i}`} className="film-hole"></div>
        ))}
      </div>
      <div className="film-holes-bottom">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`hole-bottom-${i}`} className="film-hole"></div>
        ))}
      </div>
    </div>
  )
}
