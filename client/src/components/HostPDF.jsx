import { useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
const HostPDF = () => {
  const URL = "https://pdf-hosting-platform.onrender.com";
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState();
  const [isLoading, setIsloading] = useState("");

  const handleFileChange = (e) => {
    //getting pdf file from the input field
    const file = e.target.files[0];
    console.log("fullFile-", e.target.files[0]);
    console.log("file-", file);
    setSelectedFile(file);
  };

  //   uploading file to the server
  const UploadFile = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(`${URL}/upload`, formData);
      console.log(response);
      if (response.status === 200) {
        setDownloadLink(response.data);
        setIsloading("");
      }
    } catch (error) {
      console.log("error for api call", error);
    }
  };
  return (
    <>
      <div className=" fixed w-full h-[100vh] ">
        <header>
          <div className=" w-full  py-4 text-3xl px-6 font-semibold">
            Host PDF
          </div>
        </header>

        <div className="main flex justify-between rounded-md shadow-lg  bg-slate-200 max-h-[500px] px-6 mt-6 mx-6 mr-10 py-4">
          <div className="  w-full">
            <div className=" text-5xl font-semibold py-4 ">
              Host you PDF online
            </div>
            <div className=" py-6 font-semibold text-2xl">
              Host PDF documents online <br /> and share with anyone with
              generated links
            </div>
            <div className="w-[250px] ml-56 flex flex-col gap-4 ">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md flex  justify-center"
              >
                Choose a PDF
              </label>
              <input
                type="file"
                accept=".pdf"
                id="file-upload"
                encType="multipart/form-data"
                className="hidden"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <p className="text-blue-500">{selectedFile.name}</p>
              )}

              <button
                className=" px-6 py-2 bg-blue-700 rounded-md  "
                onClick={() => {
                  UploadFile();
                  setIsloading(true);
                }}
              >
                {isLoading ? " Uploading" : "Upload"}
                <span>
                  {isLoading ? (
                    <BeatLoader loading size={6} color="#fff" />
                  ) : (
                    ""
                  )}
                </span>
              </button>
            </div>
          </div>
          <div className=" relative flex flex-col items-center justify-center rounded-md shadow-lg   w-full py-10  bg-yellow-200">
            <div className="absolute top-3 font-semibold text-3xl">
              Generated Link
            </div>
            <div className=" text-blue-500 underline">
              <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                {downloadLink}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostPDF;
