export function setDataToMcu(ip, options) {
  let searchParams = Object.keys(options)
    .map((key) => {
      return `${key}=${options[key]}&`;
    })
    .join('');
  let url = 'http://' + ip + '/data?' + searchParams;
  console.log(url);

  return fetch(url).catch((err) => {
    console.log(err);
  });
}
