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

$env = isset($_GET['env']) ? $_GET['env'] : 'staging';

$files = scandir($dataDir);
$projects = [];

foreach ($files as $file) {
    if (strpos($file, "survey_data_{$env}_") === 0 && substr($file, -5) === '.json') {
        $filePath = $dataDir . '/' . $file;
        $content = file_get_contents($filePath);
        if ($content) {
            $data = json_decode($content, true);
            if ($data) {
                $projects[] = [
                    'projectId' => isset($data['projectId']) ? $data['projectId'] : '',
                    'env' => isset($data['env']) ? $data['env'] : $env,
                    'site_name' => isset($data['site_name']) ? $data['site_name'] : '이름 없는 홈페이지',
                    'fileName' => $file,
                    'updatedAt' => filemtime($filePath) * 1000 // Convert to JS timestamp
                ];
            }
        }
    }
}

// Sort by updatedAt descending
usort($projects, function($a, $b) {
    return $b['updatedAt'] - $a['updatedAt'];
});

header('Content-Type: application/json');
echo json_encode(['success' => true, 'data' => $projects]);
