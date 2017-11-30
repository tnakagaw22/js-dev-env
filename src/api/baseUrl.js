export default function getBaseUrl(){
  return getQueryStringParameterByName('useMockApi') ? 'http://localhost:3001/' : '/';

  /* eslint-disable no-console */
  // to use mock API : http://localhost:3000/?useMockApi=true
  // to use production (express) : http://localhost:3000
}

function getQueryStringParameterByName(name, url){
  if (!url) url = window.location.href;
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(url);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
