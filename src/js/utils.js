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

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate('../partials/header.html');
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
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
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