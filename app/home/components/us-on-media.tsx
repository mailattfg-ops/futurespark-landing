"use client";

export function UsOnMediaSection() {
  return (
    <section className="w-full bg-white py-10 sm:py-12 lg:py-14 border-y border-gray-100">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <h2 className="text-sm sm:text-base font-bold uppercase tracking-widest text-gray-800 mb-6 sm:mb-8 font-sans">
          US ON MEDIA
        </h2>

        {/* Brand Logos Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-12 select-none opacity-90 hover:opacity-100 transition-opacity">
          {/* Google */}
          <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight font-sans">
            Google
          </span>

          {/* Gumroad */}
          <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight lowercase font-sans">
            gumroad
          </span>

          {/* Asana */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
              <div className="flex flex-col gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
              </div>
            </div>
            <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight lowercase font-sans">
              asana
            </span>
          </div>

          {/* Spotify */}
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-white">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight font-sans">
              Spotify
            </span>
          </div>

          {/* Gumroad Duplicate */}
          <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight lowercase font-sans hidden sm:inline">
            gumroad
          </span>

          {/* Asana Duplicate */}
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
              <div className="flex flex-col gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
              </div>
            </div>
            <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight lowercase font-sans">
              asana
            </span>
          </div>

          {/* Spotify Duplicate */}
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-white">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight font-sans">
              Spotify
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
