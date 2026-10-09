# Missão dos Números — página de vendas

Página em português brasileiro, com preço fixo de R$ 27,90, adaptada a celular e computador. Abra `dist/index.html` para visualizar a cópia local ou use o endereço hospedado fornecido no chat.

## O que está pronto

- Apresentação da oferta para pais e responsáveis.
- Cinco cadernos com seletor por idade e navegação pelo teclado.
- Imagens reais das capas e amostras ampliáveis, extraídas dos PDFs fornecidos.
- Benefícios, instruções de uso, conteúdo da coleção e perguntas frequentes.
- Oferta de pagamento único de R$ 27,90, sem desconto fictício, depoimentos inventados ou contagem regressiva.
- Botão fixo de oferta no celular, foco visível, redução de movimento e janelas fecháveis com Escape.

## Ativar o pagamento

O checkout ainda não foi fornecido. O botão abre uma mensagem honesta de vendas ainda não iniciadas e oferece as amostras.

Quando existir um checkout HTTPS válido, preencha `checkoutUrl` em `dist/config.js`. A página passará a encaminhar o comprador para esse endereço. Publique novamente após a alteração. O preço configurado na plataforma de pagamento deve ser R$ 27,90.

A página não processa pagamentos, não coleta contatos e não entrega os PDFs. Configure a entrega na plataforma de pagamento. Os PDFs integrais não estão na pasta pública: somente capas e amostras do produto.

## Antes do lançamento comercial

O próprio LEIA-ME e a página 2 do guia fornecido registram que o produto ainda precisa de teste de uso com crianças e revisão pedagógica. A página não afirma validação pedagógica ou resultados garantidos. Conclua essa revisão e confirme o conteúdo antes de ativar a venda. Uma conferência inicial também encontrou no guia, missão 04 do caderno 1, item 2, a resposta “Grupo A” ao lado de “A tem 3; B tem 4”; esse item merece revisão no contexto da atividade. Os arquivos originais não foram alterados.

Adicione a identificação real do vendedor, contato de suporte e condições de compra, entrega, uso e reembolso conforme definidos para a operação. Não foram inventados dados comerciais nem garantias. A prévia hospedada começa privada e pode ser revisada antes da divulgação.

## Conteúdo confirmado nos arquivos

São cinco cadernos de 65 páginas cada e um guia de 82 páginas, totalizando 407 páginas. Cada caderno tem 60 páginas de atividades, para 300 páginas de atividades no conjunto. O LEIA-ME informa 1.359 propostas numeradas. Cada caderno trabalha 20 temas em três etapas; não são 300 tipos diferentes de atividade.

## Arquivos

- `dist/index.html`: conteúdo da página.
- `dist/styles.css`: visual e adaptação às telas.
- `dist/app.js`: seletor, amostras, janelas e encaminhamento ao checkout.
- `dist/config.js`: endereço do checkout.
- `dist/assets`: imagens extraídas do produto e ícone da página.

As fontes Manrope e DM Sans são carregadas pelo Google Fonts; se não houver conexão, a página usa fontes locais de substituição.

## Atualização da página

- As menções a PDF foram removidas da página e dos metadados.
- A apresentação principal agora usa a capa ilustrada `dist/assets/capa-ilha-dos-enigmas.png`, gerada para esta página. Os cadernos originais permanecem como amostras reais nas demais seções.
- A seção “Cabe na sua rotina” foi removida.
- O primeiro bloco do conteúdo é um espaço 16:9 para a VSL (`#vsl-slot`). Substitua seu conteúdo pelo vídeo ou código de incorporação quando estiver disponível. Não existe vídeo, reprodução ou rastreamento implementado nesse espaço atualmente.
- A barra móvel usa fundo verde, botão em verde-lima, preço de R$ 27,90 e CTA “Quero essa aventura”.

As condições comerciais permanecem as descritas acima. O checkout ainda não foi conectado.

## Galerias e reorganização

O título, a descrição e os selos agora aparecem acima da VSL. O botão e a capa ficam abaixo dela. Cada uma das cinco faixas etárias tem cinco imagens reais: capa e atividades das páginas 5, 9, 14 e 22. No computador, as imagens aumentam ao passar o mouse; por clique ou toque, abrem em tamanho maior. As setas do teclado continuam alternando as faixas etárias.

Os recursos de apoio ao adulto foram movidos para junto da oferta. A seção anterior agora contém três feedbacks demonstrativos, identificados como exemplos fictícios e não como depoimentos reais. Substitua-os por avaliações verificadas quando estiverem disponíveis, preservando a autorização de uso.

## Perfis demonstrativos

A seção de feedbacks agora apresenta três personagens fictícios, retratos gerados por IA, estrelas de demonstração e textos em primeira pessoa. Todos os cartões e o texto da seção identificam os exemplos como demonstrativos. As imagens não representam clientes reais; as notas não integram uma média real de avaliações. Troque por depoimentos autorizados e verificáveis antes de usar essa seção como prova social real.
