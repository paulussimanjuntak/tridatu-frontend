import { notification, message } from "antd";
import axios, { formHeaderHandler } from "./axios";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

message.config({ duration: 5, maxCount: 1 });

export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const imageValidation = (file, name, url, method, setLoading) => {
  const formData = new FormData();
  formData.append(name, file);
  
  let promise = new Promise((resolve, reject) => {
    setLoading(true);

    axios[method](url, formData, formHeaderHandler())
      .then(res => {
        resolve(file);
        setLoading(false);
        notification.success({
          closeIcon: <i className="far fa-times" />,
          message: "Success",
          description: res.data.detail,
          placement: "bottomRight",
        });
        console.log(`SUCCESS ${url}`, res.data)
      })
      .catch(err => {
        setLoading(false);
        reject(file);
        message.error({ 
          content: err.response.data.detail, 
          style: { marginTop: '10vh' },
        });
        console.log(`ERROR ${url}`, err.response)
      })
  })
  // console.log("method", method)
  // console.log("name", name)
  // console.log("url", url)
  // console.log("configAxios", configAxios)
  return promise;
}

export const imagePreview = async file => {
  let src = file.url;
  if (!src) {
    src = await new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow.document.write(image.outerHTML);
};

export const uploadButton = loading => (
  <div>
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div>Upload{loading ? <>ing</> : null}</div>
  </div>
);
