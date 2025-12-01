const getBackEndUrl = () => {
  if (import.meta.env.VITE_DOCKER_ENV === 'true') {
    return "http://backend:3000/";
  }

  return "http://localhost:3001/";
}
export default getBackEndUrl;