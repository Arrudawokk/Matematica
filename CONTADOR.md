# Contador da oferta

Prazo de 80 minutos iniciado na primeira visita, salvo no localStorage deste navegador. Recarregar, reabrir e alternar entre abas não concede um novo prazo. A contagem usa o horário de término e o relógio atual, inclusive após suspensão da aba.

Ao zerar, a faixa informa o encerramento, o botão de compra fica desabilitado e o clique verifica novamente o prazo antes de encaminhar ao checkout. Não há reinício automático. Se o armazenamento não estiver disponível, a faixa comum aparece sem anunciar um prazo que não poderia ser preservado.

O controle é local por navegador e domínio, sem identificação da pessoa. Limpar os dados, usar modo privado, mudar de navegador ou dispositivo pode iniciar outro prazo. O checkout ainda não está configurado. Para impedir compras diretas fora do prazo quando estiver ativo, a mesma regra deve ser validada no servidor/plataforma de pagamento; este site estático controla apenas seus próprios botões.

Testes: `node --test tests/*.test.cjs`.
