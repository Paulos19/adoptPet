📱 PetAdopt
PetAdopt é um aplicativo mobile desenvolvido com Expo que conecta pessoas interessadas em adotar animais de estimação com ONGs e lares temporários. A aplicação oferece uma experiência simples, segura e prática, utilizando Firebase para persistência de dados e Clerk para autenticação.

🛠️ Tecnologias Utilizadas
React Native (via Expo)
Firebase (Firestore, Authentication, Storage)
Clerk (Autenticação e gerenciamento de usuários)
Expo (SDK para desenvolvimento mobile)
🌟 Funcionalidades
Cadastro de Usuários: Usuários podem se registrar e fazer login com segurança via Clerk.
Favoritos: Salve os pets favoritos para acompanhar as atualizações.
Cadastro de Pets: ONGs e cuidadores podem cadastrar animais para adoção.
Persistência de Dados: Informações armazenadas de forma segura no Firebase.
⚙️ Como Executar o Projeto
Pré-requisitos
Certifique-se de ter instalado:

Node.js (versão recomendada: LTS)
Expo CLI (npm install -g expo-cli)
Firebase CLI (opcional para testes avançados)
Passos
Clone o repositório:

bash
Copiar código
git clone https://github.com/Paulos19/adoptPet.git
cd petadopt
Instale as dependências:

bash
Copiar código
npm install
Configure os serviços:

Crie um projeto no Firebase Console e obtenha as credenciais do Firebase.
Configure o Clerk seguindo as instruções na documentação oficial.
Substitua os valores no arquivo config.js:

javascript
Copiar código
export const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

export const clerkConfig = {
  frontendApi: "SUA_FRONTEND_API",
};
Inicie o aplicativo:

bash
Copiar código
expo start
Teste no dispositivo:

Use o QR code exibido no terminal ou no navegador para abrir o app no Expo Go (disponível para Android/iOS).
📋 Licença
Este projeto está licenciado sob a licença MIT.
