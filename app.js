const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function filterProjects(category) {
  $$('.filter').forEach(button => {
    const active = button.dataset.filter === category;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  $$('.project-item').forEach(project => {
    const show = category === 'all' || project.dataset.category === category;
    project.hidden = !show;
    if (show) count++;
  });
  $('.planned-grid').hidden = category === 'data';
  $('#filter-status').textContent = `${count} ${count === 1 ? 'projeto exibido' : 'projetos exibidos'}.`;
}
$$('[data-filter]').forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.filter)));

function selectTab(name, focus = false) {
  $$('[data-tab]').forEach(button => {
    const active = button.dataset.tab === name;
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
    $(`#panel-${button.dataset.tab}`).hidden = !active;
    if (active && focus) button.focus();
  });
}
$$('[data-tab]').forEach(button => {
  button.addEventListener('click', () => selectTab(button.dataset.tab));
  button.addEventListener('keydown', event => {
    const tabs = $$('[data-tab]');
    const current = tabs.indexOf(button);
    let next;
    if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (current + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(tabs[next].dataset.tab, true); }
  });
});

const metrics = {
  mae: { climate: '60,84', lstm: '64,59', seasonal: '89,84', label: 'MAE · erro médio absoluto' },
  rmse: { climate: '82,25', lstm: '89,44', seasonal: '127,03', label: 'RMSE · raiz do erro quadrático médio' }
};
$$('[data-metric]').forEach(button => button.addEventListener('click', () => {
  const metric = metrics[button.dataset.metric];
  $$('[data-metric]').forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  $$('[data-result]').forEach(cell => cell.textContent = metric[cell.dataset.result]);
  $('#metric-explainer').textContent = metric.label;
}));

const projectDetails = {
  tasks: {
    eyebrow: '02 / FULL STACK · PLANEJADO',
    title: 'Gerenciador de tarefas',
    description: 'Um projeto pessoal planejado para praticar o fluxo completo de uma aplicação: uma interface em React e TypeScript, uma API em Java com Spring Boot e persistência em PostgreSQL.',
    scope: ['Criar e organizar tarefas com prioridades e prazos.', 'Acompanhar tarefas por status: a fazer, em andamento e concluídas.', 'Integrar interface, API REST e persistência de dados.', 'Documentar a configuração e os fluxos para uma demonstração futura.'],
    tags: ['React', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL'],
    notice: 'Escopo planejado. Ainda não há implementação demonstrável, métricas de uso ou link de execução verificado para este projeto.'
  },
  stock: {
    eyebrow: '03 / BACKEND · PLANEJADO',
    title: 'Sistema de estoque',
    description: 'Um projeto pessoal planejado com foco em regras de negócio e integridade dos dados. Java, Spring Boot e PostgreSQL são a stack proposta para a API.',
    scope: ['Cadastrar produtos e consultar saldos disponíveis.', 'Registrar entradas e saídas com validação das movimentações.', 'Explorar transações e consistência dos saldos.', 'Documentar os endpoints e preparar exemplos para uma demonstração futura.'],
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'API REST'],
    notice: 'Escopo proposto, ainda sem resultados ou API hospedada. As decisões técnicas serão consolidadas durante o desenvolvimento.'
  }
};
const dialog = $('#project-dialog');
let lastTrigger = null;
$$('[data-open]').forEach(button => button.addEventListener('click', () => {
  const project = projectDetails[button.dataset.open];
  lastTrigger = button;
  $('#dialog-eyebrow').textContent = project.eyebrow;
  const content = $('#dialog-content');
  content.replaceChildren();
  const title = document.createElement('h2'); title.id = 'dialog-title'; title.textContent = project.title;
  const description = document.createElement('p'); description.textContent = project.description;
  const heading = document.createElement('h3'); heading.textContent = 'O que quero explorar';
  const list = document.createElement('ul'); list.className = 'scope-list';
  project.scope.forEach(text => { const item = document.createElement('li'); item.textContent = text; list.append(item); });
  const tags = document.createElement('div'); tags.className = 'tags';
  project.tags.forEach(text => { const tag = document.createElement('span'); tag.textContent = text; tags.append(tag); });
  const notice = document.createElement('p'); notice.className = 'scope-notice'; notice.textContent = project.notice;
  content.append(title, description, heading, list, tags, notice);
  dialog.showModal();
}));
function closeDialog() { dialog.close(); }
$('.close-dialog').addEventListener('click', closeDialog);
$('.dialog-done').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog();
});
dialog.addEventListener('close', () => { if (lastTrigger) lastTrigger.focus(); });

const techContent = {
  practice: [
    ['{ }', 'Aplicações', 'React · TypeScript · Java · Quarkus', 'Interfaces, serviços e integração de sistemas'],
    ['∿', 'Dados & aprendizado de máquina', 'Python · Pandas · NumPy · TensorFlow', 'Preparação, modelagem e avaliação de séries temporais'],
    ['⌘', 'Base de trabalho', 'SQL · Git · APIs REST', 'Modelagem de dados, versionamento e comunicação']
  ],
  planned: [
    ['{ }', 'Gerenciador de tarefas', 'React · TypeScript · Spring Boot', 'Stack prevista para integrar interface e backend'],
    ['◇', 'Sistema de estoque', 'Java · Spring Boot · API REST', 'Stack proposta para regras de negócio e serviços'],
    ['⌘', 'Persistência', 'PostgreSQL · SQL', 'Base prevista para os próximos projetos pessoais']
  ]
};
$$('[data-tech]').forEach(button => button.addEventListener('click', () => {
  $$('[data-tech]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  const content = $('#tech-content'); content.replaceChildren();
  techContent[button.dataset.tech].forEach(([symbol, title, tools, detail]) => {
    const row = document.createElement('div'); row.className = 'tech-row';
    const icon = document.createElement('span'); icon.className = 'tech-symbol'; icon.setAttribute('aria-hidden', 'true'); icon.textContent = symbol;
    const body = document.createElement('div');
    const heading = document.createElement('h3'); heading.textContent = title;
    const description = document.createElement('p'); description.textContent = tools;
    const small = document.createElement('small'); small.textContent = detail;
    body.append(heading, description, small); row.append(icon, body); content.append(row);
  });
}));

function revealHashProject() {
  if (['#lstm', '#tarefas', '#estoque'].includes(location.hash)) {
    filterProjects('all');
    requestAnimationFrame(() => $(location.hash)?.scrollIntoView({ block: 'start' }));
  }
}
window.addEventListener('hashchange', revealHashProject);
$$('a[href="#lstm"]').forEach(link => link.addEventListener('click', () => filterProjects('all')));
revealHashProject();
