document.addEventListener('DOMContentLoaded', () => {
  // 1) Dados para popular dropdowns:
  const optionsData = {
    'melee-dropdown': ['Superhuman','Death Step','Electric Claw','Dragon Talon','Godhuman','Sanguine Art', 'Eletric','Water Kong Fu', 'Dark Step', 'Dragon Breath', 'Combat'],
    'sword-dropdown': ['Cursed Dual Katana','True Triple Katana','Hallow Scythe','Spikey Trident','Dark Blade','Yama','Tushita', 'Triple Katana', 'Dual Katana', 'Cutlass', 'Iron Mace', 'Shark Saw', 'Dragon Trident', 'Dual-Headed Blade', 'Flail', 'Gravity Blade', 'Longsowrd', 'Spikey Trident', 'Pipe', 'Soul Cane', 'Trident', 'Wardens Sword', 'Fox Lamp', 'Koko', 'Midnightblade', 'Canvande', 'Dark Dagger', 'Dragonheart', 'Pole V1', 'Pole V2', 'Rengoku', 'Saber', 'Shaisi', 'Shark Ancor', 'Shizu', 'Oroshi'],
    'gun-dropdown': ['Soul Guitar','Acidum Rifle','Kabucha','Serpent Bow', 'Slingshot', 'Flintlock', 'Musket', 'Bizarre Revolver', 'Cannon', 'Dual Flintlock', 'Magma Blaster', 'Refined Slingshot', 'Bazooka'],
    'fruit-dropdown': ['Kitsune','Leopard','Dragon','Control','Spirit','Venom','Shadow','Dough','Blizzard','Pain','Phoenix','Rumble','Portal','Buddha','Love','Spider','Sound','Light','Magma','Quake','Ghost','Creation','Rubber','Diamond','Revive','Dark','Sand','Ice','Eagle','Flame','Spike','Smoke','Bomb','Spring','Blade','Spin','Rocket']
  };

  // 2) Mapa de pontos definido por você (back-end JS):
  const pointsMap = {
    // Melee
    'Superhuman': 0,
    'Death Step': 0,
    'Electric Claw': 0,
    'Dragon Talon': 0,
    'Godhuman': 0,
    'Sanguine Art': 0,
    'Eletric': 0,
    'Water Kong Fu': 0,
    'Dark Step': 0,
    'Dragon Breath': 0,
    'Combat': 0,
  
    // Sword
    'Cursed Dual Katana': 0,
    'True Triple Katana': 0,
    'Hallow Scythe': 0,
    'Spikey Trident': 0,
    'Dark Blade': 0,
    'Yama': 0,
    'Tushita': 0,
    'Triple Katana': 0,
    'Dual Katana': 0,
    'Cutlass': 0,
    'Iron Mace': 0,
    'Shark Saw': 0,
    'Dragon Trident': 0,
    'Dual-Headed Blade': 0,
    'Flail': 0,
    'Gravity Blade': 0,
    'Longsowrd': 0,
    'Pipe': 0,
    'Soul Cane': 0,
    'Trident': 0,
    'Wardens Sword': 0,
    'Fox Lamp': 0,
    'Koko': 0,
    'Midnightblade': 0,
    'Canvande': 0,
    'Dark Dagger': 0,
    'Dragonheart': 0,
    'Pole V1': 0,
    'Pole V2': 0,
    'Rengoku': 0,
    'Saber': 0,
    'Shaisi': 0,
    'Shark Ancor': 0,
    'Shizu': 0,
    'Oroshi': 0,
  
    // Gun
    'Soul Guitar': 0,
    'Acidum Rifle': 0,
    'Kabucha': 0,
    'Serpent Bow': 0,
    'Slingshot': 0,
    'Flintlock': 0,
    'Musket': 0,
    'Bizarre Revolver': 0,
    'Cannon': 0,
    'Dual Flintlock': 0,
    'Magma Blaster': 0,
    'Refined Slingshot': 0,
    'Bazooka': 0,
  
    // Fruit
    'Kitsune': 0,
    'Leopard': 0,
    'Dragon': 0,
    'Control': 0,
    'Spirit': 0,
    'Venom': 0,
    'Shadow': 0,
    'Dough': 0,
    'Blizzard': 0,
    'Pain': 0,
    'Phoenix': 0,
    'Rumble': 0,
    'Portal': 0,
    'Buddha': 0,
    'Love': 0,
    'Spider': 0,
    'Sound': 0,
    'Light': 0,
    'Magma': 0,
    'Quake': 0,
    'Ghost': 0,
    'Creation': 0,
    'Rubber': 0,
    'Diamond': 0,
    'Revive': 0,
    'Dark': 0,
    'Sand': 0,
    'Ice': 0,
    'Eagle': 0,
    'Flame': 0,
    'Spike': 0,
    'Smoke': 0,
    'Bomb': 0,
    'Spring': 0,
    'Blade': 0,
    'Spin': 0,
    'Rocket': 0
  };
  

  // Funções de dropdown (populate, filter, open/close)
  const selectionBoxes = document.querySelectorAll('.selection-box');
  const dropdownContents = document.querySelectorAll('.dropdown-content');

  function populateDropdown(id, opts) {
    const dd = document.getElementById(id);
    dd.innerHTML = '';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Buscar ou digitar...';
    input.addEventListener('keyup', e => filterOptions(e.target, id));
    dd.appendChild(input);
    opts.forEach(o => {
      const div = document.createElement('div');
      div.textContent = o;
      div.addEventListener('click', () => {
        const box = document.getElementById(id.replace('-dropdown','-box'));
        const h2 = box.querySelector('h2');
        h2.textContent = `${h2.textContent.split(' - ')[0]} - ${o}`;
        closeAll();
      });
      dd.appendChild(div);
    });
  }

  function filterOptions(inp, id) {
    const filt = inp.value.toLowerCase();
    document.getElementById(id)
      .querySelectorAll('div')
      .forEach(d => {
        d.style.display = d.textContent.toLowerCase().includes(filt) ? '' : 'none';
      });
  }

  function closeAll() {
    dropdownContents.forEach(c => c.style.display = 'none');
  }

  selectionBoxes.forEach(box => {
    const dd = document.getElementById(box.id.replace('-box','-dropdown'));
    if (optionsData[dd.id]) populateDropdown(dd.id, optionsData[dd.id]);
    box.addEventListener('click', e => {
      if (e.target.tagName === 'INPUT' ||
          e.target.parentElement.classList.contains('dropdown-content')) {
        e.stopPropagation();
        return;
      }
      const isOpen = dd.style.display === 'block';
      closeAll();
      if (!isOpen) {
        dd.style.display = 'block';
        const inp = dd.querySelector('input');
        inp.focus();
        inp.value = '';
        filterOptions(inp, dd.id);
      }
    });
  });

  document.addEventListener('click', e => {
    if (![...selectionBoxes].some(b => b.contains(e.target))) {
      closeAll();
    }
  });

  // 3) Funcionalidade de seleção de pontos (destacar borda)
  const pointBlocks = document.querySelectorAll('.point-block');
  pointBlocks.forEach(block => {
    block.addEventListener('click', () => {
      pointBlocks.forEach(b => b.classList.remove('selected'));
      block.classList.add('selected');
    });
  });

  // 4) Cálculo da média ponderada ao clicar em "Analisar Build"
  document.getElementById('analyze-button').addEventListener('click', () => {
    const cats = ['melee','fruit','sword','gun'];
    // Pesos: melee=1, outras categorias=2
    const weightMap = { melee: 2, fruit: 2, sword: 2, gun: 2 };
    let weightedSum = 0;
    let totalWeight = 0;
    let text = 'Build Selecionada:\n';

    cats.forEach(cat => {
      const box = document.getElementById(`${cat}-box`);
      const h2 = box.querySelector('h2');
      const name = h2.textContent.split(' - ')[1] || null;
      text += `- ${h2.textContent.split(' (')[0]}: ${name || 'Nada selecionado'}\n`;
      if (name && pointsMap[name] != null) {
        const pts = pointsMap[name];
        const w = weightMap[cat] || 1;
        weightedSum += pts * w;
        totalWeight += w;
      }
    });

    if (totalWeight < Object.values(weightMap).reduce((a, b) => a + b, 0)) {
      text += '\nPor favor, selecione uma opção para cada categoria.';
    } else {
      const avg = weightedSum / totalWeight;
      let label;
      if (avg <= 1.5)      label = 'Skill';
      else if (avg <= 2.5) label = 'Meio Skill';
      else                 label = 'No Skill';
      text += `\n→ ★ ${label}★`;
    }

    const pre = document.createElement('pre');
    pre.textContent = text;
    const result = document.getElementById('result-section');
    result.innerHTML = '';
    result.appendChild(pre);
  });
});
