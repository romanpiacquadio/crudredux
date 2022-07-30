import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {editarProductoAction} from '../actions/productoActions'
import { useHistory } from 'react-router-dom'

function EditarProducto() {

    const history = useHistory();
    const dispatch = useDispatch();


    // nuevo state de producto
    const [ productoAEditar, setProductoAEditar ] = useState({
        nombre: '',
        precio: ''
    })

    // producto a editar
    const producto = useSelector(state => state.productos.productoEditar)
    
    // llenar el state automaticamente
    useEffect( () => {
        setProductoAEditar(producto)
    }, [producto])

    // Leer los datos del formulario
    const onChangeFormulario = e => {
        e.preventDefault();

        setProductoAEditar({
            ...productoAEditar,
            [e.target.name] : e.target.value
        })
    }


    const { nombre, precio } = producto;

    const submitEditarProducto = (e) => {
        e.preventDefault();

        dispatch( editarProductoAction(productoAEditar) );
    
        history.push('/');
    }
    
    return (
    <div className='row justify-content-center'>
        <div className='col-md-8'>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='text-center mb-4 font-weight-bold'>Editar Producto</h2>

                    <form
                        onSubmit={submitEditarProducto}
                    >
                        <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value='ROMAN'
                                    onChange={onChangeFormulario}
                                />
                        </div>
                        <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value='100'
                                    onChange={onChangeFormulario}
                                />
                        </div>

                        <button
                            type='submit'
                            className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                                Guardar Cambios
                        </button>

                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditarProducto