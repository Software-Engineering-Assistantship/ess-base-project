import inquirer

MAP = {
    'React ⚛️': 'frontend-react',
    'Vue.js 🔥': 'frontend-vue',
    'Angular 🅰️': 'frontend-angular',
    'Next.js 🇳': 'frontend-nextjs',
    'NodeJS 🚀': 'backend-nodejs',
    'FastAPI ⚡️': 'backend-fastAPI',
    'HTTPS 🔒': 'https://github.com/',
    'SSH 🔑': 'git@github.com:'
}

FRAMEWORKS = [
    inquirer.List(
        'frontend',
        message='Escolha um Framework de Frontend para utilizar no seu projeto:',
        choices=['React ⚛️','Vue.js 🔥','Angular 🅰️', 'Next.js 🇳'],
    ),
    inquirer.List(
        'backend',
        message='Escolha um Framework de Backend para utilizar no seu projeto:',
        choices=['NodeJS 🚀','FastAPI ⚡️'],
    ),
    inquirer.List(
        'key',
        message='Deseja clonar os repositórios pelo GitHub via:',
        choices=['HTTPS 🔒','SSH 🔑'],
    ),
]
