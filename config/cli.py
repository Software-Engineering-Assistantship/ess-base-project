import select
import sys
import time
import inquirer
import platform
import os

from constants import MAP, FRAMEWORKS

def create_clickable_link(url, text):
    return f'\033]8;;{url}\033\\{text}\033]8;;\033\\'

def clear():
    if platform.system() == 'Windows':
        os.system('cls') or None
    else:
        os.system('clear') or None

def wait_and_clear(s=1):
    wait(s)
    clear()
    print()

def wait(s=1):
    time.sleep(s)

def typing_effect(message, delay=0.02):
    index = 0
    if platform.system() == 'Windows':
        import msvcrt

        for char in message:
            sys.stdout.write(char)
            sys.stdout.flush()
            if msvcrt.kbhit() and msvcrt.getch() == b'\r':
                sys.stdout.write('\033[F')
                sys.stdout.write(' 🗂  🛠  ')
                sys.stdout.write(message)
                sys.stdout.flush()
                return
            time.sleep(delay)
            index += 1
    else:
        for char in message:
            print(char, end='', flush=True)
            if sys.stdin in select.select([sys.stdin], [], [], 0)[0]:
                if sys.stdin.readline().strip() == '':
                    print('\033[F', end='', flush=True)
                    print(' 🗂  🛠  ', end='')
                    print(message)
                    return
            time.sleep(delay)
            index += 1
    print()

def add_subtree(framework, key, folder):
    url = f'{MAP[key]}Software-Engineering-Assistantship/{MAP[framework]}-ess.git'
    os.system(f'git subtree add --prefix {folder} {url} main --squash')

if __name__ == '__main__':
    clear()
    print('\n 🗂  🛠  ', end='')
    
    while(True):
        typing_effect('Olá! Seja bem vindo à CLI para criação do seu projeto base!')

        answers = inquirer.prompt(FRAMEWORKS)

        backend = answers['backend']
        frontend = answers['frontend']
        key = answers['key']

        typing_effect(f"""Você escolheu: 
        -> Frontend: {frontend}
        -> Backend: {backend} 
        -> Clone via: {key} """)

        answers = inquirer.prompt([
            inquirer.Confirm('are_you_sure', message='⚠️  Tem certeza?')
        ])

        if answers['are_you_sure']:
            link = create_clickable_link('https://www.atlassian.com/br/git/tutorials/git-subtree', 'clique aqui')

            typing_effect(' 🫡 Entendido!')

            wait_and_clear(4)

            typing_effect("O seu projeto será criado utilizando o conceito de 'Subtree' do Git. 🌳")
            typing_effect('Isso significa que ele será composto por uma cópia de dois repositórios, um frontend e um backend. 📂')
            typing_effect('Esses repositórios serão clonados para dentro do seu projeto, em pastas separadas.')
            
            wait(1)
            
            typing_effect('Mas ok, vamos lá! Chega de explicações... vou criar logo o seu projeto base! ⌛️ \n\n')

            wait(3)

            add_subtree(frontend, key, 'frontend')
            add_subtree(backend, key, 'backend')

            wait_and_clear(4)

            typing_effect("Parabéns! Seu projeto foi criado com sucesso! 🎉\nVocês já podem começar a trabalhar nele! 💻🚀")

            wait_and_clear(4)

            typing_effect("Os commits já foram feitos para vocês, então não precisam se preocupar com isso.\nSe quiserem, podem dar uma olhada! 👀")
            typing_effect("É só utilizar o comando 'git log' para ver o histórico de commits. 📜")
            typing_effect("Então, para publicar as novidades que acabaram de ser adicionadas no seu projeto, basta dar um 'git push'. 📤")

            wait(1)

            typing_effect("\nEnfim, se tiverem alguma dúvida, podem nos chamar! O time de monitoria está aqui para ajudar vocês! 🤓🤝")
            typing_effect("E se tiverem alguma sugestão de melhoria, podem nos dizer também. 🤩")
            typing_effect("Espero que o seu projeto seja um sucesso! 👌")
            
            wait(1)

            typing_effect("\nMas de agora em diante... que a força esteja com vocês! 🪐💪✨")

            wait(2)

            typing_effect(f"\n\nPara mais informações sobre as subtrees do Git, segure 'ctrl' e {link}! 📚 ")
            typing_effect("\nAté mais! 👋")
            
            wait(2)
         
            break
        else:

            answers = inquirer.prompt([
                inquirer.Confirm(
                    'exit', 
                    message=f'🚪  Deseja sair?')
                ])
            
            if answers['exit']:
                typing_effect('Saindo... Até mais! 👋')
                wait()
                exit()
        
            typing_effect('Reiniciando CLI... 🔄')
            wait(2)
            clear()
            continue
