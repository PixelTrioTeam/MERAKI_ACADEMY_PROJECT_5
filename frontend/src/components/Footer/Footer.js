import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();
  const hiddenFooterRoutes = ["/admin", "/add-product", "/add-category"];

  if (hiddenFooterRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="bg-white py-4">
      <div className="container">
        <div className="row text-center justify-content-around">
          {/* Contact Us and Social Media Section */}
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <h6
                  style={{ color: "black" }}
                  className="text-uppercase font-weight-bold mb-3"
                >
                  Contact Us
                </h6>
                <ul className="list-unstyled">
                  <li className="mb-2 d-flex align-items-center">
                    <a
                      href="mailto:Abdullah.Khalaaf@gmail.com"
                      className="text-muted flex-grow-1"
                    >
                      Abdullah.Khalaaf@gmail.com
                    </a>
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <a
                      href="mailto:Otuffaha@gmail.com"
                      className="text-muted flex-grow-1"
                    >
                      Otuffaha@gmail.com
                    </a>
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <a
                      href="mailto:mustafamsallam04@gmail.com"
                      className="text-muted flex-grow-1"
                    >
                      mustafamsallam04@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <h6
                  style={{ color: "black" }}
                  className="text-uppercase font-weight-bold mb-3"
                >
                  Social Media
                </h6>
                <ul className="list-unstyled">
                  <li className="mb-2 d-flex justify-content-center gap-2">
                    <a
                      href="https://www.facebook.com/osama.tuffaha.3/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                    >
                      <i
                        className="bi bi-facebook fs-4"
                        style={{ color: "blue" }}
                      ></i>
                    </a>
                    <a
                      href="https://www.instagram.com/_osama_99/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                    >
                      <i
                        className="bi bi-instagram fs-4"
                        style={{ color: "maroon" }}
                      ></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/osama-tuffaha-894a8b2b1/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                    >
                      <i
                        className="bi bi-linkedin fs-4"
                        style={{ color: "#0077B5" }}
                      ></i>
                    </a>
                  </li>
                  <li className="mb-2 d-flex justify-content-center gap-2">
                    <a
                      href="https://www.facebook.com/osama.tuffaha.3/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                    >
                      <i
                        className="bi bi-facebook fs-4"
                        style={{ color: "blue" }}
                      ></i>
                    </a>
                    <a
                      href="https://www.instagram.com/_osama_99/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                    >
                      <i
                        className="bi bi-instagram fs-4"
                        style={{ color: "maroon" }}
                      ></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/osama-tuffaha-894a8b2b1/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                    >
                      <i
                        className="bi bi-linkedin fs-4"
                        style={{ color: "#0077B5" }}
                      ></i>
                    </a>
                  </li>
                  <li className="mb-2 d-flex justify-content-center gap-2">
                    <a
                      href="https://www.facebook.com/osama.tuffaha.3/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                    >
                      <i
                        className="bi bi-facebook fs-4"
                        style={{ color: "blue" }}
                      ></i>
                    </a>
                    <a
                      href="https://www.instagram.com/_osama_99/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                    >
                      <i
                        className="bi bi-instagram fs-4"
                        style={{ color: "maroon" }}
                      ></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/osama-tuffaha-894a8b2b1/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                    >
                      <i
                        className="bi bi-linkedin fs-4"
                        style={{ color: "#0077B5" }}
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          
          <div className="col-md-4">
            <h6
              style={{ color: "black" }}
              className="text-uppercase font-weight-bold mb-3"
            >
              Quick Navigate
            </h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/login" className="text-muted">
                  Login
                </a>
              </li>
              <li className="mb-2">
                <a href="/register" className="text-muted">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

   
      <div className="text-center mt-4">
        <h6 className="text-uppercase font-weight-bold">NEXTPLAY</h6>
        <p className="text-muted small mx-auto" style={{ maxWidth: "500px" }}>
          Your Ultimate Destination for Movie Enthusiasts! Whether you love
          classics, blockbusters, or indie gems, NEXTPLAY is designed for you.
        </p>
      </div>

      <div className="bg-light py-2">
        <div className="container text-center">
          <p className="text-muted mb-0">
            &copy; 2024 NEXTPLAY, All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
