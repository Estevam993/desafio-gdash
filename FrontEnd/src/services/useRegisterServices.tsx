import {postRequest, setCookie} from "@/utils/http.ts";
import type {RegisterApiReturn, RegisterErrorType, RegisterFormType} from "@/types/RegisterFormTypes.ts";
import {useToast} from "@/services";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const apiUrl = import.meta.env.VITE_NEST_API_URL;

const registerFormSchema = {
  email: '',
  name: '',
  password: '',
}

export default function useRegisterServices() {
  // ! Hooks
  const navigate = useNavigate()
  const {showToast} = useToast()

  // ! States
  const [form, setForm] = useState<RegisterFormType>(registerFormSchema)
  const [error, setError] = useState<RegisterErrorType>(registerFormSchema)
  const [canSubmit, setCanSubmit] = useState(false)

  // ! Functions
  const RegisterUser = async (form: RegisterFormType) => {
    try {
      const data: RegisterApiReturn = await postRequest({
        url: apiUrl + 'user',
        data: form
      })

      const jwt = data.access_token

      setCookie('jwt', jwt, 1)

      showToast("Usuário criado com sucesso!", "success");
      navigate('/dashboard');

    } catch (error) {
      showToast(
        'Erro ao criar o usuário.',
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

  const onSubmit = async (data: RegisterFormType) => {
    await RegisterUser(data)
  }


  return {
    onChange,
    onSubmit,
    form, error, setError, canSubmit, setCanSubmit
  }
}