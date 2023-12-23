//react es necesario para hacer referencia a un componente de react
import React from 'react'
//estos elementos permiten construir pruebas basado en aplicaciones vite
import { describe, test, expect } from 'vitest'
//el paquete permite renderizar y manipular componentes de react
import { render, screen } from '@testing-library/react'
//herramienta para simular los eventos de usuario
import userEvent from '@testing-library/user-event'
//componente que deseamos testear
import App from '../src/App'

describe('Star Wars APP', () => {
    //E2E TEST
    test('should get result from search', async () => {
        const user = userEvent.setup()

        render(<App />)
        //asegurar que se han cargado la lista de personajes
        const list = screen.getByRole('list')
        expect(list).toBeDefined()

        //buscar el input
        const input = screen.getByRole('textbox')
        expect(input).toBeDefined()

        //buscar el form
        const form = screen.getByRole('form')
        expect(form).toBeDefined()

        //apartir de otro elemento, podemos buscar otro con query selector
        const button = form.querySelector('button')
        expect(button).toBeDefined()

        //asincrono ya que el usuario no escribe inmediatamente
        await user.type(input, 'Anakin')
        //verificar que en la lista vacia se agrego un elemento
        expect(list.childNodes.length).toBe(1)

        //un vez realizada la funcionalidad completa, es posible ahora refactorizar todo el codigo
    })
})