'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ImageSlider from '../ui/ImageSlider';
import { smoothScrollTo } from '@/utils/scroll';

export default function DropsSection() {

  // Drop actual - solo el más reciente
  const currentDrop = {
    id: 1,
    title: "Urban Rebellion",
    subtitle: "Colección Primavera 2025",
    description: "Grafiti meets streetwear. Diseños únicos inspirados en el arte urbano de la ciudad. Esta colección captura la esencia de la rebeldía creativa y la transforma en piezas que cuentan historias.",
    status: "Disponible",
    price: "Desde $899",
    pieces: 25,
    isNew: true,
    releaseDate: "15 Marzo 2025",
    featured: true,
    images: [
      {
        id: "ur1",
        src: "/images/drops/DropsProducts/UrbanRebelion/UR1.jpg",
        alt: "Urban Rebellion - Camiseta estampada con arte urbano"
      },
      {
        id: "ur2",
        src: "/images/drops/DropsProducts/UrbanRebelion/UR2.jpg",
        alt: "Urban Rebellion - Hoodie con diseño gráfico exclusivo"
      },
      {
        id: "u3",
        src: "/images/drops/DropsProducts/UrbanRebelion/U3.jpg",
        alt: "Urban Rebellion - Conjunto completo streetwear"
      }
    ]
  };

  // Función para navegar a la sección productos con scroll suave
  const handleViewCollection = () => {
    smoothScrollTo('#productos');
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Disponible':
        return 'bg-green-500/90 text-white';
      case 'Próximamente':
        return 'bg-brand-yellow/90 text-brand';
      case 'Agotado':
        return 'bg-red-500/90 text-white';
      default:
        return 'bg-gray-500/90 text-white';
    }
  };

  return (

    <section
      id="drops"
      className="
        py-12 sm:py-16 md:py-16 lg:py-16
        px-4 sm:px-6 lg:px-8
        bg-brand
        relative
      "
    >
      <div
        className="
          absolute inset-0
          -z-10
          w-full h-full
          pointer-events-none
          select-none
          overflow-hidden
        "
        aria-hidden="true"
      >
        <Image
          src="/images/drops/Background-Drops.jpg"
          alt="Fondo decorativo de la sección drops"
          fill
          className="object-cover object-center opacity-30 blur-xs"
          draggable={false}
          priority={false}
          quality={40}
          sizes="100vw"
         
        />
      </div>

      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto">

        {/* Header de la sección */}
        <div className="
          text-center 
          mb-8 sm:mb-12 md:mb-16
        ">
          <h2 className="
            text-2xl leading-tight
            sm:text-3xl sm:leading-tight
            md:text-4xl md:leading-tight
            lg:text-5xl lg:leading-tight
            font-display
            text-brand-accent
            tracking-wider
            mb-3 sm:mb-4 md:mb-6
          ">
            NUEVO DROP
          </h2>

          <p className="
            text-sm leading-relaxed
            sm:text-base sm:leading-relaxed
            md:text-lg md:leading-relaxed
            lg:text-xl lg:leading-relaxed
            font-body
            text-white/90
            max-w-xs sm:max-w-sm md:max-w-2xl
            mx-auto
          ">
            La colección más reciente está aquí.
            <br className="hidden sm:block" />
            <span className="text-brand-yellow font-semibold">
              Edición limitada, actitud ilimitada.
            </span>
          </p>
        </div>

        {/* Featured Drop Card - Diseño profesional */}
        <div className="
          max-w-3xl mx-auto
         sm:mb-6 md:mb-8 
        ">
          <div className="
            group
            backdrop-blur-xs
            border border-white/10
            rounded-2xl
            overflow-hidden
            transition-all duration-500
            hover:scale-105
          ">
            {/* Layout responsive: mobile stack, desktop side-by-side */}
            <div className="
              flex flex-col
              lg:flex-row
            ">
              {/* Slider de Imágenes */}
              <div className="
                relative
                w-full lg:w-3/5
                overflow-hidden
                mb-4 lg:mb-0
              ">
                <ImageSlider
                  images={currentDrop.images}
                  aspectRatio="aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5]"
                  className="w-full h-full"
                />

                {/* Badges superpuestos */}
                <div className="
                  absolute top-4 left-4 sm:top-6 sm:left-6
                  z-30
                  flex flex-row gap-1 sm:gap-2
                ">
                  <span className={`
                    inline-block
                    px-2 py-1 sm:px-4 sm:py-2
                    text-xs sm:text-sm 
                    font-bold
                    rounded-full
                    backdrop-blur-md
                    border border-white/20
                    shadow-lg
                    ${getStatusStyles(currentDrop.status)}
                  `}>
                    {currentDrop.status}
                  </span>

                  {currentDrop.isNew && (
                    <span className="
                      inline-block
                      px-2 py-1 sm:px-4 sm:py-2
                      text-xs sm:text-sm 
                      font-bold
                      bg-[#ff3232]
                      text-brand
                      rounded-full
                      backdrop-blur-md
                      border border-brand-yellow/30
                      shadow-lg
                    ">
                      NUEVO
                    </span>
                  )}
                </div>

                {/* Overlay de información de imagen */}
                <div className="
                  absolute bottom-4 right-4
                  z-30
                  bg-black/60
                  backdrop-blur-md
                  px-3 py-1.5
                  rounded-lg
                  text-white/95
                  text-xs
                  font-body
                  font-medium
                  opacity-0
                  group-hover:opacity-100
                  transition-all duration-300
                  border border-white/20
                  shadow-lg
                ">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {currentDrop.images.length} fotos
                  </div>
                </div>
              </div>

              {/* Contenido del Drop */}
              <div className="                
                w-full lg:h-full lg:w-2/4
                p-3 xs:p-4 sm:p-6 lg:p-8
                flex flex-col justify-center
                bg-neutral-900/30
              ">
                {/* Header del Drop */}
                <div className="mb-2 xs:mb-3 sm:mb-4">
                  <h3 className="
                    text-xl sm:text-2xl lg:text-3xl
                    font-display
                    text-white
                    tracking-wide
                    mb-2 xs:mb-3 sm:mb-4
                    leading-tight
                  ">
                    {currentDrop.title}
                  </h3>

                  <p className="
                    text-sm sm:text-base lg:text-xs
                    uppercase
                    tracking-wider
                    mb-2
                    font-semibold
                  ">
                    {currentDrop.subtitle}
                  </p>

                  <p className="
                    text-xs sm:text-sm
                    text-white/70
                    font-body
                    flex items-center gap-2
                  ">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Lanzamiento: {currentDrop.releaseDate}
                  </p>
                </div>

                {/* Descripción */}
                <p className="
                  text-sm sm:text-base lg:text-base text-justify 
                  font-body
                  text-white/90
                  leading-relaxed
                  tracking-tight
                  mb-2 xs:mb-3 sm:mb-4
                ">
                  {currentDrop.description}
                </p>

                {/* Info del drop */}
                <div className="
                  grid grid-cols-2
                  text-center
                  bg-white/5
                  rounded-xl
                  border border-white/10
                ">
                  <div className=" py-2  lg:py-3 lg:px-2"> 
                    <span className="
                      text-base sm:text-lg lg:text-[1rem]
                      font-bold
                      text-brand-accent
                      block
                      leading-tight
                    ">
                      {currentDrop.price}
                    </span>
                    <span className="
                      text-xs lg:text-xs
                      text-white/70
                      font-body
                      uppercase
                      tracking-wide
                      leading-tight
                    ">
                      Precio inicial
                    </span>
                  </div>

                  <div className="py-2 px-1 lg:py-3 lg:px-2">
                    <span className="
                      text-base sm:text-lg lg:text-[1rem]
                      font-bold
                      text-brand-yellow
                      block
                     
                      leading-tight
                    ">
                      {currentDrop.pieces}
                    </span>
                    <span className="
                      text-xs lg:text-xs
                      text-white/70
                      font-body
                      uppercase
                      tracking-wide
                      leading-tight
                    ">
                      Piezas únicas
                    </span>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="
                  flex flex-col sm:flex-col
                  gap-2 sm:gap-3
                  mt-3 xs:mt-4 sm:mt-8
                ">
                  <button
                    onClick={handleViewCollection}
                    className="
                      flex-1
                      px-4 py-2.5
                      sm:px-6 sm:py-3
                      lg:px-5 lg:py-2.5
                      bg-[#242424a4]
                      backdrop-blur-xs
                      text-white
                      text-xs sm:text-sm lg:text-sm
                      font-bold
                      border-1 border-white/30
                      uppercase
                      tracking-wide
                      rounded-xl
                      text-center
                      hover:bg-[#ffffff3d]
                      hover:text-brand
                      transition-all duration-300
                      active:scale-95
                      shadow-lg
                      hover:shadow-xl
                      cursor-pointer
                    "
                  >
                    Ver Colección
                  </button>

                  <button className="
                    flex-1
                    px-4 py-2.5
                    sm:px-6 sm:py-3
                    lg:px-5 lg:py-2.5
                    border-2 border-white/30
                    text-white
                    text-xs sm:text-sm lg:text-sm
                    font-bold
                    uppercase
                    tracking-wide
                    rounded-xl
                    hover:bg-white/10
                    hover:border-white/50
                    transition-all duration-300
                    active:scale-95
                    backdrop-blur-sm
                  ">
                    Favoritos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA para drops anteriores */}
        <div className="
          text-center
        ">
          <Link
            href="/drops"
            className="
              inline-flex items-center
              mt-6
              px-6 py-3
              sm:px-8 sm:py-4
              md:px-10 md:py-4
              border-2 border-brand-accent
              text-brand-accent
              text-sm sm:text-base md:text-lg
              font-bold
              uppercase
              tracking-wide
              rounded-lg
              hover:bg-brand-accent
              hover:text-white
              transition-all duration-300
              active:scale-95
              group
            "
          >
            <span className="mr-2 ">Drops Anteriores</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
