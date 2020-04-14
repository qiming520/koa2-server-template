// axios请求的时候进行Authorization验证

// 请求header
// header: {
//   Authorization: _encode()
// }

_encode() {
  const token = 'token'  //这边获取到的token为后端传递的token
  const base64 = 'Basic ' + Base64.encode(token + ':')

  return base64
}