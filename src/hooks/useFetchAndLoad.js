import { useEffect, useState } from "react";

const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false);
  let controller = new AbortController();

  const callEndpoint = async (axiosCall) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setLoading(true);
    let result = {};

    try {
      result = await axiosCall.call;
    } catch (err) {}
    setLoading(false);

    return result;
  };

  /*const callEndpoint = async (axiosCall) => {
      if(axiosCall.control) controller = axiosCall.control;
      setLoading(true);
        let result = {};
        
        try{
          switch (axiosCall.type) {
            case 'post':
              result = await AxiosInstance.post(axiosCall.url, axiosCall.data, {signal: axiosCall.signal});
              break;
            case 'get':
              result = await AxiosInstance.get(axiosCall.url, {signal: axiosCall.signal});
              break;
            case 'put':
            
              break;
            case 'delete':
            
              break;
            default:
              break;
          }
        }catch(err) {}
        setLoading(false);

        return result;
    }*/

  const cancelEndpoint = () => {
    setLoading(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, []);

  return { loading, callEndpoint, setLoading };
};

export default useFetchAndLoad;
