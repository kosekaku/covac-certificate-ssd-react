import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { CertificateHeader } from './certificateHeader';
import { CertificateBio } from './certificateBio';
import NotFoundPage from '../notFoundPages/notFoundPage';
import LoadingIndicator from '../Helpers/loadingIndicator';
import verifyCertificateService from '../../services/verifyCertificateService';
import 'react-toastify/dist/ReactToastify.css';

const VerifyCertificate = () => {
  const [teiData, setTEIData] = useState([]);
  const [id, setId] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchParams] = useSearchParams();

  // hook for api services
  useEffect(() => {
    const idParam = searchParams.get('id');
    setId(idParam);
    const getApiData = async () => {
      setLoadingData(true);
      const data = await verifyCertificateService(idParam); // returns an object
      if (data !== undefined){
        setLoadingData(false);
        toast.success('Certificate Successfully Verified');
        return setTEIData(data);
      } else{
        setLoadingData(false);
        toast.error('Certificate can not be verified');
      }
    };
    getApiData();
    
  }, [searchParams]);
  return (
    <>
    {loadingData && <LoadingIndicator message="Searching and Verifying Certificate"/>}
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
      {(!loadingData && teiData.length===0 ) && (
        <>
          <NotFoundPage statusCode={404} />
        </>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
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