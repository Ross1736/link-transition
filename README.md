# LinkTransition

React component for links with animated page transitions using the `startViewTransition` API or CSS fallback.

---

## Description

LinkTransition is a React component to create links with animated page transitions. It uses the native `document.startViewTransition` API when available for smooth transitions, falling back to CSS animations on unsupported browsers. Supports three animation types: "fade", "slide", and "zoom".

---

## Install

```bash
npm install link-transition-ross
```

```bash
npm install react-router-dom
```

## Setup

Make sure your app is wrapped in a React Router context for `LinkTransition` to work properly. You can use either:

### Using `BrowserRouter` with `Routes`

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    {/* other routes */}
  </Routes>
</BrowserRouter>;
```

## Usage

```tsx
import { LinkTransition } from "link-transition-ross";

<LinkTransition to="/about" transitionType="slide" className={styles.navLink}>
  Go to About
</LinkTransition>;
```

## Exported Hook

### `useLinkTransition()`

Hook that exposes the `linkTransition` function to perform navigation's with animation.

```tsx
import { useLinkTransition } from "link-transition-ross";

const { linkTransition } = useLinkTransition();

linkTransition("/home", "zoom");
```

## Props

| Prop             | Tipo                          | Descripción EN                                                                                 | Descripción ES                                                                                                   | Opcional | Default  |
| ---------------- | ----------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| `to`             | `string`                      | Navigation target path (URL or route).                                                         | Ruta de navegación destino (URL o ruta).                                                                         | No       | —        |
| `children`       | `ReactNode`                   | Content inside the link (text or React elements).                                              | Contenido dentro del enlace (texto o elementos React).                                                           | No       | —        |
| `transitionType` | `"fade" \| "slide" \| "zoom"` | Type of transition animation. Options: "fade", "slide", "zoom". If not provided, no animation. | Tipo de animación de transición. Opciones: "fade", "slide", "zoom". Por defecto es `"fade"` si no se especifica. | Sí       | `"fade"` |

---

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0).  
You are free to use, modify, and distribute it under the same license, and you must give proper credit.
