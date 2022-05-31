export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

export function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error('Bad Response');
  }
}

export async function loadHeaderFooter(simpleHeader = false) {
  let headerTemplate;
  if(simpleHeader){
    headerTemplate = await loadTemplate('../partials/header-simple.html');
  } else {
    headerTemplate = await loadTemplate('../partials/header.html');
  }
  const footerTemplate = await loadTemplate('../partials/footer.html');
  const headerElement = document.getElementById('main-header');
  const footerElement = document.getElementById('main-footer');
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}

export function renderListWithTemplate(template, parent, list, callback) {
  list.forEach((item) => {
    //console.log(item.id);
    const clone = template.content.cloneNode(true);
    const templateWithData = callback(clone, item);
    parent.appendChild(templateWithData);
  });
}

export function renderWithTemplate(template, parent, data, callback) {
  let clone = template.content.cloneNode(true);
  if (callback) {
    clone = callback(clone, data);
  }
  parent.appendChild(clone);
}

export async function loadModalContent(modalTemplateName) {
  const modalTemplate = await loadTemplate(`../partials/${modalTemplateName}`);
  const modalElement = document.getElementById('site-modal');
  renderWithTemplate(modalTemplate, modalElement);
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function addItemToCart(key, object) {

}

export function getShipmentAddressComponents(){
  const geolocation = getLocalStorage('currentPositionGeolocation');
  let shipmentAddress = "";
  let shipmentCountry = "";
  let shipmentPostalCode = "";
  geolocation.address_components.map((a) => {
    if(a.types.includes('street_number')){
      shipmentAddress += (a["short_name"] + " ");
    }
    if(a.types.includes('route')){
      shipmentAddress += (a["short_name"] + ", ");
    }
    if(a.types.includes('administrative_area_level_1')){
      shipmentAddress += (a["short_name"] + " ");
    }
    if(a.types.includes('country')){
      shipmentCountry = a["long_name"];
    }
    if(a.types.includes('postal_code')){
      shipmentPostalCode = a["long_name"];
    }
  });

  return {
    "shipmentAddress": shipmentAddress,
    "shipmentCountry": shipmentCountry,
    "shipmentPostalCode": shipmentPostalCode
  }
}

export function getShipmentAmmounts(data){
  let subtotal = 0.0;
  data.map((i) => {
    let totalUnit = parseInt(i.qty) * parseFloat(i["unit-price"]);
    subtotal += totalUnit;
  });
  let taxes = subtotal*0.18;
  let total = subtotal+taxes;
  return {
    "subtotal": subtotal.toFixed(2),
    "taxes": taxes.toFixed(2),
    "total": total.toFixed(2)
  }
}

export function insideAlert(parent, title, message, closable){
  const alert = document.createElement('div');
  const alertTitle = document.createElement('h3');
  alertTitle.textContent = title;
  const alertMessage = document.createElement('p');
  alertMessage.textContent = message;
  alert.append(alertTitle);
  alert.append(alertMessage);
  if(closable){
    const close = document.createElement('span');
    close.classList.add('close');
    close.addEventListener('click', function (){
      parent.removeChild(alert);
    });
    close.textContent = 'x';
    alert.append(close);
  }
  alert.classList.add('alert')
  parent.insertBefore(alert, parent.firstChild);
}