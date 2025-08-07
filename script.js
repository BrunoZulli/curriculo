// Função para alternar abas (Habilidades)
function showTab(tabId) {
    // Remove a classe 'active' de todos os botões e conteúdos
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Adiciona a classe 'active' ao botão clicado e ao conteúdo correspondente
    document.querySelector(`.tab-button[onclick*="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Lógica para alternar Modo Escuro/Claro
document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    // Salva a preferência do usuário no localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Aplica o tema salvo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// Lógica para o Player de Música
document.addEventListener('DOMContentLoaded', () => {
    const musicPlayer = document.getElementById('music-player');
    if (musicPlayer) {
        musicPlayer.volume = 0.5; // Define o volume para 50%
    }
});

// Função para exportar para PDF (usa a funcionalidade de impressão do navegador)
function exportPdf() {
    window.print();
}

// --- Lógica para os Dashboards (usando Chart.js) ---

// 1. Gráfico de Interseção de Habilidades (Gráfico de Rosca/Doughnut)
function createHabilidadesChart() {
    const ctx = document.getElementById('chartHabilidades').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Conhecimento Jurídico', 'Análise de Dados', 'Soft Skills', 'Advogado Estratégico Orientado a Dados'],
            datasets: [{
                data: [30, 25, 20, 25], // Valores percentuais conceituais
                backgroundColor: [
                    'rgba(0, 86, 179, 0.7)', // primary-color
                    'rgba(0, 123, 255, 0.7)', // secondary-color
                    'rgba(40, 167, 69, 0.7)', // accent-color
                    'rgba(255, 193, 7, 0.8)' // Amarelo para destaque da interseção
                ],
                borderColor: [
                    'rgba(0, 86, 179, 1)',
                    'rgba(0, 123, 255, 1)',
                    'rgba(40, 167, 69, 1)',
                    'rgba(255, 193, 7, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: document.body.classList.contains('dark-mode') ? 'var(--dark-mode-text)' : 'var(--text-color)'
                    }
                },
                title: {
                    display: false, // O título já está no HTML
                    text: 'Interseção de Habilidades'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed + '%';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// 2. Gráfico de Impacto (Gráfico de Barras Comparativo)
function createImpactoChart() {
    const ctx = document.getElementById('chartImpacto').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mitigação de Riscos', 'Otimização de Processos', 'Decisão Estratégica', 'Redução de Custos', 'Eficiência Operacional', 'Comunicação Stakeholders'],
            datasets: [
                {
                    label: 'Advogado Data-Driven (Meu Perfil)',
                    data: [90, 85, 95, 80, 90, 85], // Valores conceituais (0-100)
                    backgroundColor: 'rgba(0, 123, 255, 0.8)', // secondary-color
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Advogado Tradicional',
                    data: [60, 40, 70, 50, 45, 65], // Valores conceituais (0-100)
                    backgroundColor: 'rgba(108, 117, 125, 0.6)', // Cinza
                    borderColor: 'rgba(108, 117, 125, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            indexAxis: 'y', // Barras horizontais
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: document.body.classList.contains('dark-mode') ? 'var(--dark-mode-text)' : 'var(--text-color)'
                    }
                },
                title: {
                    display: false,
                    text: 'Impacto da Análise Jurídica Orientada a Dados'
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Nível de Impacto (%)',
                        color: document.body.classList.contains('dark-mode') ? 'var(--dark-mode-text)' : 'var(--text-color)'
                    },
                    ticks: {
                        color: document.body.classList.contains('dark-mode') ? 'var(--dark-mode-text)' : 'var(--text-color)'
                    },
                    grid: {
                        color: document.body.classList.contains('dark-mode') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: document.body.classList.contains('dark-mode') ? 'var(--dark-mode-text)' : 'var(--text-color)'
                    },
                    grid: {
                        color: document.body.classList.contains('dark-mode') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                    }
                }
            }
        }
    });
}

// 3. Gráfico de Tendência de Mercado (Gráfico de Linha)
function createTendenciaChart() {
    const ctx = document.getElementById('chartTendencia').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025 (Proj.)'],
            datasets: [
                {
                    label: 'Demanda por Advogados Tradicionais',
                    data: [50, 52, 55, 56, 57, 58], // Valores conceituais
                    borderColor: 'rgba(40, 167, 69, 0.8)', // accent-color
                    backgroundColor: 'rgba(40, 167, 69, 0.2)',
                    fill: true,
                    tension: 0.3
                },
                {
                    label: 'Demanda por Advogados com Habilidades em Dados',
                    data: [10, 20, 40, 70, 90, 110], // Valores conceituais (crescimento exponencial)
                    borderColor: 'rgba(0, 86, 179, 0.8)', // primary-color
                    backgroundColor: 'rgba(0, 86, 179, 0.2)',
                    fill: true,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: document.body.classList.contains('dark-mode') ? 'var(--dark-mode-text)' : 'var(--text-color)'
                    }
                },
                title: {
                    display: false,
                    text: 'Crescimento da Demanda por Profissionais Jurídicos com Habilidades em Dados'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Nível de Demanda (Índice)',
                        color: document.body.classList.contains('dark-mode') ? 'var(--dark-mode-text)' : 'var(--text-color)'
                    },
                    ticks: {
                        color: document.body.classList.contains('dark-mode') ? 'var(--dark-mode-text)' : 'var(--text-color)'
                    },
                    grid: {
                        color: document.body.classList.contains('dark-mode') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: document.body.classList.contains('dark-mode') ? 'var(--dark-mode-text)' : 'var(--text-color)'
                    },
                    grid: {
                        color: document.body.classList.contains('dark-mode') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                    }
                }
            }
        }
    });
}

// Inicializa os gráficos quando a aba de dashboards é ativada pela primeira vez
document.addEventListener('DOMContentLoaded', () => {
    // Garante que a primeira aba de habilidades esteja ativa por padrão
    showTab('tecnicas');

    // Observador para carregar os gráficos apenas quando a seção de habilidades estiver visível
    const habilidadesSection = document.getElementById('habilidades');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Carrega os gráficos apenas uma vez
                createHabilidadesChart();
                createImpactoChart();
                createTendenciaChart();
                observer.unobserve(entry.target); // Para de observar após carregar
            }
        });
    }, { threshold: 0.1 }); // Dispara quando 10% da seção está visível

    observer.observe(habilidadesSection);
});
