<?php
header('Content-Type: application/json; charset=utf-8');
$response = array();
$url ="mongodb+srv://FacialAI:qPaJmXviZHEw7cG@cluster0.dqwyv.mongodb.net/FacialAI?retryWrites=true&w=majority"
try {
    $connection = new MongoClient($url); 
    $response = array(
        "status" => "success",
        "error" => false,
        "message" => "Mongodb Connection successful"
    );
    echo json_encode($response);
} 
catch (RuntimeException $e) {
  $response = array(
    "status" => "error",
    "error" => true,
    "message" => $e->getMessage()
  );
  echo json_encode($response);
}
