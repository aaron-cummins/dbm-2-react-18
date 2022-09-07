import "../../assets/css/error_page.css";

const ErrorPage = () => {
  return (
    <div className="text-black">
      <h1 className="text-center">UPS! Pagina no encontrada</h1>
      <p className="zoom-area">
        <b>DCC - DBM</b> <br />
      </p>
      <section className="error-container">
        <span>4</span>
        <span>
          <span className="screen-reader-text">0</span>
        </span>
        <span>4</span>
      </section>
    </div>
  );
};

export default ErrorPage;
