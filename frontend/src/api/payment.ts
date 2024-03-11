import { api } from '../lib/axios'

export type Card = {
  cardNumber: string
  cardHolderName: string
  expirationDate: string
  cvv: number
  type: string
}

export async function createCard(card: Card) {
  try {
    const response = await api.post(`/payment`, card)
    return response.data
  } catch (error) {
    alert('Nome já em uso')
  }
}

export async function getCards() {
  const response = await api.get(`/payment`)

  return response.data
}

export async function deleteCard(cardId: string) {
  const response = await api.delete(`/payment/${cardId}`)

  return response.data
}

export async function updateCard(cardId: string, cardUpdates: any) {
  const response = await api.patch(`/payment/${cardId}`, cardUpdates)

  return response.data
}
