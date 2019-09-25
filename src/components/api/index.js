const getEnv = function () {
  const { href } = window.top.location;
  let env = "";
  if (href.includes("dev.") || href.includes("localhost")) {
    env = "dev";
  }
  if (href.includes("test.")) {
    env = "test";
  }
  if (href.includes("it.")) {
    env = "it";
  }
  return env;
};
const getFile = function () {
  const { href } = window.top.location;
  let env = "";
  if (href.includes("dev.") || href.includes("localhost")) {
    env = "dev";
  }
  if (href.includes("test.") || href.includes("it.")) {
    env = "test";
  }
  return env;

};
const _baseUrl5 = `/platform`
// const _baseUrl5 = `https://admin${getEnv()}.hongkazhijia.com/platform`


const _baseUrl6 = `https://file${getEnv()}.hongkazhijia.com`
// const _baseUrl6 = 'https://filetest.hongkazhijia.com'

// action=api.getUpload("/file/ihongka_files/upload")
// action=api.getUpload("/file/ihongka_files/upload")

const _nextUrl = window.location.port === "" ?
  `${window.location.protocol}//next.${window.location.host}` :
  `${window.location.protocol}//${window.location.hostname}:${Number(window.location.port) + 10}`

export default {
  getPlatform(url) {
    return _baseUrl5 + url
  },
  getUpload(url) {
    return _baseUrl6 + url
  },
  getNextUrl(url = "") {
    return _nextUrl + url
  },
  getAuth() {
    return {
      id: sessionStorage.getItem("id"),
      orgid: sessionStorage.getItem("orgid"),
      orgType: sessionStorage.getItem("orgType"),
      userType: sessionStorage.getItem("userType"),
      token: sessionStorage.getItem("token"),
      origin: window.location.origin,
    }
  }
  // getAction() {
  //     return _baseUrl7
  // },
}
