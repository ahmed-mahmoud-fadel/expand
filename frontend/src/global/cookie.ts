export const setCookie = (
  name: string,
  data: string,
  init?: {
    expires?: Date | string | number,
    path?: string
  },
): void => {
  let cookie = `${name}=${data}`

  if (init?.expires) {
    cookie += `; expires=${new Date(init.expires).toUTCString()}`
  }
  if (init?.path) {
    cookie += `; path=${init.path}`
  }

  document.cookie = cookie
}

export const getCookie = (name: string): string => {
  let cname = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}