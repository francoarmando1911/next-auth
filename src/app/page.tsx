"use client"

import { Form } from "@/components/Form";

export default function LoginPage() {
  return (
    <>
    <Form title="Login" onSubmit={() => {}}>
      <Form.Input
        label='Label'
        name='name'
        placeholder='Name...'
        type='text'
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
