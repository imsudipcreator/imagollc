export function nameShortener(fullname: string) {
  const firstname = fullname.split(" ")[0];
  const lastname = fullname.split(" ")[1];
  const firstLetter = firstname?.split("")[0];
  const lastLetter = lastname?.split("")[0];

  if (firstLetter && lastLetter) {
    return firstLetter + lastLetter;
  } else {
    return "NN";
  }
}
