from pydantic import BaseModel
from typing import Optional, List

class credit_card(BaseModel):
    nome : str
    numero_cartao: str  
    cvv : int
    validade : str
    
    class Config:
        orm_mode = True

class cupom_desconto(BaseModel):
    nome : str
    desconto : int   