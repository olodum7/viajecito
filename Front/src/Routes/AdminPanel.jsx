import React, { useState, useEffect } from 'react';
import Button from '../Components/buttons/Button';

const Admin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // lógica para verificar si el usuario es administrador
    const userRole = localStorage.getItem('userRole'); 

    if (userRole !== "role_user") {
      // Redirigir si el usuario no tiene rol de administrador, lo dejo en user_role de momento
    }
    
    // const userData = localStorage.getItem('userData'); 
    // setUser(userData);
  });

  return (
    <div className="table">
      <h1>Panel de Administración</h1>
        <div>
        <Button url="/list" buttonName="Listar Tours"/>
        <Button url="/tour" buttonName="Agregar Tours"/>
        </div>
    </div>
  );
};

export default Admin;