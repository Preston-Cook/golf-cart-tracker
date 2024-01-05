export default function isValidPhone(s: string) {
  return s.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g);
}
