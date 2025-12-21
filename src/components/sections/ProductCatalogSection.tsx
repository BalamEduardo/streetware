"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, ProductCategory } from '@/types';

interface ProductCatalogSectionProps {
  showAllProducts?: boolean;
  showTitle?: boolean;
}

// Componente para filtros de productos
interface ProductFiltersProps {
  activeFilter: ProductCategory | 'todos';
  onFilterChange: (filter: ProductCategory | 'todos') => void;
}

function ProductFilters({ activeFilter, onFilterChange }: ProductFiltersProps) {
  const filters: Array<{ key: ProductCategory | 'todos'; label: string }> = [
    { key: 'todos', label: 'Todos' },
    { key: 'camisetas', label: 'Camisetas' },
    { key: 'hoodies', label: 'Hoodies' },
    { key: 'accesorios', label: 'Accesorios' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-6 py-2 rounded-full font-body transition ${
            activeFilter === filter.key
              ? 'bg-brand-accent text-white'
              : 'border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

// Componente para una tarjeta individual de producto
interface ProductCardProps {
  product: Product;
  showAllProducts?: boolean;
}

function ProductCard({ product, showAllProducts = false }: ProductCardProps) {
  const href = showAllProducts 
    ? `/producto/${product.slug}?from=catalogo`
    : `/producto/${product.slug}`;
    
  return (
    <Link href={href} className="block">
      <div className="bg-white/10 rounded-md overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300">
        <div className="h-80 bg-gray-400 flex items-center justify-center group-hover:bg-gray-300 transition">
          <span className="text-gray-600 font-body">Product Image</span>
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg mb-1 text-white">{product.name}</h3>
          <p className="font-body text-sm text-white/70 line-clamp-1 mb-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="font-body text-brand-yellow font-bold">${product.price}.00</span>
            <span className="font-body text-xs text-white/60">
              {product.isLimited ? 'Stock limitado' : `${product.stock} disponibles`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProductCatalogSection({ 
  showAllProducts = false, 
  showTitle = true
}: ProductCatalogSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ProductCategory | 'todos'>('todos');

  // Datos mock estáticos - en el futuro vendrán de una API o base de datos
  const products: Product[] = [
    {
      id: 'ur-hoodie-01',
      name: 'Urban Rebellion Hoodie',
      description: 'Hoodie premium con diseño gráfico exclusivo.',
      price: 1299,
      category: 'hoodies',
      stock: 25,
      isLimited: false,
      slug: 'urban-rebellion-hoodie',
      
    },
    {
      id: 'ur-tshirt-01',
      name: 'Urban Rebellion Tee',
      description: 'Camiseta de edición limitada con estampado artístico.',
      price: 899,
      category: 'camisetas',
      stock: 45,
      isLimited: false,
      slug: 'urban-rebellion-tee'
    },
    {
      id: 'ur-jacket-01',
      name: 'Urban Rebellion Jacket',
      description: 'Chaqueta de mezclilla customizada con parches exclusivos.',
      price: 1899,
      category: 'hoodies',
      stock: 15,
      isLimited: true,
      slug: 'urban-rebellion-jacket'
    },
    {
      id: 'product-4',
      name: 'Street Cap',
      description: 'Gorra snapback con bordado exclusivo.',
      price: 599,
      category: 'accesorios',
      stock: 32,
      isLimited: false,
      slug: 'street-cap'
    },
    {
      id: 'product-5',
      name: 'Rebel Sneakers',
      description: 'Sneakers de edición limitada colaboración exclusiva.',
      price: 2299,
      category: 'accesorios',
      stock: 12,
      isLimited: true,
      slug: 'rebel-sneakers'
    },
    {
      id: 'product-6',
      name: 'Basic Tee',
      description: 'Camiseta básica de algodón orgánico.',
      price: 699,
      category: 'camisetas',
      stock: 45,
      isLimited: false,
      slug: 'basic-tee'
    },
    {
      id: 'product-7',
      name: 'Cargo Pants',
      description: 'Pantalones cargo con múltiples bolsillos.',
      price: 1399,
      category: 'camisetas',
      stock: 18,
      isLimited: true,
      slug: 'cargo-pants'
    },
    {
      id: 'product-8',
      name: 'Bomber Jacket',
      description: 'Chaqueta bomber con detalles metálicos.',
      price: 1699,
      category: 'hoodies',
      stock: 28,
      isLimited: false,
      slug: 'bomber-jacket'
    }
  ];

  const filteredProducts = activeFilter === 'todos' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  // En modo preview, solo mostrar los primeros 4 productos destacados
  const displayProducts = showAllProducts ? filteredProducts : filteredProducts.slice(0, 3);

  return (
    <section id="productos" className="py-20 px-4 bg-white/5">
      <div className="max-w-6xl mx-auto">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display text-center mb-4 text-brand-accent tracking-wide">
              {showAllProducts ? 'CATÁLOGO COMPLETO' : 'PRODUCTOS DESTACADOS'}
            </h2>
            
          </div>
        )}
        
        {showAllProducts && (
          <ProductFilters 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} showAllProducts={showAllProducts} />
          ))}
        </div>

        {!showAllProducts && (
          <div className="text-center mt-12">
            <Link 
              href="/catalogo"
              className="
                inline-flex items-center gap-2
                px-8 py-4
                bg-brand-accent
                text-white
                font-bold
                text-lg
                rounded-lg
                hover:bg-brand-accent/90
                transition-all duration-200
                active:scale-95
                shadow-lg hover:shadow-xl
              "
            >
              Ver Catálogo Completo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
