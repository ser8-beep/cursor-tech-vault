import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-nav-bg">
      <div className="mx-auto flex h-[84px] max-w-[1920px] items-center justify-between px-4 tablet:h-[117px] tablet:px-8 laptop:h-[110px] desktop:h-[134px] wide:h-[130px]">
        <Link href="/" className="font-display text-sm font-semibold tracking-wide text-zinc-950">
          SHIVANI K.
          <span className="ml-2 font-body text-xs font-normal text-zinc-500">v2026.vault</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="hidden items-center gap-6 font-body text-sm laptop:flex">
            <li>
              <a href="#case-studies" className="text-zinc-700 hover:text-brand">
                Case Studies
              </a>
            </li>
          </ul>
          <button
            type="button"
            className="laptop:hidden rounded px-3 py-2 font-body text-sm text-zinc-700"
            aria-label="Open menu"
          >
            Menu
          </button>
        </nav>
      </div>
    </header>
  );
}
