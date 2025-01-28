/**
 * Formata um CNPJ para a forma XX.XXX.XXX/XXXX-XX.
 *
 * @param {string} cnpj - CNPJ a ser formatado
 *
 * @returns {string} CNPJ formatado
 */
export const formatarCNPJ = (cnpj: string): string => {
  // Remove todos os caracteres não numéricos
  const cnpjLimpo = cnpj.replace(/\D/g, '');

  // Verifica se o CNPJ tem 14 dígitos
  if (cnpjLimpo.length !== 14) {
    console.log('CNPJ inválido');
    return cnpjLimpo;
  }

  // Aplica a formatação
  return cnpjLimpo.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5',
  );
};
