export const manifest = {
  screens: {
    scr_phyjb4: { name: "Início", route: "/", position: { "x": 160, "y": 220 } },
    scr_6wuqim: { name: "Buscar", route: "/buscar", position: { "x": 1560, "y": 220 } },
    scr_bbpcyx: { name: "Detalhe do Negócio", route: "/negocio/1", position: { "x": 2960, "y": 220 } },
    scr_vd17yz: { name: "Cadastro · Dados", route: "/cadastrar", state: { "step": 1 }, position: { "x": 160, "y": 2200 } },
    scr_zj7tgi: { name: "Cadastro · Local", route: "/cadastrar", state: { "step": 2 }, position: { "x": 1560, "y": 2200 } },
    scr_m0l30a: { name: "Cadastro · Contato", route: "/cadastrar", state: { "step": 3 }, position: { "x": 2960, "y": 2200 } },
    scr_k2o47w: { name: "Cadastro · Fotos", route: "/cadastrar", state: { "step": 4 }, position: { "x": 4360, "y": 2200 } },
    scr_eumsz1: { name: "Cadastro · Revisão", route: "/cadastrar", state: { "step": 5 }, position: { "x": 5760, "y": 2200 } },
    scr_uqj7pc: { name: "Cadastro · Sucesso", route: "/cadastrar", state: { "step": 6 }, position: { "x": 7160, "y": 2200 } }
  },
  sections: {
    sec_355ncm: { name: "Browsing Flow", x: 0, y: 0, width: 4320, height: 1180 },
    sec_uyv347: { name: "Registration Flow", x: 0, y: 1980, width: 8520, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_355ncm", children: [
    { kind: "screen", id: "scr_phyjb4" },
    { kind: "screen", id: "scr_6wuqim" },
    { kind: "screen", id: "scr_bbpcyx" }]
  },
  { kind: "section", id: "sec_uyv347", children: [
    { kind: "screen", id: "scr_vd17yz" },
    { kind: "screen", id: "scr_zj7tgi" },
    { kind: "screen", id: "scr_m0l30a" },
    { kind: "screen", id: "scr_k2o47w" },
    { kind: "screen", id: "scr_eumsz1" },
    { kind: "screen", id: "scr_uqj7pc" }]
  }]

};