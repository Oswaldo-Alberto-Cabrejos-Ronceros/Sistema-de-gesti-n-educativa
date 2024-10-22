import React from "react";

import "./VInicioSesion.css";

function VInicioSesion() {
  return (
    <div className="Container-Prin">
      <div className="Content-1">
        <img
          src="https://scontent.fpio2-1.fna.fbcdn.net/v/t1.6435-9/119931467_102934771572270_2851731201534669293_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHb7GRpree8ylSIOsKgKaM8KEcbqGJa7QcoRxuoYlrtB0izSoKDIR4wLph5U9vL31vEsiVnDCF5YVSEPdX8WtfS&_nc_ohc=mLtHC40Ez6gQ7kNvgETITH_&_nc_ht=scontent.fpio2-1.fna&_nc_gid=AlNLdyn8_ig9Qh0_l04cWQ9&oh=00_AYBTBa6BZwZnwQodIDDJV8kOjOU6sBmoiJmAI-VW57O10A&oe=673E9090"
          alt="Logo del Colegio"
        />
        <h3>Su nueva plataforma virtual</h3>
        <p className="PMd">Ingrese sus datos</p>
        <div className="input-user-container">
          <input type="text" placeholder="Ingrese usuario" />
          <svg
            width="23"
            height="26"
            viewBox="0 0 23 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector"
              d="M11.4182 2.80533C12.0175 1.99294 12.8095 1.41801 13.6889 1.15706C14.5682 0.896105 15.4931 0.961498 16.3406 1.34454C17.1881 1.72757 17.9179 2.41009 18.433 3.30128C18.9481 4.19247 19.224 5.25006 19.224 6.33333C19.224 7.41661 18.9481 8.4742 18.433 9.36539C17.9179 10.2566 17.1881 10.9391 16.3406 11.3221C15.4931 11.7052 14.5682 11.7706 13.6889 11.5096C12.8095 11.2487 12.0175 10.6737 11.4182 9.86133M14.7636 25H1.38184V23.6667C1.38184 21.5449 2.08677 19.5101 3.34155 18.0098C4.59634 16.5095 6.2982 15.6667 8.07273 15.6667C9.84727 15.6667 11.5491 16.5095 12.8039 18.0098C14.0587 19.5101 14.7636 21.5449 14.7636 23.6667V25ZM14.7636 25H21.4545V23.6667C21.4547 22.2623 21.1457 20.8826 20.5585 19.6663C19.9713 18.45 19.1267 17.4399 18.1095 16.7376C17.0923 16.0353 15.9384 15.6656 14.7639 15.6655C13.5893 15.6655 12.4354 16.0351 11.4182 16.7373M12.5333 6.33333C12.5333 7.74782 12.0634 9.10438 11.2269 10.1046C10.3903 11.1048 9.25576 11.6667 8.07273 11.6667C6.88971 11.6667 5.75514 11.1048 4.91861 10.1046C4.08209 9.10438 3.61214 7.74782 3.61214 6.33333C3.61214 4.91885 4.08209 3.56229 4.91861 2.5621C5.75514 1.5619 6.88971 1 8.07273 1C9.25576 1 10.3903 1.5619 11.2269 2.5621C12.0634 3.56229 12.5333 4.91885 12.5333 6.33333Z"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="input-user-container">
          <input type="text" placeholder="Ingrese contraseña" />
          <svg
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector"
              d="M14.5091 22.1C13.8198 22.2559 13.1197 22.334 12.4182 22.3333C7.42454 22.3333 3.19812 18.4093 1.77631 13C2.1591 11.5441 2.74871 10.178 3.51929 8.96133M10.0518 10.172C10.6793 9.42179 11.5303 9.00033 12.4176 9.00033C13.305 9.00033 14.156 9.42179 14.7834 10.172C15.4109 10.9222 15.7634 11.9397 15.7634 13.0007C15.7634 14.0616 15.4109 15.0791 14.7834 15.8293M10.0518 10.172L14.7834 15.8293M10.0518 10.172L14.7823 15.8267M14.7834 15.8293L18.4534 20.216M10.0541 10.1733L6.38522 5.78667M6.38522 5.78667L2.38183 1M6.38522 5.78667C8.18324 4.39942 10.2783 3.66321 12.4182 3.66667C17.4118 3.66667 21.6382 7.59067 23.0601 13C22.275 15.9739 20.6451 18.5261 18.4523 20.2147M6.38522 5.78667L18.4523 20.2147M18.4523 20.2147L22.4545 25"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <a href="#">Olvidaste tu contraseña</a>
        <div className="btnContainer">
          <button>Iniciar Sesion</button>
        </div>
      </div>
    </div>
  );
}

export default VInicioSesion;
