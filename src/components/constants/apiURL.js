const teiURL = 'https://api-covac-ssd.glitch.me/api/v1/teis';
const postPrintsURL = 'https://api-covac-ssd.glitch.me/api/v1/teis/prints';
const verifyCertURLAPI = (id) =>
  `https://api-covac-ssd.glitch.me/api/v1/teis/verify/${id}`;

//QRCODE
const verifyCertURL = (urlOrgin, teiId) =>
  `${urlOrgin}/print/verify?id=${teiId}`;

// monitor
const printsURL = 'https://api-covac-ssd.glitch.me/api/v1/teis/prints';
const loginURL = 'https://api-covac-ssd.glitch.me/api/v1/login';

export {
  teiURL,
  postPrintsURL,
  verifyCertURL,
  verifyCertURLAPI,
  printsURL,
  loginURL,
};
