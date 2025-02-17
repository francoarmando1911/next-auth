"use client";

import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { AxiosRequestConfig } from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ChangePasswordForm() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const searchParams = useSearchParams();
  const authFetch = useAuthFetch();

  const token = searchParams.get("token") || "";

  const changePassword = async (formData: any) => {
    startLoading();

    const options: AxiosRequestConfig<any> = {
      headers: {
        token,
      },
    };

    await authFetch({
      endpoint: "change-password",
      redirectRoute: "/",
      formData,
      options,
    });

    finishLoading();
  };

  return (
    <Form
      title="Cambiar tu contraseña"
      onSubmit={changePassword}
      description="Formulario para cambiar tu contraseña"
    >
      <div className="my-[10px] flex flex-col gap-4">
        <Form.Input
          label="Contraseña"
          name="password"
          placeholder="Ingresa tu contraseña..."
          type="password"
        />
        <Form.Input
          label="Confirmar contraseña"
          name="confirmPassword"
          placeholder="Confirma tu contraseña..."
          type="password"
        />
      </div>
      <Form.SubmitButton buttonText="Cambiar contraseña" isLoading={isLoading} />
    </Form>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ChangePasswordForm />
    </Suspense>
  );
}
