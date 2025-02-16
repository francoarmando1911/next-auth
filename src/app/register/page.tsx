"use client"

import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";

export default function LoginPage() {

  const { finishLoading, isLoading, startLoading } = useLoading()
  const authFetch = useAuthFetch()

  const register = async (formData: any) => {
    startLoading()
    await authFetch({
      endpoint: 'register',
      redirectRoute: '/home',
      formData
    })
    finishLoading()
  }


  return (
    <>
      <Form
        title="Registrarse"
        onSubmit={register}
        description="Formulario para crear un usuario"
      >
        <div className="my-[10px] flex flex-col gap-4">
          <Form.Input
            label='Correo'
            name='email'
            placeholder='Ingresa tu correo...'
            type='text'
          />
          <Form.Input
            label='Contraseña'
            name='password'
            placeholder='Ingresa tu contraseña...'
            type='password'
          />
          <Form.Input
            label='Confirmar contraseña'
            name='confirmPassword'
            placeholder='Confirma tu contraseña...'
            type='password'
          />
        </div>
        <Form.SubmitButton
          buttonText="Crear cuenta" isLoading={isLoading}
        />
        <Form.Footer
          description="Ya tienes cuenta? "
          link='/'
          textLink="Iniciar Sesión"
        />

      </Form>
    </>
  );
}
