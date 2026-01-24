// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="app-footer">
      <span>© {new Date().getFullYear()} Spendly</span>

      <div className="footer-links">
        <a
          href="https://github.com/your-username/spendly"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a href="#">About</a>
        <a href="#">Privacy</a>
      </div>
    </footer>
  )
}
