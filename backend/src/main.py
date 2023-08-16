from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi.responses import JSONResponse

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

class Lojas(BaseModel):
    email: str
    nome: str
    cnpj: str
    endereco: str
    senha: str

    class config:
        orm_mode =  True

class Stores(Base):

    __tablename__ = 'lojas'

    email = Column(String, primary_key=True, index=True)
    nome = Column(String)
    cnpj = Column(String)
    endereco = Column(String)
    senha = Column(String)
        
        
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

class RepositorioLojas():
    def __init__(self, db: Session):
        self.db = db
    
    def criar(self, loja: Lojas):
        db_loja = Stores(email=loja.email, 
                         nome=loja.nome,
                         cnpj=loja.cnpj, 
                         endereco=loja.endereco, 
                         senha=loja.senha)
        self.db.add(db_loja)
        self.db.commit()
        self.db.refresh(db_loja)
        return db_loja

    def check_lojas(self, emailcheck: str):
        return self.db.query(Stores).filter(Stores.email == emailcheck).first()

    def listar(self):
        lojas = self.db.query(Stores).all()
        return lojas

    def obter(self):
        pass

    def deletar(self):
        pass

criar_banco()

@app.post('/cartoes', response_model=credit_card, status_code=status.HTTP_201_CREATED)
def criar_cartao(card: credit_card, db: Session = Depends(get_db)):
    card_temp = RepositorioCartao(db).criar(card)
    response_message = {"message": "Cartão criado com sucesso"}
    return JSONResponse(content=response_message, status_code=status.HTTP_201_CREATED)

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
    
    
@app.post('/lojas', status_code=status.HTTP_201_CREATED)
def criar_lojas(lojas: Lojas, db: Session = Depends(get_db)):
    loja_criada = RepositorioLojas(db).criar(lojas)
    return loja_criada


@app.get('/lojas')
def listar_lojas(db: Session = Depends(get_db)):
    lojas = RepositorioLojas(db).listar() 
    return lojas

#@app.delete('/lojas/{email}', status_code=status.HTTP_204_NO_CONTENT)
#def deletar_email(email: str, db: Session = Depends(get_db)):
    repo = RepositorioLojas(db)
    repo.deletar(email)
    

    


