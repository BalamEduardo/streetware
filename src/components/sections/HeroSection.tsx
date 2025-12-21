"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { smoothScrollTo } from '@/utils/scroll';
import { BlockList } from 'net';

export default function HeroSection() {
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const hasStartedRef = useRef(false); // Flag para saber si ya empezó por primera vez
  const [videoReady, setVideoReady] = useState(false); // Estado para mostrar el video solo cuando esté listo

  useEffect(() => {
    const video = mobileVideoRef.current;
    if (video) {
      // Agregar atributos específicos para iOS/Safari
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      
      const handleLoadedMetadata = () => {
        // Solo establecer 4 segundos en la primera carga
        if (!hasStartedRef.current) {
          console.log('Video metadata loaded, setting currentTime to 4 (first load)');
          video.currentTime = 1;
          hasStartedRef.current = true;
        }
      };

      const handleSeeked = () => {
        // Confirmar que el video se posicionó correctamente
        console.log('Video seeked to:', video.currentTime);
        // Solo mostrar el video cuando esté en el segundo 4 o muy cerca
        if (video.currentTime >= 0.9 && !videoReady) {
          setVideoReady(true);
        }
      };

      const handleCanPlay = () => {
        // Para Safari, asegurar que esté en el segundo correcto antes de reproducir
        if (video.currentTime < 0.9 && !hasStartedRef.current) {
          console.log('Safari fix: Setting currentTime to 1 before play');
          video.currentTime = 1;
          hasStartedRef.current = true;
        }
        
        // Intentar reproducir siempre, especialmente para Safari
        console.log('Starting video playback from second:', video.currentTime);
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Video started successfully');
            })
            .catch(error => {
              console.log('Error al reproducir el video:', error);
              // Fallback: intentar reproducir después de una interacción del usuario
              const startOnTouch = () => {
                video.play().then(() => {
                  console.log('Video started after user interaction');
                  document.removeEventListener('touchstart', startOnTouch);
                  document.removeEventListener('click', startOnTouch);
                });
              };
              document.addEventListener('touchstart', startOnTouch);
              document.addEventListener('click', startOnTouch);
            });
        }
      };

      const handleTimeUpdate = () => {
        // No hacer nada aquí para evitar bucles, usar evento 'ended' en su lugar
      };

      const handleEnded = () => {
        console.log('Video ended, restarting from 0');
        video.currentTime = 0;
        video.play();
      };

      // Escuchar eventos en el orden correcto
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('seeked', handleSeeked);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);
      
      // Si el video ya está cargado cuando se monta el componente
      if (video.readyState >= 1) {
        handleLoadedMetadata();
      }
      
      // Cleanup
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('seeked', handleSeeked);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [videoReady]);

  return (
    <section 
      id="inicio" 
      className="min-h-screen relative flex flex-col items-center justify-center text-center px-4 sm:px-6 bg-brand overflow-hidden"
    >
      {/* Imagen de fallback visible hasta que el video esté listo */}
      <div className={`
        md:hidden absolute inset-0 z-[-1]
        transition-opacity duration-600 ease-in-out
        ${videoReady ? 'opacity-0' : 'opacity-100'}
      `}>
        <Image
          src="/images/hero/BackGround.webp?v=2"
          alt="Imagen de fondo del hero para dispositivos móviles"
          fill
          className="object-cover object-center"
          priority={true}
          quality={85}
        />
      </div>

      {/* Video de fondo para Mobile */}
      <video
        ref={mobileVideoRef}
        className={`
          md:hidden
          absolute inset-0 w-full h-full object-cover z-0
          transition-opacity duration-300 ease-in-out
          ${videoReady ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          /* Ocultar controles nativos y botón de play */
          WebkitAppearance: 'none',
          /* Ocultar overlay de play en webkit/safari */
          WebkitMediaControls: 'none',
          WebkitMediaControlsPanel: 'none',
          WebkitMediaControlsPlayButton: 'none',
          WebkitMediaControlsStartPlaybackButton: 'none',
          /* Para otros navegadores */
          pointerEvents: 'none'
        } as React.CSSProperties}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero/BackGround.webp?v=2"
        webkit-playsinline="true"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        x-webkit-airplay="deny"
      >
        <source src="/videos/hero/Prueba4.mp4" type="video/mp4" />
        {/* Fallback para navegadores que no soporten video */}
        Tu navegador no soporta el elemento video.
      </video>

      {/* Overlay invisible para capturar toques en el video */}
      <div 
        className="md:hidden absolute inset-0 z-[1] pointer-events-auto"
        style={{ background: 'transparent' }}
        onClick={() => {
          const video = mobileVideoRef.current;
          if (video && video.paused) {
            video.play().catch(console.log);
          }
        }}
        onTouchStart={() => {
          const video = mobileVideoRef.current;
          if (video && video.paused) {
            video.play().catch(console.log);
          }
        }}
      />

      {/* Video de fondo para Desktop */}
      <video
        className="
          hidden md:block
          absolute inset-0 w-full h-full object-cover z-0
        "
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/hero/Video_Hero.mp4" type="video/mp4" />
        {/* Fallback para navegadores que no soporten video */}
        Tu navegador no soporta el elemento video.
      </video>

      {/* Overlay Mobile - Para video e imagen de fallback */}
      <div className="
        absolute inset-0 z-10
        bg-black/40
        md:hidden
      " />

      {/* Overlay Desktop - Solo para video */}
      <div className="
        hidden md:block
        absolute inset-0 z-10
        bg-black/40
      " />

      {/* Blur Layer - Aplicado sobre los overlays */}
      <div className="
        absolute inset-0 z-20
        backdrop-saturate-[150%]
        backdrop-blur-[5px]
      " />

      {/* Contenido Principal */}
      <div className="relative z-30 w-full max-w-4xl mx-auto">
      
      {/* Título Principal - Mobile First + Landscape Responsive */}
      <h1
        className="
          text-5xl sm:text-7xl md:text-7xl lg:text-7xl xl:text-8xl
          font-display bebasneue-font
          mb-4 sm:mb-6 md:mb-8
          text-white md:text-brand-accent
          tracking-wider
          drop-shadow-lg md:drop-shadow-none
        "
      >
        STREETWARE
        <br />
        DROP SEASON
      </h1>

      {/* Subtítulo - Mobile First + Landscape Responsive */}
      <p 
        className="
          hero-landscape-subtitle
          text-sm leading-relaxed
          sm:text-base sm:leading-relaxed
          md:text-lg md:leading-relaxed
          lg:text-xl lg:leading-relaxed
          xl:text-2xl xl:leading-relaxed
          font-body
          max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl
          mx-auto
          text-white/95
          md:text-white/90
          mb-6 sm:mb-8 md:mb-10
          drop-shadow-md md:drop-shadow-none
        "
      >
        Ropa y arte de edición limitada.<br />
        Cada drop cuenta una historia.<br />
        <span className="text-brand-yellow font-semibold">
          ¡Colecciones exclusivas, nunca re-stock!
        </span>
      </p>

      {/* Botones CTA - Mobile First + Landscape Responsive */}
      <div 
        className="
          hero-landscape-buttons
          flex flex-col gap-3
          sm:gap-4
          md:flex-row md:gap-6
          md:justify-center
          w-full max-w-sm sm:max-w-md md:max-w-none
          mx-auto
        "
      >
      <button
      onClick={() => smoothScrollTo('#productos')}
      className="
        w-full md:w-auto
        px-6 py-3
        sm:px-8 sm:py-4
        md:px-10 md:py-4
        bg-brand-accent
        text-white
        text-sm sm:text-base md:text-lg
        font-bold
        uppercase
        tracking-wide
        rounded-lg
        border-2 border-white
        shadow-lg
        hover:bg-[#ffffff46]
        hover:shadow-xl
        transition-all duration-300
        active:scale-95
      "
      >
      Ver colección
      </button>
      
      <button
      onClick={() => smoothScrollTo('#nosotros')}
      className="
        w-full md:w-auto
        px-6 py-3
        sm:px-8 sm:py-4
        md:px-10 md:py-4
        backdrop-blur-sm
        border-2 border-white
        md:border-brand-accent
        text-white
        md:text-brand-accent
        text-sm sm:text-base md:text-lg
        font-bold
        uppercase
        tracking-wide
        rounded-lg
        shadow-lg
        hover:bg-[#ffffff4b] hover:text-brand
        md:hover:bg-brand-accent md:hover:text-white
        transition-all duration-300
        hover:scale-105
      "
      >
      Saber más
      </button>
      </div>
      </div>
    </section>
  );
}
