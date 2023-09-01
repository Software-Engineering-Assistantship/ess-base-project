from sqlalchemy.orm import *
from backend.src import models
from backend.src.schemas import classes

class RepositorioCartao():
    def __init__(self, db: Session):
        self.db = db
    def criar(self, card: models.credit_card):
        db_cartao = classes.cartao_credito(nome=card.nome, numero_cartao = card.numero_cartao, cvv = card.cvv, validade = card.validade)
        self.db.add(db_cartao)
        self.db.commit()
        self.db.refresh(db_cartao)
        return db_cartao
    def relatorio(self):
        cartoes = self.db.query(models.credit_card).all()
        
        