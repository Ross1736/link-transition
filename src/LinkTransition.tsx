import {
  useEffect,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface LinkTransitionProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * --- ENGLISH ---
   * Navigation target path.
   * Defines the URL or route the link should navigate to.
   *
   * --- ESPAÑOL ---
   * Ruta de navegación destino.
   * Define la URL o ruta a la que debe dirigirse el enlace.
   */
  readonly to: string;
  /**
   * --- ENGLISH ---
   * Child content to be rendered inside the link.
   * Usually text or React elements.
   *
   * --- ESPAÑOL ---
   * Contenido hijo que se renderizará dentro del enlace.
   * Usualmente texto o elementos React.
   */
  readonly children: ReactNode;
  /**
   * --- ENGLISH ---
   * Type of transition animation when navigating.
   * Available options:
   * - "fade": fade effect transition
   * - "slide": sliding effect transition
   * - "zoom": zoom in/out effect transition
   *
   * Optional. If not specified, no animation will be applied.
   *
   * --- ESPAÑOL ---
   * Tipo de animación de transición al navegar.
   * Opciones disponibles:
   * - "fade": transición con efecto desvanecido
   * - "slide": transición con efecto deslizante
   * - "zoom": transición con efecto de acercamiento
   *
   * Opcional. Si no se especifica, no habrá animación.
   */
  readonly transitionType?: "fade" | "slide" | "zoom";
}

function useLinkTransition() {
  const navigate = useNavigate();

  const linkTransition = (
    to: string,
    transitionType: "fade" | "slide" | "zoom" = "fade"
  ) => {
    const go = () => {
      document.documentElement.className = `transition-${transitionType}`;
      navigate(to);
      setTimeout(() => {
        document.documentElement.className = "";
      }, 500);
    };

    if (document.startViewTransition) {
      document.startViewTransition(go);
    } else {
      go();
    }
  };

  return { linkTransition };
}

function LinkTransition({
  to,
  children,
  className,
  transitionType = "fade",
  ...props
}: LinkTransitionProps) {
  const { linkTransition } = useLinkTransition();

  useEffect(() => {
    const styleId = "link-transition-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        /* Transición Fade */
        .transition-fade::view-transition-old(root),
        .transition-fade::view-transition-new(root) {
          animation-duration: 0.4s;
          animation-timing-function: ease-in-out;
        }
        
        .transition-fade::view-transition-old(root) {
          animation-name: fadeOut;
        }
        
        .transition-fade::view-transition-new(root) {
          animation-name: fadeIn;
        }

        /* Transición Slide */
        .transition-slide::view-transition-old(root) {
          animation: slideOut 0.3s ease-in-out;
        }
        
        .transition-slide::view-transition-new(root) {
          animation: slideIn 0.3s ease-in-out;
        }

        /* Transición Zoom */
        .transition-zoom::view-transition-old(root) {
          animation: zoomOut 0.3s ease-in-out;
        }
        
        .transition-zoom::view-transition-new(root) {
          animation: zoomIn 0.3s ease-in-out;
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideOut {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }

        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        @keyframes zoomOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.8); opacity: 0; }
        }

        @keyframes zoomIn {
          from { transform: scale(1.2); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const handleClickNavigation = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
      return;
    e.preventDefault();
    linkTransition(to, transitionType);
  };

  return (
    <a
      href={to}
      onClick={handleClickNavigation}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

export default LinkTransition;
export { useLinkTransition };
