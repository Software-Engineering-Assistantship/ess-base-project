from sqlalchemy import Column, Integer, String
from backend.src.db.database import Base





class cartao_credito(Base):
    __tablename__ = 'cartao_credito'
    nome = Column(String)
    numero_cartao = Column(String, primary_key=True, index= True)  
    cvv = Column(Integer)
    validade = Column(String)


class cupom_desconto(Base):
    __tablename__ = 'cupoms_desconto'
    nome = Column(String, primary_key = True, index=True)
    desconto : Column(Integer)