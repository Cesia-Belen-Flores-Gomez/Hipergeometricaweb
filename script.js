window.onload = function () {
    const probabilidadForm = document.getElementById('probabilidad-form');
    const probabilidadChartCtx = document.getElementById('probabilidadChart').getContext('2d');

    probabilidadForm.onsubmit = function (e) {
        e.preventDefault();
        const N = parseInt(document.getElementById('N').value);
        const K = parseInt(document.getElementById('K').value);
        const n = parseInt(document.getElementById('n').value);
        const x = parseInt(document.getElementById('x').value);
        const a = parseInt(document.getElementById('a').value);
        const b = parseInt(document.getElementById('b').value);

        // Calcular la distribución hipergeométrica
        const pXless = hypergeomCDF(x - 1, N, K, n);
        const pXgreater = 1 - hypergeomCDF(x, N, K, n);
        const paXb = hypergeomCDF(b - 1, N, K, n) - hypergeomCDF(a - 1, N, K, n);

        alert(`P[X<x] = ${pXless}\nP[X>x] = ${pXgreater}\nP[a<X<b] = ${paXb}`);

        // Configurar datos ocultos para enviar al servidor
        document.getElementById('tipo_probabilidad').value = `P[a<X<b]`;
        document.getElementById('resultado').value = paXb;

        // Graficar la distribución de probabilidad
        plotProbabilidadChart(probabilidadChartCtx, N, K, n);
    };

    function hypergeomPDF(x, N, K, n) {
        return (combinatoria(K, x) * combinatoria(N - K, n - x)) / combinatoria(N, n);
    }

    function hypergeomCDF(x, N, K, n) {
        let sum = 0;
        for (let i = 0; i <= x; i++) {
            sum += hypergeomPDF(i, N, K, n);
        }
        return sum;
    }

    function combinatoria(n, k) {
        if (k > n) return 0;
        let numerador = 1;
        let denominador = 1;
        for (let i = 0; i < k; i++) {
            numerador *= (n - i);
            denominador *= (i + 1);
        }
        return numerador / denominador;
    }

    function plotProbabilidadChart(ctx, N, K, n) {
        const labels = Array.from({ length: n + 1 }, (_, i) => i);
        const data = labels.map(x => hypergeomPDF(x, N, K, n));

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Distribución Hipergeométrica',
                    data: data,
                    backgroundColor: 'rgba(255, 182, 193, 0.2)', // Color rosita pastel
                    borderColor: 'rgba(255, 182, 193, 1)', // Color rosita pastel oscuro
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
};
