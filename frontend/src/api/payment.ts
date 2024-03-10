import { api } from '../lib/axios'

export type Card = {
    cardNumber: string
    cardHolderName: string
    expirationDate: string
    cvv: number
    type: string
  }

export async function createCard(card: Card) {
    const response = await api.post(`/payment`, card)

    return response.data    
}

export async function getCards() {
  const response = await api.get(`/payment`)

  return response.data 
}


export async function deleteCard(cardId: string) {
  const response = await api.delete(`/payment/${cardId}`)

  return response.data
}
