export function hasOnlyText(text: string) {
  const textReg = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
  return textReg.test(text);
}
