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

// 1. JSON Payload 데이터 수신 (FormData 방식 대응)
$inputJSON = isset($_POST['payload']) ? $_POST['payload'] : file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit;
}

// 파일 업로드 디렉토리 설정
$uploadDir = $dataDir . '/uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// 2. 첨부된 파일 처리 ($_FILES)
if (!empty($_FILES)) {
    foreach ($_FILES as $inputName => $file) {
        if ($file['error'] === UPLOAD_ERR_OK) {
            // 파일명 안전하게 변경 (시간 + 원본파일명)
            $safeFileName = time() . '_' . preg_replace('/[^a-zA-Z0-9_.-]/', '_', basename($file['name']));
            $destination = $uploadDir . $safeFileName;
            
            if (move_uploaded_file($file['tmp_name'], $destination)) {
                // 다운로드/조회를 위한 상대 URL 
                $fileUrl = dirname($_SERVER['SCRIPT_NAME']) . '/../request_data/uploads/' . $safeFileName;
                
                // 해당 항목의 값을 파일 URL로 교체하여 JSON 데이터에 병합
                $input[$inputName] = $fileUrl;
            }
        }
    }
}

// 다시 인코딩 (파일 URL이 병합되었으므로)
$inputJSON = json_encode($input, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

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
