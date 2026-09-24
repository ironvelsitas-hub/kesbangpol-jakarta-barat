<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$host = '127.0.0.1';
$db   = 'db_kesbangpol';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["error" => "Connection failed: " . $e->getMessage()]));
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$table = $_GET['table'] ?? '';

// Allowlist of tables for security
$allowedTables = ['partai', 'ormas', 'dprd', 'timTerpadu', 'fpk', 'fkub', 'fkdm', 'paskibraka', 'dppi'];

if ($action == 'migrate' && $method == 'POST') {
    // Read JSON payload (entire DATA object)
    $input = json_decode(file_get_contents("php://input"), true);
    if (!$input) die(json_encode(["error" => "Invalid JSON payload"]));
    
    foreach ($allowedTables as $tbl) {
        if (!isset($input[$tbl])) continue;
        $rows = $input[$tbl];
        if (empty($rows)) continue;
        
        $columns = array_keys($rows[0]);
        $colDefs = [];
        foreach ($columns as $col) {
            if ($col == 'id') {
                $colDefs[] = "`id` INT AUTO_INCREMENT PRIMARY KEY";
            } else {
                $colDefs[] = "`$col` TEXT NULL"; // Use TEXT for flexibility during migration
            }
        }
        
        $pdo->exec("DROP TABLE IF EXISTS `$tbl`");
        $createSql = "CREATE TABLE `$tbl` (" . implode(', ', $colDefs) . ")";
        $pdo->exec($createSql);
        
        // Insert data
        foreach ($rows as $row) {
            $cols = array_keys($row);
            $vals = array_values($row);
            $placeholders = implode(',', array_fill(0, count($vals), '?'));
            $colNames = implode(',', array_map(function($c) { return "`$c`"; }, $cols));
            $stmt = $pdo->prepare("INSERT INTO `$tbl` ($colNames) VALUES ($placeholders)");
            $stmt->execute($vals);
        }
    }
    
    echo json_encode(["success" => true, "message" => "Migration successful"]);
    exit;
}

if ($table && !in_array($table, $allowedTables)) {
    die(json_encode(["error" => "Invalid table"]));
}

if (!$table) {
    die(json_encode(["error" => "Table not specified"]));
}

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM `$table`");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        if (isset($input['id'])) unset($input['id']); // don't set ID manually on insert
        $cols = array_keys($input);
        $vals = array_values($input);
        $placeholders = implode(',', array_fill(0, count($vals), '?'));
        $colNames = implode(',', array_map(function($c) { return "`$c`"; }, $cols));
        $stmt = $pdo->prepare("INSERT INTO `$table` ($colNames) VALUES ($placeholders)");
        $stmt->execute($vals);
        echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
        break;
        
    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input['id'] ?? null;
        if (!$id) die(json_encode(["error" => "ID required"]));
        unset($input['id']); // don't update ID
        $cols = array_keys($input);
        $vals = array_values($input);
        $vals[] = $id;
        $setStr = implode(',', array_map(function($c) { return "`$c` = ?"; }, $cols));
        $stmt = $pdo->prepare("UPDATE `$table` SET $setStr WHERE id = ?");
        $stmt->execute($vals);
        echo json_encode(["success" => true]);
        break;
        
    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) die(json_encode(["error" => "ID required"]));
        $stmt = $pdo->prepare("DELETE FROM `$table` WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["success" => true]);
        break;
}
?>
