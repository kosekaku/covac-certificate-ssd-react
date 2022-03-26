const teiURL = 'http://localhost:8000/api/v1/teis';
const postPrintsURL = 'http://localhost:8000/api/v1/teis/prints';
const verifyCertURLAPI = (id) =>
  `http://localhost:8000/api/v1/teis/verify/${id}`;

//QRCODE
const verifyCertURL = (urlOrgin, teiId) =>
  `${urlOrgin}/print/verify?id=${teiId}`;

// monitor
const printsURL = 'http://localhost:8000/api/v1/teis/prints';
const loginURL = 'http://localhost:8000/api/v1/login';

export {
  teiURL,
  postPrintsURL,
  verifyCertURL,
  verifyCertURLAPI,
  printsURL,
  loginURL,
};
