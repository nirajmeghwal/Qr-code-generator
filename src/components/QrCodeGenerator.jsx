import { useState,useRef } from "react";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
function QrCodeGenerator(){
    const [url,setUrl]=useState("");
    const [isQrVisible,setIsQrVisible]=useState(false);
    const handleQrCodeGenerator=()=>{
        if(!url){
            return;
        }
        setIsQrVisible(true);
    };
    const qrCodeRef=useRef(null);
    const downloadQRCode=()=>{
       if(qrCodeRef.current){
        htmlToImage.toPng(qrCodeRef.current).then(
            function(dataUrl){
                const link=document.createElement("a");
                link.href=dataUrl;
                link.download="qr-code.png";
                link.click();
            }
        )
        .catch(function(error){
            console.error("Error generating QR code:",error);
        })
       }
    };

    return(
        <div className="qrcode-container">
              <h1>Qr Code Generator</h1>
              <div className="qrcode-container-parent">
                <div className="qrcode-input">
                    <input type="text" placeholder="Enter a URL" value={url} onChange={(e)=>setUrl(e.target.value)} />
                    <button onClick={handleQrCodeGenerator}>Generate QR Code</button>
                </div>
                <div>
                    {isQrVisible && (
                        <div className="qrcode-download">
                            <div className="qrcode-image"  ref={qrCodeRef}>
                                <QRCode value={url} size={300}></QRCode>
                            </div>
                            <button onClick={downloadQRCode}>Download QR Code</button>
                        </div>
                    )}
                </div>
              </div>
        </div>
    );
}
export default QrCodeGenerator;
