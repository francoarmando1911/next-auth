"use client"

import { Form } from "@/components/Form";

export default function LoginPage() {
  return (
    <>
      <Form 
        title="Iniciar Sesión" 
        onSubmit={() => {}}
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
          buttonText="Iniciar Sesión"
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
