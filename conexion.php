<?php
$host = '127.0.0.1';
$db = 'distribucion_hipergeometrica';
$user = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $N = $_POST['N'];
    $K = $_POST['K'];
    $n = $_POST['n'];
    $x = $_POST['x'];
    $tipo_probabilidad = $_POST['tipo_probabilidad'];
    $resultado = $_POST['resultado'];

    $sql = "INSERT INTO resultados (N, K, n, x, tipo_probabilidad, resultado) VALUES (:N, :K, :n, :x, :tipo_probabilidad, :resultado)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':N' => $N,
        ':K' => $K,
        ':n' => $n,
        ':x' => $x,
        ':tipo_probabilidad' => $tipo_probabilidad,
        ':resultado' => $resultado
    ]);

    echo "Resultado guardado con éxito.";
}
?>
