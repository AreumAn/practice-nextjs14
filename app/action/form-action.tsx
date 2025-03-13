"use server"

export async function formAction(prevState: any, formData: FormData) {
  if (formData.get("password") !== "12345") {
    return {
      errors: ["Wrong password"]
    }
  }
  return {
    errors: []
  }
}
