Feature: Buscas por filtrosss

    Os usuãrios poderão fazer buscas por reviews de músicas através de filtros de gênero, popularidade, nacionalidade e
    além de poderem escrever o nome de cantores, álbuns e músicas que querem encontrar suas respectivas reviews.

Scenario: Busca por gênero

Given o usuário “Ana” está na página de “Reviews”
And o usuário “Ana” quer achar a review de uma música do género POP
When o usuário “Ana” clica no “filtro” de busca
And o usuário “Ana” escolhe o gênero POP na categoria de “Gêneros” no filtro
Then a interface exibe os resultados filtrados de acordo com o gênero POP, mostrando as músicas e álbuns correspondentes.

Scenario: Busca por artista

Given o usuário “Ana” está na página de “Reviews”
And o usuário “Ana” quer achar a review de uma música da “Taylor Swift”
When o usuário “Ana” insere o nome da Taylor Swift em “buscar”
Then a interface apresenta os resultados filtrados, exibindo as músicas e álbuns da “Taylor Swift”

Scenario: Busca avançada com múltiplos filtros 

Given o usuário “Ana” está na página de “Reviews”
And o usuário”Ana” quer achar a review de uma música da “Taylor Swift” que é POP e está nas mais bem avaliadas
When o usuário “Ana” clica no “filtro” de busca
And o usuário “Ana” escolhe o gênero POP na categoria de “Gêneros” no filtro e clica do mais popular pro menos popular na categoria “popularidade”, buscando por “Taylor Swift” no “Buscar” 
Then os resultados são apresentados com base nos critérios escolhidos, fornecendo uma lista personalizada de músicas e álbuns da “Taylor Swift”, do mais popular para o menos popular que são do gênero POP.

Scenario: Busca por álbum

Given o usuário está na página de “em alta”
And o usuário quer achar a review de uma música da “Taylor Swift” do álbum novo dela
When o usuário “Ana” digita o nome do álbum “Lover”
And o usuário “Ana” clica da menos popular papa a mais popular na categoria “popularidade” no filtro de busca
Then a interface exibe as músicas da “Taylor Swift” do álbum “Lover” da menos popular para a mais popular

Scenario: Busca por artista inexistente

Given o usuário “Ana” está na página de “em alta”
And o usuário quer achar a review da música  “Cruel Summer”  da “Taylor Swift” do álbum “Lover”
When o usuário “Ana” insere o nome errado da “Taylor Swift” na barra de “buscar”
Then a interface exibe uma mensagem informando que o artista não foi encontrado e sugere a revisão do nome digitado ou a tentativa de uma busca por outro artista.