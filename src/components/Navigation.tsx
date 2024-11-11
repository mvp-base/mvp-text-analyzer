'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface INavigation {
  direction: 'horizontal' | 'vertical';
}

interface INavigationButton {
  to: string;
  text: string;
  icon?: string;
}

function NavEntry(props: INavigationButton) {
  const { text, icon, to } = props;
  const pathname = usePathname();

  const isActive = pathname === to;

  return (
    <Link href={to}>
      <span className={isActive ? 'active': ''}>
        <i className={icon}></i> {text}
      </span>
    </Link>
  );
}

export default function Navigation(props: INavigation) {
  const { direction } = props;

  return (
    <div>
      <img src={direction === 'vertical' ? '/images/text-analyzer.svg' : '/images/logo.svg'} alt="Logo" />
      <div className="horizontal-separator bg-white" />
      <NavEntry to="/dashboard" icon="bi bi-bar-chart" text="DASHBOARD" />
      <NavEntry to="/imports" icon="bi bi-upload" text="IMPORTS" />
    </div>
  );
}
