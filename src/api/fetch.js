import { baseUrl } from './config';

export default async (url = '', data = {}, type = "GET") => {
  type = type.toUpperCase();
  url = baseUrl + url;

  if (type === 'GET') {
    let dataStr = '';
    object.keys(data).forEach(key => {
      dataStr = dataStr + key + '=' + data[key] + '&';
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexof('&'));
      url = url + "?" + dataStr;
    }
  }

  if (window.fetch) {
    let requestConfig = {
      credentials: "include",
      method: type,
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json',
      },
      mode: "cors",
      cache: 'force-cache',
    };

    if (type === 'POST' || type === 'PUT' || type === 'DELETE') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data),
      })
    }

    try {
      const response = await fetch(url, requestConfig)
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else {
    // 无法使用fetch api的，用普通ajax
    return new Promise((resolvem, reject) => {
      let requestObj
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest()
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = ''
      if (type === 'POST' || type === 'PUT' || type === 'DELETE') {
        sendData = JSON.stringify(data)
      }

      requestObj.open(type, url, true)
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      requestObj.send(sendData)

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj)
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
