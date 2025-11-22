import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useEffect} from "react";
import type {RegisterErrorType, RegisterFormType} from '@/types/RegisterFormTypes.ts'
import {useNavigate} from "react-router-dom";
import {useRegisterServices} from "@/services";

export default function RegisterForm() {
  // ! hooks
  const navigate = useNavigate();
  const {
    onChange, onSubmit,
    form, error, setError, canSubmit, setCanSubmit
  } = useRegisterServices();

  // ! Effects
  useEffect(() => {
    function validateForm(form: RegisterFormType): RegisterErrorType {
      return {
        email: form.email.includes("@") ? "" : "E-mail inválido",
        name: form.name.length >= 3 ? "" : "Nome muito curto",
        password: form.password.length >= 6 ? "" : "Senha muito curta",
      }
    }

    const newErrors = validateForm(form)
    setError(newErrors)

    const hasErrors = Object.values(newErrors).some((err) => err !== "")
    setCanSubmit(hasErrors)

  }, [form, setCanSubmit, setError])

  return (
    <div className={'min-w-[18rem] w-[34rem]'}>
      <Card>
        <h1 className={'font-bold text-2xl'}>Registro</h1>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={onChange}
                  required
                />
                <text className={'text-start text-sm text-red-500'}>{error.email || ''}</text>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Nome</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="João Silva"
                  onChange={onChange}
                  required
                />
                <text className={'text-start text-sm text-red-500'}>{error.name || ''}</text>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  name="password"
                  type="password"
                  onChange={onChange}
                  required
                />
                <text className={'text-start text-sm text-red-500'}>{error.password || ''}</text>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            onClick={async () => {
              await onSubmit(form)
            }}
            disabled={canSubmit}
          >

            Criar conta!
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Já possuo uma conta
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

