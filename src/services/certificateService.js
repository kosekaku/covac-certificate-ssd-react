import http from './httpServices'
import { useQuery } from 'react-query';

// get tracked entity instance 
const certificateTEI = async (
      vaccineCenter,
      lastUpdatedStartDate,
      lastUpdatedEndDate,
      phoneEntered,
      uniqueId,
      pageSize,
) => {
try {

  const urlProd = `https://southsudanhis.org/api/trackedEntityInstances.json?ou=${vaccineCenter}&ouMode=DESCENDANTS&program=yDuAzyqYABS&programStage=a1jCssI2LkW&lastUpdatedStartDate=${lastUpdatedStartDate}&lastUpdatedEndDate=${lastUpdatedEndDate}&fields=trackedEntityInstance,attributes[attribute,value],enrollments[program,orgUnit,events[status,enrollmentStatus,eventDate,orgUnitName,programStage,dataValues[dataElement,value]]]&pageSize=${pageSize}&page=`;
  const urlDev = `https://southsudanhis.org/covid19southsudan/api/trackedEntityInstances.json?ou=${vaccineCenter}&ouMode=DESCENDANTS&program=yDuAzyqYABS&programStage=a1jCssI2LkW&lastUpdatedStartDate=${lastUpdatedStartDate}&lastUpdatedEndDate=${lastUpdatedEndDate}&fields=trackedEntityInstance,attributes[attribute,value],enrollments[program,orgUnit,events[status,enrollmentStatus,eventDate,orgUnitName,programStage,dataValues[dataElement,value]]]&pageSize=${pageSize}&page=`;
  const urlLocal = 'http://localhost:8000/api/v1/teis';
  const urlOU = 'http://localhost:8000/api/v1/facilities';
  const results = await http.get(urlLocal,{
    params: {
      organizationUnit: vaccineCenter ,
      lastUpdatedStartDate,
      lastUpdatedEndDate,
      phone: phoneEntered,
      uniqueId,
      pageSize,
    },});

   if(!results && ! results.data.data) return console.log("failed to fetch data");
   const {status, message, data} = results.data;
   if(status!== 200) console.log("data fetching failed");
   return data;
  
} catch (error) {
  console.log('Data fetching Error occured while fetching data', error)
}
};

//get organization units
const useOrgUnits = () => {
  const urlDev = 'https://southsudanhis.org/covid19southsudan/api/33/programs/yDuAzyqYABS/organisationUnits?fields=id, name, level,ancestors[id, name, level] ';
  const urlLocal = 'http://localhost:8000/api/v1/facilities';

  const {
    isLoading,
    isFetched,
    isFetching,
    isStale,
    isSuccess,
    dataUpdatedAt,
    isIdle,
    isLoadingError,
    status,
    error,
    data,
  } = useQuery('OUData1', async () => {
    return await http.get(urlLocal);
  });
  const loadingSwitch = true; //
  return { isLoading, loadingSwitch, error, data };
};

// send printed certificate data to server for tracking 

const postPrints = async (data1) => {
  const url  = 'http://localhost:8000/api/v1/teis/prints'
  const results  = await http.post(url,data1);
  if(!results && !results.data.data) throw new  Error('Error login failed');
  const {status, message, data} = results.data;
if(status!== 200) throw new  Error('Error login failed');
return message;
}

export { certificateTEI, useOrgUnits, postPrints };