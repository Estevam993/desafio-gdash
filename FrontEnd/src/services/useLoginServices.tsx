import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {LoginApiReturn, LoginErrorType, LoginFormType} from "@/types/LoginFormTypes.ts";
import {postRequest, setCookie} from "@/utils/http.ts";
import {useToast} from "@/services/index.ts";

const apiUrl = import.meta.env.VITE_NEST_API_URL;

const loginFormSchema = {
  email: '',
  password: '',
}

export default function useLoginServices() {
  // ! hooks
  const navigate = useNavigate()
  const {showToast} = useToast()

  // ! States
  const [form, setForm] = useState<LoginFormType>(loginFormSchema)
  const [error, setError] = useState<LoginErrorType>(loginFormSchema)
  const [canSubmit, setCanSubmit] = useState(false)

  // ! functions
  const LoginUser = async (form: LoginFormType) => {
    try {
      const data: LoginApiReturn = await postRequest({
        url: apiUrl + 'user/login',
        data: form
      })

      const jwt = data.access_token

      setCookie('jwt', jwt, 1)

      showToast("Bem vindo de volta!", "success");
      navigate('/dashboard');

    } catch (error) {
      showToast(
        'Erro ao entrar na conta.',
        'error',
        {description: error instanceof Error ? error.message : "Erro desconhecido."}
      )
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") setError(prevError => ({
      ...prevError,
      [e.target.name]: `Campo ${e.target.name} é obrigatório.`
    }));
    else setForm(prevForm => ({...prevForm, [e.target.name]: e.target.value}));
  }

  const onSubmit = async (data: LoginFormType) => {
    await LoginUser(data)
  }

  const verifyToken = async (token: string | undefined) => {
    try {
      return await postRequest({
        url: apiUrl + 'user/verify_token',
        data: {token}
      })

    } catch {
      return {
        "statusCode": 500
      }
    }
  }


  return {
    onChange, onSubmit, form, setForm, error, setError, canSubmit, setCanSubmit, verifyToken
  }
}