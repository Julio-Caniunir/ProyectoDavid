import React from 'react'
import './TableComponent.css';





const TableComponent = () => {


const Clientes = [
    { id: 1, nombre: 'John Doe', codigo: 'Promo123', estado: 'Activo', rut :  '12.345.678-9' },
    { id: 2, nombre: 'Jane Doe', codigo: 'Promo456', estado: 'Inactivo', rut: '9.876.532-1' },
];


  return (
    <table>    
        <thead>
            <tr>
                <th>Id del cliente</th>
                <th>Nombre</th>
                <th>Codigo de la promocion</th>
                <th>Estado</th>
                <th>RUT</th>
            </tr>
        </thead>
        <tbody>


          {Clientes.map((cliente) => (
            <tr key={cliente.id}>   
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.codigo}</td>
              <td>{cliente.estado}</td>
              <td id={cliente.rut}>{cliente.rut}</td>
            </tr>
          ))}


        </tbody>
    </table>


    

  );    
}

export default TableComponent;