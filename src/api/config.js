console.log(process.env.NODE_ENV);
let url = ''
if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:8080/api/v1';
} else if (process.env.NODE_ENV === 'production') {
  url = 'http://192.168.100.189/api/v1';
}

export const baseUrl = url;
