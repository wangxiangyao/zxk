console.log(process.env.NODE_ENV);
let url = 'http://222.141.18.145:7001/api/v1'
// if (process.env.NODE_ENV === 'development') {
//   url = 'http://192.168.100.189/api/v1';
// } else if (process.env.NODE_ENV === 'production') {
//   url = 'http://222.141.18.145:7001/api/v1';
// }

export const baseUrl = url;
