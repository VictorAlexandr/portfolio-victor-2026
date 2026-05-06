export function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t border-[var(--rule)]"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-2">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[13px]">
            <li>
              <a
                href="https://www.linkedin.com/in/victor-alexandre-fernandes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ink)] hover:text-[var(--accent)]"
              >
                linkedin
              </a>
            </li>
            <li>
              <a
                href="https://github.com/VictorAlexandr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ink)] hover:text-[var(--accent)]"
              >
                github
              </a>
            </li>
            <li>
              <a
                href="mailto:victor.fernandes@spark.com.br"
                className="text-[var(--ink)] hover:text-[var(--accent)]"
              >
                email
              </a>
            </li>
          </ul>

          <div className="flex flex-col items-start gap-1 font-mono text-[11px] text-[var(--ink-mute)] md:items-end">
            <span>© {new Date().getFullYear()} victor alexandre · brasil</span>
            <span>next.js 16 · tailwind v4 · zero deps no canvas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
