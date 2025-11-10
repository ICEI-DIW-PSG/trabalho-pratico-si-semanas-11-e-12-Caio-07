const API_URL = 'http://localhost:3000';

// Função para carregar museus na página inicial
async function carregarMuseus() {
    try {
        const response = await fetch(`${API_URL}/museus`);
        const museus = await response.json();
        
        const container = document.getElementById('museus-container');
        container.innerHTML = '';
        
        museus.forEach(museu => {
            const card = criarCardMuseu(museu);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar museus:', error);
        alert('Erro ao carregar museus. Verifique se o JSON Server está rodando.');
    }
}

function criarCardMuseu(museu) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    
    col.innerHTML = `
        <div class="card h-100">
            <img src="${museu.imagem}" class="card-img-top" alt="${museu.nome}" style="height: 200px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title">${museu.nome}</h5>
                <p class="card-text">${museu.descricao}</p>
                <p class="card-text"><small class="text-muted">${museu.localizacao}</small></p>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary btn-sm" onclick="verDetalhes(${museu.id})">Ver Detalhes</button>
                <button class="btn btn-warning btn-sm" onclick="editarMuseu(${museu.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="excluirMuseu(${museu.id})">Excluir</button>
            </div>
        </div>
    `;
    
    return col;
}

function verDetalhes(id) {
    window.location.href = `detalhes.html?id=${id}`;
}

function editarMuseu(id) {
    window.location.href = `cadastro_museus.html?id=${id}`;
}

async function excluirMuseu(id) {
    if (confirm('Tem certeza que deseja excluir este museu?')) {
        try {
            const response = await fetch(`${API_URL}/museus/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert('Museu excluído com sucesso!');
                carregarMuseus();
            } else {
                alert('Erro ao excluir museu');
            }
        } catch (error) {
            console.error('Erro ao excluir museu:', error);
            alert('Erro ao excluir museu');
        }
    }
}

// Carregar museus quando a página carregar
document.addEventListener('DOMContentLoaded', carregarMuseus);