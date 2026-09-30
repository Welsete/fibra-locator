# Localizador de Fibra

PWA para técnicos de campo de fibra óptica (FTTH) localizarem rapidamente uma fibra dentro dos pontos de emenda, a partir da designação.

**Acesse:** https://welsete.github.io/fibra-locator/

## O problema

No trabalho de campo, encontrar em qual ponto de emenda e em qual grupo de cores está uma fibra específica exige conferir faixas e tabelas de cores na mão, muitas vezes na rua, no poste e com pouca luz. Criei este app quando trabalhava como técnico de instalação FTTH para deixar essa consulta mais rápida e com menos chance de erro.

## Funcionalidades

- **Cadastro de pontos de emenda** com a faixa de fibras que cada um atende
- **Busca pela fibra designada**: informe o número da fibra e escolha o ponto de emenda para ver onde ela está
- **Cores da caixa**: mostra a cor do grupo e a cor da fibra seguindo o padrão de cores (grupos de 8 fibras)
- **Lanterna integrada** para usar à noite ou em locais escuros
- **Funciona offline** depois da primeira abertura
- **Instalável** na tela inicial do celular ou do computador, como um app

## Tecnologias

- HTML, CSS e JavaScript puro, sem frameworks
- PWA: `manifest.json` e Service Worker (`sw.js`) para instalação e uso offline
- `localStorage` para salvar os dados no próprio aparelho (sem servidor)
- Hospedagem no GitHub Pages

## Como instalar

Abra o link no celular e use a opção **"Adicionar à tela inicial"** do navegador. O passo a passo para Android, iPhone, Windows e Mac está em [tutorial.html](https://welsete.github.io/fibra-locator/tutorial.html).

## Rodando localmente

```bash
git clone https://github.com/Welsete/fibra-locator.git
cd fibra-locator
python -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador. O Service Worker precisa de um servidor local, por isso abrir o `index.html` direto pelo arquivo não funciona por completo.

## Estrutura

```
fibra-locator/
├── index.html      # App (interface e lógica)
├── tutorial.html   # Tutorial de instalação
├── manifest.json   # Configuração do PWA
├── sw.js           # Service Worker (cache e modo offline)
└── icon.svg        # Ícone do app
```

## Autor

Feito por **Wellerson Tavares Cordeiro**, estudante de Análise e Desenvolvimento de Sistemas.

[LinkedIn](https://linkedin.com/in/welsete) · [GitHub](https://github.com/welsete)
