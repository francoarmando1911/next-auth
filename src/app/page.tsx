"use client"

import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";

export default function LoginPage() {

  const { finishLoading, isLoading, startLoading } = useLoading()
  const authFetch = useAuthFetch()

  const login = async (formData: any) => {
    startLoading()
    await authFetch({
      endpoint: 'login',
      redirectRoute: '/home',
      formData
    })
    finishLoading()
  }


  return (
    <>
      <Form 
        title="Iniciar Sesión" 
        onSubmit={login}
        description="Formulario para iniciar sesión"  
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
      </div>
      <Form.SubmitButton
          buttonText="Iniciar Sesión" isLoading={isLoading}
      />
      <Form.Footer 
        description="Te olvidaste tu contraseña: "
        link='/forget-password'
        textLink="Recuperar contraseña"
      />
      <Form.Footer
        description="Aun no tienes cuenta? "
        link='/register'
        textLink="Registrarse"        
      />

    </Form>
    </>
  );
}
