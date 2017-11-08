export default function getBaseUrl(){
  const isDeveloopment = window.location.hostname === 'localhost';
  return isDeveloopment ? 'http://localhost:3001/' : '/';
}
