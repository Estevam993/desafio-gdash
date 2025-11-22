import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useEffect, useState} from "react";
import type {LoginErrorType, LoginFormType} from '@/types/LoginFormTypes.ts'

const loginFormSchema = {
  email: '',
  password: '',
}

export default function LoginForm() {
  // ! States
  const [form, setForm] = useState<LoginFormType>(loginFormSchema)
  const [error, setError] = useState<LoginErrorType>(loginFormSchema)
  const [canSubmit, setCanSubmit] = useState(false)

  // ! Functions
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") setError(prevError => ({
      ...prevError,
      [e.target.name]: `Campo ${e.target.name} é obrigatório.`
    }));
    else setForm(prevForm => ({...prevForm, [e.target.name]: e.target.value}));
  }


  // ! Effects
  useEffect(() => {
    function validateForm(form: LoginFormType): LoginErrorType {
      return {
        email: form.email.includes("@") ? "" : "E-mail inválido",
        password: form.password.length >= 6 ? "" : "Senha muito curta",
      }
    }

    const newErrors = validateForm(form)
    setError(newErrors)

    const hasErrors = Object.values(newErrors).some((err) => err !== "")
    setCanSubmit(!hasErrors)

  }, [form, setError])

  return (
    <div className={'min-w-[18rem] w-[34rem]'}>
      <Card>
        <h1 className={'font-bold text-2xl'}>Login</h1>
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
            className="w-full"
            onClick={() => {
              alert(JSON.stringify(form))
            }}
            disabled={canSubmit}
          >

            Login
          </Button>
          <Button variant="outline" className="w-full">Crie uma conta!</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

