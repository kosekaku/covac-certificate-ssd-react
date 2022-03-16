import http from './httpServices'

// verify certifcate with the links provided in the QRCODE
const verifyCertificateService = async (id) => {
    const verifyUrl = `https://southsudanhis.org/covid19southsudan/api/trackedEntityInstances/${id}.json?ou=OV9zi20DDXP&ouMode=DESCENDANTS&program=yDuAzyqYABS&programStage=a1jCssI2LkW&lastUpdatedStartDate=2021-08-01&lastUpdatedEndDate=2022-01-19&fields=trackedEntityInstance,attributes[attribute,value],enrollments[program,orgUnit,events[status,enrollmentStatus,eventDate,orgUnitName,programStage,dataValues[dataElement,value]]]&pageSize=1&page=`;
    const verifyUrlLocal = `http://localhost:8000/api/v1/teis/verify/${id}`;
    const {status, data: results} = await http.get(verifyUrlLocal);
    const { data } = results;
    // TODO>>>>>>>>> GET Astrazeneca with 2 doses, dont print with one dose only
    return data;    
};
  
export default verifyCertificateService;