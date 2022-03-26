import http from './httpServices'
import { verifyCertURLAPI } from '../components/constants/apiURL';
// verify certifcate with the links provided in the QRCODE
const verifyCertificateService = async (id) => {
    const url = verifyCertURLAPI(id);
    const {status, data: results} = await http.get(url);
    const { data } = results;
    // TODO GET Astrazeneca with 2 doses, dont print with one dose only
    return data;    
};
  
export default verifyCertificateService;