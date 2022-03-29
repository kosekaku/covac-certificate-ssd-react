const host = process.env.REACT_APP_HOST
const teiURL = `${host}/api/v1/teis`;
const postPrintsURL = `${host}/api/v1/teis/prints`;
const verifyCertURLAPI = (id) =>
  `${host}/api/v1/teis/verify/${id}`;

//QRCODE
const verifyCertURL = (urlOrgin, teiId) =>
  `${urlOrgin}/print/verify?id=${teiId}`;

// monitor
const printsURL = `${host}/api/v1/teis/prints`;
const loginURL = `${host}/api/v1/login`;

export {
  teiURL,
  postPrintsURL,
  verifyCertURL,
  verifyCertURLAPI,
  printsURL,
  loginURL,
};
