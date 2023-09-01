from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi.responses import JSONResponse
from passlib.context import CryptContext 
from sqlalchemy.orm import declarative_base

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



class credit_card(BaseModel):
    nome: str
    numero_cartao: str
    cvv: int
    validade: str

class cartao_credito(Base):
    __tablename__ = 'cartao_credito'
    nome = Column(String)
    numero_cartao = Column(String, primary_key=True, index=True) # chave primária
    cvv = Column(Integer)
    validade = Column(String)
    
class discount_coupom(BaseModel):
    nome: str
    desconto: int 
    
class cupom_desconto(Base):
    __tablename__ = 'cupom_desconto'
    nome = Column(String, primary_key=True, index=True) # chave primária
    desconto = Column(Integer)  

class Entregadores(Base):

    __tablename__ = 'entregadores'

    email = Column(String, primary_key=True, index=True)
    nome = Column(String)
    cpf = Column(String)
    telefone = Column(String)
    veiculo = Column(String)
    placa = Column(String)

class Entregador(BaseModel):
    email: str
    nome: str
    cpf: str
    telefone: str
    veiculo: str
    placa: str
    
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
    
class Entrega(BaseModel):

    id: str
    nomeProduto: str
    quantidade: str
    marca: str
    tipoDoProduto: str
    enderecoDeEntrega: str
    preco: str
    status: str
    emailEntregador: str
    
class Entregas(Base):
    __tablename__ = 'entregas'
    id = Column(String, primary_key=True, index=True)
    nomeProduto = Column(String)
    quantidade = Column(String)
    marca = Column(String)
    tipoDoProduto = Column(String)
    enderecoDeEntrega = Column(String)
    preco = Column(String)
    status = Column(String)
    emailEntregador = Column(String)


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

class LoginLojas(BaseModel):
    email: str
    senha: str



pwd_content = CryptContext(schemes=['bcrypt'])


def gerarhash(senha):
    return pwd_content.hash(senha)

def verificarsenha(senha, hash):
    return pwd_content.verify(senha, hash)


    
class RepositorioEntregadores():
    def __init__(self, db: Session):
        self.db = db
    
    def check_entregador(self, email: str):
        return self.db.query(Entregadores).filter(Entregadores.email == email).first() is not None
    
    def criar(self, entregador: Entregador):
        if self.check_entregador(entregador.email):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f'Erro no cadastro do email {entregador.email}')
        
        db_entregador = Entregadores(
            email=entregador.email,
            nome=entregador.nome,
            cpf=entregador.cpf,
            telefone=entregador.telefone,
            veiculo=entregador.veiculo,
            placa=entregador.placa
        )
        self.db.add(db_entregador)
        self.db.commit()
        self.db.refresh(db_entregador)
        return db_entregador
    
    def atualizar(self, email: str, entregador: Entregador):
        existing_entregador = self.db.query(Entregadores).filter(Entregadores.email == email).first()
        existing_entregador.nome = entregador.nome
        existing_entregador.cpf = entregador.cpf
        existing_entregador.telefone = entregador.telefone
        existing_entregador.veiculo = entregador.veiculo
        existing_entregador.placa = entregador.placa
        self.db.commit()
        self.db.refresh(existing_entregador)
        return existing_entregador
    
    def remover(self, email: str):
        entregador_remover = self.db.query(Entregadores).filter(Entregadores.email == email).first()
        if entregador_remover is not None:
            self.db.delete(entregador_remover)
            self.db.commit()
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Entregador não encontrado")
    
    def relatorio(self):
        return self.db.query(Entregadores).all()
       
    

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
    def remover(self, numero_cartao: str):
        cartao_remover = self.db.query(cartao_credito).filter(cartao_credito.numero_cartao == numero_cartao).first()
        if cartao_remover is not None:
            self.db.delete(cartao_remover)
            self.db.commit()
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cartão não encontrado")              
    
    
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
    def check_lojas(self, emailcheck: str):
        return self.db.query(Stores).filter(Stores.email == emailcheck).first()
    
    def criar_loja(self, loja: Lojas):
        if self.check_lojas(loja.email):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Loja já registrada")
        db_loja = Stores(email=loja.email, 
                         nome=loja.nome,
                         cnpj=loja.cnpj, 
                         endereco=loja.endereco, 
                         senha=loja.senha)
        self.db.add(db_loja)
        self.db.commit()
        self.db.refresh(db_loja)
        return db_loja   
    
    def listar(self):
        lojas = self.db.query(Stores).all()
        return lojas
    
    def remover(self, email: str):
        loja_remover = self.db.query(Stores).filter(Stores.email == email).first()
        if loja_remover is not None:
            self.db.delete(loja_remover)
            self.db.commit()
            return None
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cupom não encontrado")


