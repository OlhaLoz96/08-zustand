import css from "./Footer.module.css";

function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Olha Lozynska</p>
          <p>
            Contact us:
            <a href="mailto:OlhaLoz@notehub.app">OlhaLoz@notehub.app</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
