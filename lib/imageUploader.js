import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const getBase64Img = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export const imageValidation = (file, url, name, configAxios) => {
  console.log("file", file)
  console.log("url", url)
  console.log("name", name)
  console.log("configAxios", configAxios)
  return true
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