class RepositorioEntregas():
    def __init__(self, db: Session):
        self.db = db
    
    def check_entrega(self, id: str):
        return self.db.query(Entregas).filter(Entregas.id == id).first() is not None

    def criar(self, entrega: Entrega):
        if self.check_entrega(entrega.id):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Entrega já existente")
        
        db_entrega = Entregas(
            id=entrega.id,
            nomeProduto=entrega.nomeProduto,
            quantidade=entrega.quantidade,
            marca=entrega.marca,
            tipoDoProduto=entrega.tipoDoProduto,
            enderecoDeEntrega=entrega.enderecoDeEntrega,
            preco=entrega.preco,
            status=entrega.status,
            emailEntregador=entrega.emailEntregador
        )
        self.db.add(db_entrega)
        self.db.commit()
        self.db.refresh(db_entrega)
        return db_entrega
    
    def relatorio(self):
        return self.db.query(Entregas).all()


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


@app.delete('/cartoes/{numero_cartao}', status_code=status.HTTP_200_OK)
def deletar_cartao(numero_cartao: str, db: Session = Depends(get_db)):
    repo = RepositorioCartao(db)
    repo.remover(numero_cartao)
    response_message = {"message": f"Cartão de número '{numero_cartao}' removido"}
    return JSONResponse(content=response_message, status_code=status.HTTP_200_OK)


@app.put('/cartoes/{numero_cartao}', response_model=credit_card)
def atualizar_cartao_existente(numero_cartao: str, card: credit_card, db: Session = Depends(get_db)):
    repo = RepositorioCartao(db)
    existing_card = repo.check_card(numero_cartao)
    
    if not existing_card:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cartão não cadastrado")
    updated_card = repo.atualizar(numero_cartao, card)
    response_message = {"message": f"Cartão de numero {numero_cartao} foi alterado"}
    return JSONResponse(content=response_message, status_code=status.HTTP_201_CREATED)


@app.post('/cupom', response_model=discount_coupom, status_code=status.HTTP_201_CREATED)
def cadastro_cupom(cupom: discount_coupom, db: Session = Depends(get_db)):
    cupom_temp = RepositorioCupoms(db).criar(cupom)
    response_message = {"message": "Cupom criado com sucesso"}
    return JSONResponse(content=response_message, status_code=status.HTTP_201_CREATED)


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
    response_message = {"message": f"Cupom de nome {nome} teve seu desconto alterado para {cupom.desconto}"}
    return JSONResponse(content=response_message, status_code=status.HTTP_201_CREATED)


@app.delete('/cupom/{nome}', status_code=status.HTTP_204_NO_CONTENT)
def deletar_cupom(nome: str, db: Session = Depends(get_db)):
    repo = RepositorioCupoms(db)
    repo.remover(nome)
    response_message = {"message": f"Cupom de nome {nome} deletado com sucesso"}
    return JSONResponse(content=response_message, status_code=status.HTTP_201_CREATED)
    

