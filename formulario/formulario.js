document.addEventListener('DOMContentLoaded', function () {
    // Barra de pesquisa
    const searchButton = document.getElementById('search-button');
    const searchInput = document.querySelector('.search-input');

    searchButton.addEventListener('click', function () {
        if (searchInput.value.trim() !== '') {
            alert('Buscando por: ' + searchInput.value);
            // Aqui você pode implementar a lógica de busca real
            // como uma chamada API para autocompletar endereços
        } else {
            alert('Por favor, digite um endereço para pesquisar');
        }
    });

    // Permitir busca ao pressionar Enter
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    // Upload de arquivos
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');

    fileUploadArea.addEventListener('click', function () {
        fileInput.click();
    });

    // Arrastar e soltar
    fileUploadArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.style.borderColor = 'var(--aqua)';
        this.style.backgroundColor = 'rgba(93, 235, 215, 0.2)';
    });

    fileUploadArea.addEventListener('dragleave', function () {
        this.style.borderColor = '#ddd';
        this.style.backgroundColor = '';
    });

    fileUploadArea.addEventListener('drop', function (e) {
        e.preventDefault();
        this.style.borderColor = '#ddd';
        this.style.backgroundColor = '';

        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            updateFileList();
        }
    });

    fileInput.addEventListener('change', updateFileList);

    function updateFileList() {
        fileList.innerHTML = '';

        if (fileInput.files.length > 0) {
            const list = document.createElement('ul');
            list.className = 'list-group';

            for (let i = 0; i < fileInput.files.length; i++) {
                const file = fileInput.files[i];
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center small';

                const fileInfo = document.createElement('span');
                fileInfo.innerHTML = `<i class="far ${file.type.startsWith('image/') ? 'fa-image' : 'fa-file-video'} me-2"></i> ${file.name} (${formatFileSize(file.size)})`;

                const removeBtn = document.createElement('button');
                removeBtn.className = 'btn btn-sm btn-outline-danger';
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                removeBtn.onclick = function () {
                    removeFile(i);
                };

                listItem.appendChild(fileInfo);
                listItem.appendChild(removeBtn);
                list.appendChild(listItem);
            }

            fileList.appendChild(list);
        }
    }

    function removeFile(index) {
        const dt = new DataTransfer();
        const files = fileInput.files;

        for (let i = 0; i < files.length; i++) {
            if (i !== index) {
                dt.items.add(files[i]);
            }
        }

        fileInput.files = dt.files;
        updateFileList();
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Validação do formulário
    const denunciaForm = document.getElementById('denunciaForm');

    denunciaForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validação simples - você pode adicionar mais validações aqui
        if (this.checkValidity()) {
            // Simular envio do formulário
            alert('Denúncia enviada com sucesso! Obrigado por contribuir com o meio ambiente.');
            this.reset();
            fileList.innerHTML = '';
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
});

function initAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('search-input'),  // Campo de pesquisa
        { types: ['geocode'] }  // Limita a endereços físicos
    );

    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            alert("Endereço não encontrado");
            return;
        }
        // Aqui você tem acesso a todos os dados do endereço
        console.log(place);
    });
}