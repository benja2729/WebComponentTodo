
export function getTemplate(templateID) {
  const selector = `template#${templateID}__template`;
  const sharedTemplate = document.querySelector(selector).content;
  return document.importNode(sharedTemplate, true);
}

export function renderTemplate(hostNode, templateID) {
  const { shadowRoot } = hostNode;
  if (shadowRoot) {
    try {
      const templateNode = getTemplate(templateID);
      shadowRoot.appendChild(templateNode);
    } catch(error) {
      // swallow(error)
    }
  }
}

export default { getTemplate, renderTemplate };
