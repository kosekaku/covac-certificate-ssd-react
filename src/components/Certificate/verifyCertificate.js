import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import verifyCertificateService from '../../services/verifyCertificateService';
import { CertificateHeader } from './certificateHeader';
import { CertificateBio } from './certificateBio';
import NotFoundPage from '../notFoundPage';
import 'react-toastify/dist/ReactToastify.css';

const VerifyCertificate = () => {
  const [teiData, setTEIData] = useState([]);
  const [id, setId] = useState([]);
  const [apiErrors, setApiErrors] = useState(null);
  const [apiStatusCode, setApiStatusCode] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [searchParams] = useSearchParams();

  // TODO add a request interceptor
  // response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      toast('Success! Certificate verified', {
        toastId: 'success1',
      });
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      const { status } = error.response;
      const { message } = error;
      setApiErrors(message);
      setApiStatusCode(status);
      return Promise.reject(error);
    }
  );

  // hook for api services
  useEffect(() => {
    const idParam = searchParams.get('id');
    setId(idParam);
    const getApiData = async () => {
      setLoadingData(true);
      const data = await verifyCertificateService(idParam); // returns an object
      setLoadingData(false);
      if (data !== null) return setTEIData(data); //aded conditional return 04/03/2022
      setApiStatusCode(404);
    };
    getApiData();
    toast('loadin and verifying Cerificate .......', {
      toastId: '1',
    });
  }, [searchParams]);
  return (
    <>
      {(apiErrors !== null || teiData.length === 0) && (
        <>
          <NotFoundPage statusCode={apiStatusCode} />
        </>
      )}
      {!loadingData && teiData.length !== 0 && (
        <div className="black-border">
          <div className="white-border">
            <div className="red-border">
              <div className="white-border">
                <div className="green-border">
                  <div className="yellow-border">
                    <div className="blue-border">
                      <div
                        style={{
                          width: 'calc(100% - 20px) !important',
                          backgroundImage: 'url(icons/ministry.png)',
                          backgroundRepeat: 'no-repeat',
                          opacity: 0.9,
                          backgroundPosition: 'center 60%',
                          backgroundSize: '25%',
                        }}
                      >
                        <div
                          style={{
                            tableLayout: 'fixed !important',
                            width: '100% !important',
                            wordWrap: 'break-word !important',
                            wordBreak: 'break-all !important',
                            marginBottom: '0px !important',
                            backgroundColor: '#fff',
                            opacity: '0.9',
                          }}
                        >
                          <CertificateHeader />
                          <CertificateBio state={teiData} teiId={id} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default VerifyCertificate;