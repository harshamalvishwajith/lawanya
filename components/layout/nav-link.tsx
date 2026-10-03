"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps extends Omit<React.ComponentProps<typeof Link>, "href"> {
  /** Section id on the home page, or "top". */
  hash: string;
  /** Wait before scrolling, e.g. while a menu overlay closes. */
  scrollDelay?: number;
}

/**
 * Links to a home-page section. On the home page it glides there with Lenis;
 * elsewhere it navigates to "/#section" normally.
 */
export function NavLink({ hash, scrollDelay = 0, onClick, children, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const lenis = useLenis();
  const href = hash === "top" ? "/" : `/#${hash}`;

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (pathname !== "/" || event.defaultPrevented || event.metaKey || event.ctrlKey) return;
    event.preventDefault();

    const scroll = () => {
      const target = hash === "top" ? 0 : document.getElementById(hash);
      if (target === null) return;
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.6 });
      } else if (typeof target === "number") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
      window.history.replaceState(null, "", hash === "top" ? "/" : `#${hash}`);
    };

    if (scrollDelay > 0) window.setTimeout(scroll, scrollDelay);
    else scroll();
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
