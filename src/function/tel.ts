/**
 * Formata um número de telefone para o padrão brasileiro.
 *
 * - Para números com 10 dígitos, o formato é (99) 9999-9999.
 * - Para números com 11 dígitos, o formato é (99) 99999-9999.
 * - Se o número tiver outro tamanho, ele será retornado original.
 *
 * @param {string} numero - Número de telefone a ser formatado.
 *
 * @returns {string} Número de telefone formatado.
 */
export const MascTel = (numero: string): string => {
  // Remove todos os caracteres não numéricos
  const numeroLimpo = numero.replace(/\D/g, '');

  // Verifica se o número tem 10 ou 11 dígitos
  if (numeroLimpo.length === 10) {
    // Formato para números com 10 dígitos: (99) 9999-9999
    return numeroLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (numeroLimpo.length === 11) {
    // Formato para números com 11 dígitos: (99) 99999-9999
    return numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
    // Retorna o número original se não tiver 10 ou 11 dígitos
    return numero;
  }
};
