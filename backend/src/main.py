from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SQLALCHEMY_DATABASE_URL = "sqlite:///./henriquemelo.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class credit_card(BaseModel):
    nome: str
    numero_cartao: str
    cvv: int
    validade: str

class cartao_credito(Base):
    __tablename__ = 'cartao_credito'
    nome = Column(String)
    numero_cartao = Column(String, primary_key=True, index=True)
    cvv = Column(Integer)
    validade = Column(String)

# Function to create the database tables
def criar_banco():
    Base.metadata.create_all(bind=engine)

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class RepositorioCartao():
    def __init__(self, db: Session):
        self.db = db
    
    def criar(self, card: credit_card):
        db_cartao = cartao_credito(nome=card.nome, numero_cartao=card.numero_cartao, cvv=card.cvv, validade=card.validade)
        self.db.add(db_cartao)
        self.db.commit()
        self.db.refresh(db_cartao)
        return db_cartao
    
    def relatorio(self):
        return self.db.query(cartao_credito).all()

criar_banco()

@app.post('/cartoes', response_model=credit_card)
def criar_cartao(card: credit_card, db: Session = Depends(get_db)):
    card_temp = RepositorioCartao(db).criar(card)
    return card_temp

@app.get('/cartoes', response_model=list[credit_card])
def acessar_cartoes(db: Session = Depends(get_db)):
    repo = RepositorioCartao(db)
    cartoes = repo.relatorio()
    return cartoes















#discount features

class cupom_desconto(BaseModel):
    nome : str
    desconto : int


    


