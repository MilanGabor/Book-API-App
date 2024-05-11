//import styles
import '../styles/PageNotFound.css'
const PageNotFound = () => {
  return (
    <div className="page__not__found">
      <div className="page__not__found-content">
        <h1 className="page__not__found-title">404</h1>
        <p className="page__not__found-message">Oops! Page not found.</p>
        <a href="/" className="page__not__found-home-link">Go Back Home</a>
      </div>
    </div>
  );
};

export default PageNotFound;