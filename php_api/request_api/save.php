<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, bypass-tunnel-reminder');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$dataDir = __DIR__ . '/../request_data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}

// Get JSON body
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit;
}

$env = isset($input['env']) ? $input['env'] : 'staging';
$projectId = isset($input['projectId']) ? $input['projectId'] : null;

if (!$projectId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'projectId is required']);
    exit;
}

$filePath = $dataDir . "/survey_data_{$env}_{$projectId}.json";

if (file_put_contents($filePath, $inputJSON)) {
    echo json_encode(['success' => true, 'message' => 'Saved successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save data. Please check folder permissions.']);
}
