# Portefólio 3D Interativo: Desenvolvimento de Jogos e VR

## Arquitetura de Sistema
Este repositório contém o código-fonte de um portefólio 3D interativo, concebido sob uma arquitetura híbrida e estrita de dupla camada (WebGL + DOM). O motor 3D atua puramente como uma demonstração técnica interativa, enquanto a Interface de Utilizador (UI) reside integralmente no DOM. Esta separação garante acessibilidade zero-atrito, indexação (SEO) eficaz e elimina o estrangulamento de performance típico de interfaces desenhadas em WebGL puro.

## Stack Tecnológica e Otimização Extrema

* **Framework Core:** React 19 + TypeScript. A tipagem estrita é inegociável para garantir a estabilidade das matrizes de transformação, estados de UI e matemática vetorial 3D no *render loop*. Compilação gerida pelo **Vite** para HMR determinístico.
* **Motor de Renderização:** Three.js via React Three Fiber (R3F). O R3F opera como um reconciliador, gerindo de forma declarativa a alocação e destruição de geometria na VRAM.
* **Animação & Easing:** GSAP (GreenSock). Substitui a matemática manual de `requestAnimationFrame` por funções de interpolação não-linear para transições de câmara.
* **Pipeline de Assets 3D:** Modelos em formato `.glb`. Utilização mandatória da diretiva `useGLTF.preload` ao nível do módulo para forçar o *caching* na RAM antes da instanciação do componente, eliminando a latência visual (*Jank*) durante a montagem de nós.

## Estrutura de Dados & Implementação Atual

### Fundação & Gestão de Estado (`App.tsx`)
* **Retenção de Estado (GPU Warm-up):** A renderização condicional clássica (montagem/desmontagem de modais) foi expurgada. Todos os componentes que contêm contextos `<Canvas>` são injetados no carregamento inicial da aplicação. A alternância de secções é controlada estritamente por oclusão de *hardware acceleration* via CSS (`opacity`, `visibility`, `pointer-events`), mantendo a *pipeline* gráfica permanentemente "quente" e reduzindo a latência de interação a 0ms.
* **Oclusão de Raycast:** Implementação de uma máquina de estados booleana (`interactionEnabled`) que monitoriza o foco da janela do sistema operativo (eventos `blur`/`focus`) e o estado da UI. Quando um painel está aberto ou a janela perde o foco, o *raycasting* do CPU para intersecção de geometria 3D é sumariamente bloqueado, poupando ciclos de computação.

### Camada WebGL (`src/components/canvas`)
* **Geometria Orbital Determinística:** Os vetores planetários são distribuídos utilizando projeção trigonométrica estrita ($r=8.5$, $\theta = n \cdot 60^\circ$). Isto estabiliza a disposição em anel, prevenindo distorção de FOV da câmara.
* **Sistema de Frota Espacial (`SpaceShips.tsx`):** Gestão de entidades dinâmicas recorrendo a um sistema matemático de *Wrap-around*. O modelo instancia as posições e rotações com base em `THREE.Euler` aleatórios (`MathUtils.randFloatSpread`) e utiliza o translação direta sobre o eixo Z local do pivô de voo (`translateZ()`), mitigando o uso exaustivo de matemática de rotação vetorial por *frame*. As colisões de fronteira reciclam coordenadas instantaneamente nos antípodas cartesianos para um fluxo contínuo sem realocação de memória na *Garbage Collector*.
* **Lockdown da Câmara:** O `OrbitControls` opera como uma máquina de estados passiva. A auto-rotação é suspensa no milissegundo em que uma secção é ativada (`activeSection`), congelando o sistema de coordenadas para entregar vetores limpos ao GSAP.
* **Interpolação no Render Loop (`Planet.tsx`):** A escala de *hover* utiliza `lerp` sincronizado com o *delta time* diretamente no `useFrame`. Isto muta a matriz 3D contornando o ciclo de vida do React, garantindo *framerate* constante.
* **FSM de Animação de Personagem (`ContactCharacter.tsx`):** O controlo de esqueletos 3D (Bones) é governado por uma Máquina de Estados Finitos (`enum`). Animações terminais sofrem alteração explícita do modo de repetição na API do Three.js (`THREE.LoopOnce` e `clampWhenFinished = true`), evitando repetições indesejadas originadas pelo ficheiro base.

### Camada DOM (`src/components/dom`)
* **Isolamento Espacial Absoluto:** Painéis UI utilizam ancoragem geométrica rígida (`top: 8rem` e `max-height: calc(100vh - 10rem)`) no lugar de translações dinâmicas de eixo. Isto elimina colisões com o *offset* da Navbar e garante a integridade da *scrollbar* interna sem causar *layout thrashing*.
* **Integridade do Flexbox (`Navbar.css` e Footer):** O rodapé e elementos de navegação operam sob restrições espaciais transversais utilizando contentores *Flex* para prevenir desalinhamento de créditos (Quaternius, Poly Pizza) sob redimensionamento agressivo.
* **Notificações UI Desacopladas (`Contact.tsx`):** O *feedback* de submissão do formulário renderiza numa camada *Toast* sobreposta, impulsionada por *keyframes* CSS na GPU.

## Próximos Passos / Roadmap

* **Interpolação de Câmara (GSAP):** Intercetar o vetor `worldPosition` emitido pelo evento `onClick` nos modelos `<Planet />` para executar transições espaciais não-lineares determinísticas.
* **Gestão do Evento de Fecho (Toggle):** Configurar o GSAP para escutar a anulação do estado `activeSection` e reverter suavemente a câmara para as coordenadas de origem global (`x: 0, y: 2, z: 20`).

## Execução Local & Deployment (Vercel CLI)

A utilização do servidor nativo do Vite (`npm run dev`) é inaceitável, pois é incapaz de emular as *Serverless Functions* da diretoria `/api`. Para garantir a integridade entre o *frontend* e a API da Resend, o uso da **Vercel CLI** é obrigatório.

```bash
# 1. Instalar dependências
npm i -g vercel
npm install

# 2. Autenticar e ligar o projeto local
vercel login
vercel link

# 3. Sincronizar Variáveis de Ambiente
vercel env pull .env.local

# NOTA: O ambiente de desenvolvimento exige a configuração das credenciais Resend:
# RESEND_API_KEY=re_chave_gerada
# DESTINATION_EMAIL=email_autorizado_na_sandbox

# 4. Iniciar o servidor de desenvolvimento unificado
vercel dev