import { message } from "antd";
import axios, { formHeaderHandler, resNotification } from "./axios";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

message.config({ duration: 5, maxCount: 1 });

export const imageValidationProduct = (file, name, url, method, setLoading) => {
  const formData = new FormData();
  formData.append(name, file);
  
  let promise = new Promise((resolve, reject) => {
    setLoading(true);

    axios[method](url, formData, formHeaderHandler())
      .then(res => {
        console.log(res.data)
        resolve(file);
        setLoading(false);
      })
      .catch(err => {
        const signature_exp = "Signature has expired"
        const errDetail = err.response.data.detail;
        console.log(err.response)
        if(errDetail == signature_exp){
          setLoading(false);
          resolve(file);
          // axios[method](url, formData, formHeaderHandler())
          //   .then(res => {
          //     resolve(file);
          //     setLoading(false);
          //   })
          //   .catch(err => {
          //     const errDetail = err.response.data.detail;
          //     axios.delete("/users/delete-cookies")
          //     setLoading(false);
          //     if(typeof errDetail === "string"){
          //       reject(file);
          //       message.error({ 
          //         content: err.response.data.detail, 
          //         style: { marginTop: '10vh' },
          //       });
          //     } else {
          //       resolve(file);
          //     }
          //   })
        } 
        else {
          setLoading(false);
          if(typeof errDetail === "string"){
            reject(file);
            message.error({ 
              content: errDetail, 
              style: { marginTop: '10vh' },
            });
          } else {
            resolve(file);
          }
        }
      })
  })
  return promise;
}

