<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, bypass-tunnel-reminder');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$dataDir = __DIR__ . '/../request_data';
$env = isset($_GET['env']) ? $_GET['env'] : 'staging';
$projectId = isset($_GET['projectId']) ? $_GET['projectId'] : null;

if (!$projectId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'projectId is required']);
    exit;
}

$filePath = $dataDir . "/survey_data_{$env}_{$projectId}.json";

if (file_exists($filePath)) {
    header('Content-Type: application/json');
    echo file_get_contents($filePath);
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'No data found.']);
}
