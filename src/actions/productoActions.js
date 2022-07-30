import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Funcion que crea nuevos productos

export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() );
        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto)

            //si todo sale bien, actualiza el state
            dispatch( agregarProductoExito(producto) );

            //Alerta
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )

        } catch (error) {
            //si hay un error cambiar el state
            dispatch( agregarProductoError(true) )

            // alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//producto se guardo en DB
const agregarProductoExito = (producto) => ({
    //este objeto se llama "action"
    //action.type --- action.payload
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//si hubo un error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


// Función que descarga los productos de la base de datos.
export function obtenerProductosAction() {
    return async (dispatch) => {
            dispatch( descargarProductos() );
        
        try {        
            const respuesta = await clienteAxios.get('/productos')    
            dispatch ( descargarProductosExitosa(respuesta.data) )
            
        } catch (error) {
            dispatch( descargarProductosError() )
    }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargarProductosExitosa = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos,
})

const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true,
})

// Selecciona y elimina el producto

export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch( eliminarProductoExito() );
            
            // si se elimina mostrar alerta
            Swal.fire(
                'Eliminado!',
                'Tu producto ha sido eliminado.',
                'success'
            )
        } catch (error) {
            console.log(error)
            dispatch( eliminarProductoError() )
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})


// Colocar producto en edicion
export function obtenerProductoEditar(producto) {
    return(dispatch) => {
        dispatch( obtenerProductoAction(producto) )
    }
}

const obtenerProductoAction= producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//Edita un producto en la API y state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto())
        try {
            //editar en base de datos
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            //editar en state
            dispatch( editarProductoExito(producto) )
        } catch (error) {
            
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

