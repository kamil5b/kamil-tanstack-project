import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { initInjection } from "../bootstrap";
import { LoginSchema, RegisterSchema } from "@/shared/requests/schemas/auth";

export const getSession = createServerFn({
  method: "GET",
}).handler(async () => {
  const svc = initInjection();
  const request = getRequest(); // This gets the incoming headers

  const session = await svc.authSvc.auth.api.getSession({
    headers: request.headers,
  });

  return session;
});

export const login = createServerFn({
  method: "POST",
})
  .inputValidator(LoginSchema)
  .handler(async ({ data }) => {
    const svc = initInjection();
    const request = getRequest();

    // Passing headers allows Better Auth to 'set-cookie' on the response
    return await svc.authSvc.auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
      headers: request.headers, 
    });
  });

export const register = createServerFn({
  method: "POST",
})
  .inputValidator(RegisterSchema)
  .handler(async ({ data }) => {
    const svc = initInjection();
    const request = getRequest();

    return await svc.authSvc.auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      headers: request.headers,
    });
  });

export const logout = createServerFn({
  method: "POST",
}).handler(async () => {
  const svc = initInjection();
  const request = getRequest();
  
  return await svc.authSvc.auth.api.signOut({
    headers: request.headers
  });
});