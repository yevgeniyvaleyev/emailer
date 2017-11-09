export function removeItemFromList<T> (list: T[], index: number): T[] {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ]
}

export function getAge(birthDateString: string): number {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  var month = today.getMonth() - birthDate.getMonth();
  const isBeforeBirthDay = month < 0 || (month === 0 && today.getDate() < birthDate.getDate());
  if (isBeforeBirthDay) {
      age--;
  }
  return age;
}
