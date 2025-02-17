import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import {useLocation } from "react-router-dom";


const Footer = () => {
  const location = useLocation();

  const hiddenFooterRoutes = ["/admin", "/add-product", "/add-category"];

  if (hiddenFooterRoutes.includes(location.pathname)) {
    return null; 
  }


  return (
    <footer className="bg-white" >
<div class="container py-3 , boxStyle">
  <div class="row py-1">
    <div style={{display:'flex' ,justifyContent:"center", gap:"100px"}}>
<div>
    <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
      <h6 class="text-uppercase font-weight-bold mb-4" style={{width:"150px"}}>Contact Us</h6>
      <ul class="list-unstyled mb-0">
        <li class="mb-2"><a href="gmail.com" class="text-muted">Otuffaha@gmail.com</a></li>
        <li class="mb-2"><a href="gmail.com" class="text-muted">Otuffaha@gmail.com</a></li>
        <li class="mb-2"><a href="gmail.com" class="text-muted">Otuffaha@gmail.com</a></li>




      </ul>
    </div>
    </div>
    <div>
    <div class="col-lg-1 col-md-6 mb-4 mb-lg-0">
      <h6 class="text-uppercase font-weight-bold mb-4" style={{width:"150px"}}>Our Social Media Account</h6>
      <ul class="list-unstyled mb-0">
        <li class="mb-4"><a target="_blank" href="https://www.facebook.com/osama.tuffaha.3/" class="text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="blue" class="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
</svg></a></li>
        <li class="mb-4"><a target="_blank" alt = "instagram" href="https://www.instagram.com/_osama_99/" class="text-muted" ><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="Maroon" class="bi bi-instagram" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
</svg></a></li>
        <li class="mb-2"><a target="_blank" href="https://www.linkedin.com/in/osama-tuffaha-894a8b2b1/" class="text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#0077B5" class="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg></a></li>
      </ul>
    </div>
    </div>

    <div>
    <div class="col-lg-2 col-md-6 mb-4 mb-lg-0" style={{width:"150px"}}>
      <h6 class="text-uppercase font-weight-bold mb-4">Policy</h6>
      <ul class="list-unstyled mb-0">
        <li class="mb-2"><a href="#" class="text-muted">Return Policy</a></li>
        <li class="mb-2"><a href="#" class="text-muted">Terms Of Use</a></li>
        <li class="mb-2"><a href="#" class="text-muted">Security</a></li>
        <li class="mb-2"><a href="#" class="text-muted">Privacy</a></li>
      </ul>
    </div>
    </div>
    <div>
    <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
      <h6 class="text-uppercase font-weight-bold mb-4" style={{width:"200px"}}>Quick Navigate</h6>
      <ul class="list-unstyled mb-0">
        <li class="mb-2"><a href="/login" class="text-muted">Login</a></li>
        <li class="mb-2"><a href="/register" class="text-muted">Register</a></li>
        <li class="mb-2"><a href="/" class="text-muted">Our Products</a></li>
      </ul>
    </div>
    </div>
    <div style={{width:"500px"}}>
    <div class="col-lg-1 col-md-1 mb-lg-0">
      <h6 class="text-uppercase font-weight-bold mb-1" style={{width:"100px"}}>NEXTPLAY</h6>
      <p class="text-muted mb-2" style={{width:"400px"}}>Your Ultimate Destination for Movie Enthusiasts Are you a cinephile
            who craves the magic of the silver screen? Look no further! At
            NEXTPLAY we bring the world of cinema to your fingertips. Whether
            you're a fan of timeless classics, the latest blockbusters, or
            hidden indie gems, our website is designed to cater to all your
            movie-watching needs.</p>
      <ul class="list-inline mt-4">
        <li class="list-inline-item"><a href="#" target="_blank" title="twitter"><i class="fab  fa-2x fa-twitter"></i></a></li>
        <li class="list-inline-item"><a href="#" target="_blank" title="facebook"><i class="fab fa-2x fa-facebook-f"></i></a></li>
        <li class="list-inline-item"><a href="#" target="_blank" title="instagram"><i class="fab fa-2x fa-instagram"></i></a></li>
        <li class="list-inline-item"><a href="#" target="_blank" title="pinterest"><i class="fab fa-2x fa-youtube"></i></a></li>
        <li class="list-inline-item"><a href="#" target="_blank" title="vimeo"><i class="fab fa-2x fa-google"></i></a></li>
      </ul>
    </div>
    </div>
  </div>
  </div>
</div>


<div class="bg-light py-2">
  <div class="container text-center">
    <p class="text-muted mb-0 py-2">&copy; 2024 TUF Store , All risghts reserved.</p>
    
    </div>
  </div>

</footer>
  )
}

export default Footer