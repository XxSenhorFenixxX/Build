document.addEventListener('DOMContentLoaded', () => {
    const selectionBoxes = document.querySelectorAll('.selection-box');
    const dropdownContents = document.querySelectorAll('.dropdown-content');

    // Dados de exemplo para as listas suspensas (o usuário irá preencher depois)
    const optionsData = {
        'melee-dropdown': ['Superhuman', 'Death Step', 'Electric Claw', 'Dragon Talon', 'Godhuman', 'Sanguine Art'],
        'sword-dropdown': ['Cursed Dual Katana', 'True Triple Katana', 'Hallow Scythe', 'Spikey Trident', 'Dark Blade', 'Yama', 'Tushita'],
        'gun-dropdown': ['Soul Guitar', 'Acidum Rifle', 'Kabucha', 'Serpent Bow'],
        'fruit-dropdown': ['Kitsune', 'Leopard', 'Dragon', 'Control', 'Spirit', 'Venom', 'Shadow', 'Dough', 'Blizzard', 'Pain', 'Phoenix', 'Rumble', 'Portal', 'Buddha', 'Love', 'Spider', 'Sound', 'Light', 'Magma', 'Quake', 'Ghost', 'Barrier', 'Rubber', 'Diamond', 'Revive', 'Dark', 'Sand', 'Ice', 'Falcon', 'Flame', 'Spike', 'Smoke', 'Bomb', 'Spring', 'Chop', 'Spin', 'Rocket']
    };

    // Função para popular as listas suspensas
    function populateDropdown(dropdownId, options) {
        const dropdown = document.getElementById(dropdownId);
        dropdown.innerHTML = ''; // Limpa opções existentes

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar ou digitar...';
        searchInput.addEventListener('keyup', (e) => filterOptions(e.target, dropdownId));
        dropdown.appendChild(searchInput);

        options.forEach(optionText => {
            const optionDiv = document.createElement('div');
            optionDiv.textContent = optionText;
            optionDiv.addEventListener('click', () => {
                const boxId = dropdownId.replace('-dropdown', '-box');
                const box = document.getElementById(boxId);
                const h2 = box.querySelector('h2');
                h2.textContent = `${h2.textContent.split(' - ')[0]} - ${optionText}`;
                closeAllDropdowns();
            });
            dropdown.appendChild(optionDiv);
        });
    }

    // Função para filtrar opções na lista suspensa
    function filterOptions(inputElement, dropdownId) {
        const filter = inputElement.value.toLowerCase();
        const dropdown = document.getElementById(dropdownId);
        const divs = dropdown.getElementsByTagName('div');
        for (let i = 0; i < divs.length; i++) {
            let txtValue = divs[i].textContent || divs[i].innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                divs[i].style.display = "";
            } else {
                divs[i].style.display = "none";
            }
        }
    }

    // Função para fechar todos os dropdowns
    function closeAllDropdowns() {
        dropdownContents.forEach(content => {
            content.style.display = 'none';
        });
    }

    selectionBoxes.forEach(box => {
        const boxId = box.id;
        const dropdownId = boxId.replace('-box', '-dropdown');
        const currentDropdown = document.getElementById(dropdownId);

        // Popula o dropdown correspondente
        if (optionsData[dropdownId]) {
            populateDropdown(dropdownId, optionsData[dropdownId]);
        }

        box.addEventListener('click', (event) => {
            // Impede que o clique no input de busca feche o dropdown
            if (event.target.tagName === 'INPUT') {
                event.stopPropagation();
                return;
            }
            // Impede que o clique numa opção feche e reabra o dropdown
            if (event.target.parentElement.classList.contains('dropdown-content') && event.target.tagName === 'DIV'){
                 event.stopPropagation();
                 return;
            }

            const isCurrentlyOpen = currentDropdown.style.display === 'block';
            closeAllDropdowns(); // Fecha todos antes de abrir o novo (ou reabrir)
            if (!isCurrentlyOpen) {
                currentDropdown.style.display = 'block';
                const searchInput = currentDropdown.querySelector('input[type="text"]');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.value = ''; // Limpa o campo de busca ao abrir
                    filterOptions(searchInput, dropdownId); // Mostra todas as opções
                }
            }
        });
    });

    // Fecha dropdowns se clicar fora deles
    document.addEventListener('click', (event) => {
        let isClickInsideBox = false;
        selectionBoxes.forEach(box => {
            if (box.contains(event.target)) {
                isClickInsideBox = true;
            }
        });
        if (!isClickInsideBox) {
            closeAllDropdowns();
        }
    });

    // Lógica para o botão de análise (placeholder)
    const analyzeButton = document.getElementById('analyze-button');
    const resultSection = document.getElementById('result-section');

    analyzeButton.addEventListener('click', () => {
        resultSection.innerHTML = ''; // Limpa resultados anteriores
        let analysisText = "Build Selecionada:\n";
        let allSelected = true;

        ['melee-box', 'sword-box', 'gun-box', 'fruit-box'].forEach(boxId => {
            const box = document.getElementById(boxId);
            const h2 = box.querySelector('h2');
            const selection = h2.textContent.split(' - ')[1];
            const categoryName = h2.textContent.split(' - ')[0];
            if (selection) {
                analysisText += `- ${categoryName}: ${selection}\n`;
            } else {
                analysisText += `- ${categoryName}: Nada selecionado\n`;
                allSelected = false;
            }
        });

        if (!allSelected) {
            analysisText += "\nPor favor, selecione uma opção para cada categoria.";
        }
        // Aqui você adicionaria a lógica de média ponderada e a determinação de 'skill'
        // Por enquanto, apenas exibe o que foi selecionado.
        if(allSelected){
            analysisText += "\n\nAnálise de skill (lógica a ser implementada pelo usuário).";
        }
        
        const resultParagraph = document.createElement('p');
        resultParagraph.style.whiteSpace = 'pre-wrap'; // Para manter as quebras de linha
        resultParagraph.textContent = analysisText;
        resultSection.appendChild(resultParagraph);
    });
});

