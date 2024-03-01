import { backend } from "@/lib/axios";

export namespace ApiExample {
  export async function getExample() {
    const response = await backend.get("/example");
    return response;
  }
}