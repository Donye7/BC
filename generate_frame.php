<?php
    if (isset($_POST['imgData'])) {
        $imgData = $_POST['imgData'];
        $imgData = str_replace('data:image/png;base64,', '', $imgData);
        $imgData = str_replace(' ', '+', $imgData);
        $imgData = base64_decode($imgData);

        $filename = 'frames/' . uniqid() . '.png';
        if (file_put_contents($filename, $imgData)) {
            echo json_encode(['success' => true, 'filepath' => $filename]);
        } else {
            echo json_encode(['success' => false]);
        }
    } else {
        echo json_encode(['success' => false]);
    }
?>
