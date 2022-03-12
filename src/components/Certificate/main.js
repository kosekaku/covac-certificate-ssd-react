import React, { useRef } from 'react';
import { CertificateHeader } from './certificateHeader';
import { CertificateBio } from './certificateBio';
import { useNavigate, useLocation } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import './main.css';

// Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
// the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
// https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components

export const ComponentToPrint = React.forwardRef((props, ref,) => {
  const componentRef = useRef();
  const navigate = useNavigate();
  const {state: printData} = useLocation();
  const state = printData.data;
  const {teiId} = printData;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div >
      <div style={{margin: '10px'}}>
                          <button
                            className="btn btn-secondary"
                            large
                            secondary
                            style={{ margin: '10px 1px 1px 0px' }}
                            onClick={()=> navigate(-1)}
                          >
                            Go Back
                          </button>
                          <button 
                           className="btn btn-secondary"
                            large
                            secondary
                            style={{ margin: '10px 1px 1px 3px'}}
                            onClick={handlePrint}
                          >
                            Print
                          </button>
                        </div>
      <div className="black-border" ref={componentRef}> {/* ref to print, */}
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
                        //marginTop:"20%"
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
                        <CertificateHeader  />
                        <CertificateBio state={state} teiId={teiId} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});


