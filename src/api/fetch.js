// let baseUrl = 'http://222.141.18.145:7001/api/v1';
export let baseUrl = 'http://localhost:8080/api/v1' ;


// 解决内外网不互通的问题
// const p = Promise.race([
//   a('/test', {} , 'GET' ,'http://192.168.100.189/api/v1'),
//   a('/test', {} , 'GET' ,'http://222.141.18.145:7001/api/v1')
// ])
// .then((json) => {
//   console.log(json);
//   let local = json.data.requestHost
//   if (local.startsWith('192.168')) {
//     baseUrl = 'http://192.168.100.189/api/v1'
//   } else {
//     baseUrl = 'http://222.141.18.145:7001/api/v1'
//   }
// })
// .catch(error => console.log(error))


async function a(url = '', data = {}, type = "GET", base) {
  type = type.toUpperCase();
  if (base) {
    url = base + url;
  } else {
    url = baseUrl + url;
  }
  console.log(url, type)
  if (type === 'GET') {
    let dataStr = '';
    Object.keys(data).forEach(key => {
      dataStr = dataStr + key + '=' + data[key] + '&';
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + "?" + dataStr;
    }
  }

  if (window.fetch) {
    let requestConfig = {
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
      console.log('请求中')
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      let e = new Error(error)
      console.log('捕获到错误', e.name, e.message)
      if ( e.message === 'TypeError: Failed to fetch') {
        console.log('更换url，重新fetch')
        return 'change fetch';
      }
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

export default a
