import logoFooter from "/logo-footer.svg";

const Footer = () => {
  return (
    <footer>
      <div>
        <img src={logoFooter} className="logo-footer" alt="..." />
      </div>
      <div className="legal">©2023 Grupo 1 | CTD</div>
      <div className="col legend">
        Hecha con
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-heart-filled"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"
              strokeWidth="0"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
    </footer >
  );
};

export default Footer;
