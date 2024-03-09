"use client"

import { Payload } from "@/app/components/Cookies"
import axios from "axios"

export async function setHttpOnlyCookie(payload: Payload) {
  return axios.post("http://localhost:3000/api/cookie/setHttpOnly", payload)
}
