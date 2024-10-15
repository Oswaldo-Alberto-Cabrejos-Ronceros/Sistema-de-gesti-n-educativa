import React from 'react'
import './InfoUser.css'


function InfoUser({user}) {
  return (
    <div className='InfoUserContent'>
      {
        user.rol==="TEACHER" && (
          <div>
          <img className='ImgUserInfo'src="https://dashboard.rtta.rw/public/assets/img/avatar.png" alt="UserImage" />
          <h3>Docente:</h3>
          <h3>Nombres:</h3>
          <p className='PLg'>{user.nombres}</p>
          <h3>Apellidos:</h3>
          <p className='PLg'>{user.apellidos}</p>
          </div>
        )
      } {
        user.rol==="STUDENT" &&(
          <div>
          <img className='ImgUserInfo' src="https://dashboard.rtta.rw/public/assets/img/avatar.png" alt="UserImage" />
          <h3>Estudiante:</h3>
          <h3>Nombres:</h3>
          <p className='PLg'>{user.nombres}</p>
          <h3>Apellidos:</h3>
          <p className='PLg'>{user.apellidos}</p>
          <h3>Grado:</h3>
          <p className='PLg'>{user.grado}</p>
          <h3>Nivel:</h3>
          <p className='PLg'>{user.nivel}</p>
          </div>
        )
      } {
        user.rol==="ADMINISTRATOR" && (
          <div>
          <img className='ImgUserInfo' src="https://dashboard.rtta.rw/public/assets/img/avatar.png" alt="UserImage" />
          <h3>Administrador:</h3>
          <h3>Nombres:</h3>
          <p className='PLg'>{user.nombres}</p>
          <h3>Apellidos:</h3>
          <p className='PLg'>{user.apellidos}</p>
          </div>
        )
      }
    </div>
  )
}

export default InfoUser