import { AxiosOptions, NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosInstance } from 'axios'

const timeout = Number(process.env.TIMEOUT_LIMIT) || 20000

let $nuxtAxiosInstance: NuxtAxiosInstance
let $axios: AxiosInstance
let $auth: AxiosInstance
let $authVerify: AxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $nuxtAxiosInstance = axiosInstance
  // @ts-ignore
  $axios = $nuxtAxiosInstance.create({
    headers: {
      'Time-Zone': 8,
      'Accept-Language': navigator.language,
      Authorization: '2kqDxZynAw5hrf3X7AWKbLJGIMQnVLk/sNZDVbVtEC/zwpX/FV/+mPBP05l/xFeA9VRjFutKTaFfL651myGI1FFaGEBSlhqTQdvd2PWT1Am4dj/sBTZQf8lr8UCIta3GxclDn+YUhmx0+5Lyqd3dr/BmgBcAc6IPIW4OU3bAPfg3k915McFvNiyNy+L921gpDFrRo41mom96+6E29Vy/lMbSmxDm2uWUbDi0hiM0rqbZPerzWmcKLjzj107zEEr2rkTNo2akBR5y4mz9cq38ZV8YCZ0vvbZ12ncZO72cZ4rHJpQHOZu9sA7mF6a5czLH0vcXOuQkIDc1PoEc6qNH7k3Vyule0DbfCZHaijroEF14fO3ngcsEohfTAcWNYJ2fR2juCv+Qfm4AUz/jfqRbo9/AuJZ/+c6jsiAegpcf/1sOfhUJZWp1q0hpRh0uZQ4Kq/2zHZJe/hhTBS85rwu7RY9U+P+BWa942deDpgGrlbT6MxzgUAjZP0YCwdhecOKpdahRfk1LGSUF7IuTTXMtAYKc4UhLXjzW6aLXfFbT6QpsMBfCNB/BcMSHQ8sg7VL0AedfQ2tDMWSiSm82KEJuMywAx5PeGFpj6Y6Xs6ewQqMp88vTu9g6gHnYsMfkUw8D9lt0gizCrg6g6j+UDfUjRcH+9TtFIpi6F1lldU6CGWAuPMGD7lTx404ZNf2H0cxm9+DUIEa3FMNrBu03+T5zwzvYU2JrNOsTbT4CXzzg7NM='
    },
    baseURL: process.env.API_URL,
    timeout
  })

  // @ts-ignore
  $auth = $nuxtAxiosInstance.create({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    baseURL: 'https://auth-api.f048f36cd9de4dccae74.southeastasia.aksapp.io',
    timeout
  })

  // @ts-ignore
  $authVerify = $nuxtAxiosInstance.create({
    headers: {
      Authorization: ''
    },
    baseURL: 'https://auth-api.f048f36cd9de4dccae74.southeastasia.aksapp.io',
    timeout
  })
}

export { $axios, $auth, $authVerify }
