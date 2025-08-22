export interface Client {
  id: string;
  username: string;
  email: string;
  name: string;
  cpf: string;
  phone: string;
  birthDate: string;
}

export interface Hotelier {
  id: string;
  username: string;
  email: string;
  name: string;
  hotel: string;
  cep: string;
  address: string;
  city: string;
  n_address: string;
  UF: string;
  cnpj: string;
}