@app.post('/lojas', status_code=status.HTTP_201_CREATED)
def criar_lojas(lojas: Lojas, db: Session = Depends(get_db)):
    lojas.senha = gerarhash(lojas.senha)
    loja_criada = RepositorioLojas(db).criar_loja(lojas)
    return loja_criada

@app.delete('/lojas/{email}')
def remover_lojas(email: str, db: Session = Depends(get_db)):
    repo = RepositorioLojas(db)
    repo.remover(email)
    response_message = {"message": f"Loja de nome {email} deletada com sucesso"}
    return JSONResponse(content=response_message, status_code=status.HTTP_201_CREATED)

@app.get('/lojas')
def listar_lojas(db: Session = Depends(get_db)):
    lojas = RepositorioLojas(db).listar() 
    return lojas


@app.post('/entregadores', response_model=Entregador, status_code=status.HTTP_201_CREATED)
def criar_entregador(entregador: Entregador, db: Session = Depends(get_db)):
    entregador_temp = RepositorioEntregadores(db).criar(entregador)
    response_message = {"detail": "Entregador criado com sucesso"}
    return JSONResponse(content=response_message, status_code=status.HTTP_201_CREATED)


@app.get('/entregadores', response_model=list[Entregador], status_code=status.HTTP_200_OK)
def acessar_entregadores(db: Session = Depends(get_db)):
    repo = RepositorioEntregadores(db)
    entregadores = repo.relatorio()
    return entregadores


@app.put('/entregadores/{email}', response_model=Entregador)
def atualizar_entregador_existente(email: str, entregador: Entregador, db: Session = Depends(get_db)):
    repo = RepositorioEntregadores(db)
    existing_entregador = repo.check_entregador(email)
    
    if not existing_entregador:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Entregador não cadastrado")
    updated_entregador = repo.atualizar(email, entregador)
    return updated_entregador


@app.delete('/entregadores/{email}', status_code=status.HTTP_200_OK)
def deletar_entregador(email: str, db: Session = Depends(get_db)):
    repo = RepositorioEntregadores(db)
    repo.remover(email)
    response_message = {"detail": "Entregador removido"}
    return JSONResponse(content=response_message, status_code=status.HTTP_200_OK)


@app.post('/entregas', response_model=Entrega, status_code=status.HTTP_201_CREATED)
def criar_entrega(id: Entrega, db: Session = Depends(get_db)):
    id_temp = RepositorioEntregas(db).criar(id)
    response_message = {"detail": "Entrega criada com sucesso"}
    return JSONResponse(content=response_message, status_code=status.HTTP_201_CREATED)


@app.get('/entregas/{emailEntregador}', response_model=list[Entrega], status_code=status.HTTP_200_OK)
def acessar_entregas(db: Session = Depends(get_db)):
    repo = RepositorioEntregas(db)
    entregas = repo.relatorio()
    return entregas


@app.post("/submit_review")
async def submit_review(review: ReviewCreate):
    if review.stars < 1 or review.stars > 5:
        raise HTTPException(status_code=400, detail="Avaliações devem ser entre 1 e 5 estrelas")

    if not review.comment:
        raise HTTPException(status_code=400, detail="Comentários vazios não são permitidos")

    db_review = Review(**review.dict())
    db = SessionLocal()
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    db.close()

    return {"message": "Avaliação submetida com sucesso"}

@app.get("/get_reviews/{company}")
async def get_reviews(company: str):
    db = SessionLocal()
    company_reviews = db.query(Review).filter(Review.company == company).all()
    db.close()
    return company_reviews

@app.post('/loginlojas')
def aceitar( logindata: LoginLojas, sessions: Session =  Depends(get_db)):
        email = logindata.email
        senha = logindata.senha

        usuario_loja = RepositorioLojas(sessions).check_lojas(email) 

        if not usuario_loja: 
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail= 'Email ou senha estão incorretos')
        
        senhavalida = verificarsenha(senha, usuario_loja.senha)
        if not senhavalida:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail= 'Email ou senha estão incorretos')
        
        return usuario_loja