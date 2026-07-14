export function Footer() {
  return (
    <footer id="contact" className="bg-footer-bg text-footer-text">
      <div className="mx-auto flex max-w-[1920px] flex-col gap-4 px-4 py-8 tablet:flex-row tablet:items-center tablet:justify-between tablet:px-8">
        <p className="font-display text-sm font-semibold tracking-wide">LET&apos;S CONNECT</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-zinc-700">
          <li>
            <a href="mailto:hello@example.com" className="hover:text-brand">
              Email
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" className="hover:text-brand" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <span className="text-zinc-500">Location / time — TBD</span>
          </li>
        </ul>
      </div>
    </footer>
  );
}
