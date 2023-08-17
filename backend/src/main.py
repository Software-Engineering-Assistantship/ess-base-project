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

class discount_coupom(BaseModel):
    nome: str
    desconto: int  # Change this to an 'int'

class cartao_credito(Base):
    __tablename__ = 'cartao_credito'
    nome = Column(String)
    numero_cartao = Column(String, primary_key=True, index=True)
    cvv = Column(Integer)
    validade = Column(String)
    
class cupom_desconto(Base):
    __tablename__ = 'cupom_desconto'
    nome = Column(String, primary_key=True, index=True)
    desconto = Column(Integer)  # Change this to an 'Integer'

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
    
    def check_card(self, numero_cartao: str):
        return self.db.query(cartao_credito).filter(cartao_credito.numero_cartao == numero_cartao).first() is not None
    
    def criar(self, card: credit_card):
        if self.check_card(card.numero_cartao):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cartão já registrado")
        
        db_cartao = cartao_credito(nome=card.nome, numero_cartao=card.numero_cartao, cvv=card.cvv, validade=card.validade)
        self.db.add(db_cartao)
        self.db.commit()
        self.db.refresh(db_cartao)
        return db_cartao
    
    def atualizar(self, numero_cartao: str, card: credit_card):
        existing_card = self.db.query(cartao_credito).filter(cartao_credito.numero_cartao == numero_cartao).first()
        existing_card.nome = card.nome
        existing_card.cvv = card.cvv
        existing_card.validade = card.validade
        self.db.commit()
        self.db.refresh(existing_card)
        return existing_card
    def remover(self, numero_cartao: str, card: credit_card):
        cartao_remover = self.db.query(cartao_credito).filter(cartao_credito.numero_cartao == numero_cartao).first()
        if cartao_remover is not None:
            self.db.delete(cartao_remover)
            self.db.commit()
            return None
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="cartão não encontrado")               
    
    
    def relatorio(self):
        return self.db.query(cartao_credito).all()
    
    
#class cupom_desconto(Base):
    #__tablename__ = 'cupom_desconto'
    #nome = Column(String, primary_key = True, index = True)
    #desconto = Column(Integer)
    
class RepositorioCupoms():
    def __init__(self, db: Session):
        self.db = db
    
    def check_cupom(self, nome: str):
        return self.db.query(cupom_desconto).filter(cupom_desconto.nome == nome).first() is not None
    
    def criar(self, cupom: discount_coupom):
        if self.check_cupom(cupom.nome):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cupom já registrado")
        
        db_cupom = cupom_desconto(nome=cupom.nome, desconto=cupom.desconto)
        self.db.add(db_cupom)
        self.db.commit()
        self.db.refresh(db_cupom)
        return db_cupom
    
    def atualizar(self, nome: str, cupom: discount_coupom):
        existing_coupom = self.db.query(cupom_desconto).filter(cupom_desconto.nome == nome).first()
        existing_coupom.nome = cupom.nome
        existing_coupom.desconto = cupom.desconto
        self.db.commit()
        self.db.refresh(existing_coupom)
        return existing_coupom
    
    def remover(self, nome: str):
        cupom_remover = self.db.query(cupom_desconto).filter(cupom_desconto.nome == nome).first()
        if cupom_remover is not None:
            self.db.delete(cupom_remover)
            self.db.commit()
            return None
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cupom não encontrado")
    
    def relatorio(self):
        return self.db.query(cupom_desconto).all()

criar_banco()

@app.post('/cartoes', response_model=credit_card, status_code=status.HTTP_201_CREATED)
def criar_cartao(card: credit_card, db: Session = Depends(get_db)):
    card_temp = RepositorioCartao(db).criar(card)
    return card_temp

@app.get('/cartoes', response_model=list[credit_card], status_code=status.HTTP_200_OK)
def acessar_cartoes(db: Session = Depends(get_db)):
    repo = RepositorioCartao(db)
    cartoes = repo.relatorio()
    return cartoes

@app.put('/cartoes/{numero_cartao}', response_model=credit_card)
def atualizar_cartao_existente(numero_cartao: str, card: credit_card, db: Session = Depends(get_db)):
    repo = RepositorioCartao(db)
    existing_card = repo.check_card(numero_cartao)
    
    if not existing_card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cartão não cadastrado")
    updated_card = repo.atualizar(numero_cartao, card)
    return updated_card


@app.delete('/cartoes/{numero_cartao}', status_code=status.HTTP_204_NO_CONTENT)
def deletar_cartao(numero_cartao: str, db: Session = Depends(get_db)):
    repo = RepositorioCartao(db)
    repo.remover(numero_cartao)
    
@app.post('/cupom', response_model=discount_coupom, status_code=status.HTTP_201_CREATED)
def cadastro_cupom(cupom: discount_coupom, db: Session = Depends(get_db)):
    cupom_temp = RepositorioCupoms(db).criar(cupom)
    return cupom_temp

@app.get('/cupom', response_model= list[discount_coupom], status_code=status.HTTP_200_OK)
def acessar_cupoms(db: Session = Depends(get_db)):
    return RepositorioCupoms(db).relatorio()

@app.put('/cupom/{nome}', response_model=discount_coupom)
def atualizar_cupom_existente(nome: str, cupom: discount_coupom, db: Session = Depends(get_db)):
    repo = RepositorioCupoms(db)
    existing_cupom = repo.check_cupom(nome)
    
    if not existing_cupom:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cupom não cadastrado")
    updated_cupom = repo.atualizar(nome, cupom)
    return updated_cupom

@app.delete('/cupom/{nome}', status_code=status.HTTP_204_NO_CONTENT)
def deletar_cupom(nome: str, db: Session = Depends(get_db)):
    repo = RepositorioCupoms(db)
    repo.remover(nome)
    
class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user = Column(String)
    company = Column(String)
    stars = Column(Integer)
    comment = Column(String)

Base.metadata.create_all(bind=engine)

class ReviewCreate(BaseModel):
    user: str
    company: str
    stars: int
    comment: str

@app.post("/submit_review")
async def submit_review(review: ReviewCreate):
    if review.stars < 1 or review.stars > 5:
        raise HTTPException(status_code=400, detail="Stars should be between 1 and 5")

    if not review.comment:
        raise HTTPException(status_code=400, detail="Comment cannot be empty")

    db_review = Review(**review.dict())
    db = SessionLocal()
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    db.close()

    return {"message": "Review submitted successfully"}

@app.get("/get_reviews/{company}")
async def get_reviews(company: str):
    db = SessionLocal()
    company_reviews = db.query(Review).filter(Review.company == company).all()
    db.close()
    return company_reviews
