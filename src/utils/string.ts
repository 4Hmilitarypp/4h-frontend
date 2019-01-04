export const trimToLength = (characterLength: number, str: string) => {
  const short = str.slice(0, characterLength)
  return str.length > characterLength ? short.slice(0, short.lastIndexOf(' ')) : str
}
