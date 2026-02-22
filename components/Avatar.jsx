export default function Avatar({ className = '', src = '/images/arfarf.png', alt = 'profile' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-36 h-36 md:w-48 md:h-48 rounded-full border-2 border-glow object-cover shadow-xl"
        loading="lazy"
      />
    </div>
  )
}
