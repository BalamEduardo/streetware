# ProductModal - Componente Modal de Productos

El `ProductModal` es un componente reutilizable que muestra productos en un modal elegante con navegación tipo slider. Permite al usuario ver un producto a la vez con toda su información completa.

## Características Principales

✅ **Producto único por vista**: Muestra un producto completo a la vez
✅ **Navegación con slider**: Swiper.js con flechas de navegación y paginación
✅ **Navegación por teclado**: Flechas izquierda/derecha y ESC para cerrar
✅ **Galería de imágenes**: Navegación entre múltiples imágenes del producto
✅ **Responsive**: Funciona perfectamente en desktop y mobile
✅ **Sin scroll interno**: Experiencia limpia sin barras de desplazamiento
✅ **100% reutilizable**: Se puede usar desde cualquier sección

## Props del Componente

```typescript
interface ProductModalProps {
  isOpen: boolean;           // Estado de apertura del modal
  onClose: () => void;       // Función para cerrar el modal
  products: Product[];       // Array de productos a mostrar
  title?: string;           // Título del modal (opcional)
  subtitle?: string;        // Subtítulo del modal (opcional)
}
```

## Interfaz Product

```typescript
interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  category?: string;
  images?: Array<{
    id: string;
    src: string;
    alt: string;
  }>;
  size?: string[];
  isNew?: boolean;
  isAvailable?: boolean;
}
```

## Ejemplo de Uso

### 1. Desde DropsSection (Ver Colección)

```tsx
import { useProductModal } from '../../hooks/useProductModal';
import ProductModal from '../ui/ProductModal';

export default function DropsSection() {
  const { isOpen, products, title, subtitle, openModal, closeModal } = useProductModal();

  const handleViewCollection = () => {
    const collectionProducts = [
      {
        id: "ur1",
        name: "Camiseta Urban Art",
        price: "$899",
        description: "Diseño único inspirado en arte urbano...",
        category: "Camisetas",
        images: [
          {
            id: "ur1-1",
            src: "/images/drops/DropsProducts/UrbanRebelion/UR1.jpg",
            alt: "Camiseta Urban Art - Vista frontal"
          },
          {
            id: "ur1-2", 
            src: "/images/drops/DropsProducts/UrbanRebelion/UR1-back.jpg",
            alt: "Camiseta Urban Art - Vista posterior"
          }
        ],
        size: ["S", "M", "L", "XL"],
        isNew: true,
        isAvailable: true
      }
      // ... más productos
    ];

    openModal(
      collectionProducts,
      "Urban Rebellion",
      "Colección Primavera 2025"
    );
  };

  return (
    <>
      {/* Contenido de la sección */}
      <button onClick={handleViewCollection}>
        Ver Colección
      </button>

      {/* Modal */}
      <ProductModal
        isOpen={isOpen}
        onClose={closeModal}
        products={products}
        title={title}
        subtitle={subtitle}
      />
    </>
  );
}
```

### 2. Desde ProductsSection (Producto Individual)

```tsx
import { useState } from 'react';
import ProductModal from '../ui/ProductModal';

export default function ProductsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      {/* Grid de productos */}
      {products.map(product => (
        <div key={product.id} onClick={() => handleProductClick(product)}>
          {/* Card del producto */}
        </div>
      ))}

      {/* Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={closeModal}
        products={selectedProduct ? [selectedProduct] : []}
        title="Producto Individual"
        subtitle="Detalles del producto"
      />
    </>
  );
}
```

## Controles y Navegación

### Teclado
- **Flecha Izquierda**: Producto anterior
- **Flecha Derecha**: Producto siguiente  
- **ESC**: Cerrar modal

### Mouse/Touch
- **Flechas laterales**: Navegación entre productos
- **Paginación inferior**: Salto directo a producto
- **Swipe (mobile)**: Deslizar para navegar
- **Click fuera del modal**: Cerrar
- **Botón X**: Cerrar modal

### Navegación de Imágenes
- **Flechas pequeñas**: Cambiar imagen del producto actual
- **Puntos indicadores**: Salto directo a imagen
- **Contador**: Muestra imagen actual / total

## Características de Diseño

- **Layout responsivo**: Mobile-first con breakpoints optimizados
- **Imágenes optimizadas**: Next.js Image con lazy loading
- **Animaciones suaves**: Transiciones CSS profesionales  
- **Backdrop blur**: Fondo difuminado para enfocar contenido
- **Estados visuales**: Badges para "NUEVO" y "AGOTADO"
- **Tallas disponibles**: Chips informativos
- **Botones de acción**: "Ver Detalles" y "Favoritos"

## Dependencias

- **Next.js**: Image optimization
- **Swiper.js**: Slider functionality
- **Tailwind CSS**: Styling
- **React**: Hooks y estado

## Optimizaciones Incluidas

✅ **Prevención de hydration issues** con estado `mounted`
✅ **Gestión de scroll del body** para prevenir scroll de fondo
✅ **Keyboard navigation** accesible
✅ **Image optimization** automática
✅ **Memory cleanup** en `useEffect` cleanups
✅ **Focus management** para accesibilidad
✅ **Mobile-friendly** touch interactions

El componente está listo para producción y sigue las mejores prácticas de React y Next.js.
