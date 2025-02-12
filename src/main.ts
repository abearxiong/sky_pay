import { page, app } from './app.ts';
import { query } from './modules/query.ts';
export const render = ({ renderRoot }) => {
  const button = document.createElement('button');
  renderRoot.appendChild(button);
  button.innerText = 'Click me';
  button.onclick = async () => {
    query.post({
      path: 'alipay',
      key: 'pay',
    })
  };
};

if (page) {
  page.addPage('/home', 'home');
  page.subscribe('home', () => {
    render({
      renderRoot: document.getElementById('ai-root'),
    });
  });
}

if (app) {
  app
    .route({
      path: 'home',
      key: 'render',
    })
    .define(async (ctx) => {
      let { renderRoot } = ctx.query;
      if (!renderRoot) {
        ctx.throw(404, 'renderRoot is required');
      }
      if (typeof renderRoot === 'string') {
        renderRoot = document.querySelector(renderRoot);
      }
      if (!renderRoot) {
        ctx.throw(404, 'renderRoot not found');
      }
      render({
        renderRoot,
      });
    })
    .addTo(app);
}
