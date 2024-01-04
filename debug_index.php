<?php

include_once 'config.php';

//
// Request Retriever
//

// Gets the request in the URL
$parameterRequest = isset($_GET['request']) ? $_GET['request'] : '';
$requestUri = $_SERVER['REQUEST_URI'];

vlog("Passed request: " . $parameterRequest);
vlog("Requested URI: " . $requestUri, 2);

//
// Request Evaluator
//

$parameterRequest = trim($parameterRequest, '/');

// If the URI is empty, set it to the default page
if (empty($parameterRequest)) $parameterRequest = 'home';

// If the URI is default as index.php, set it to the default page
if ($parameterRequest === 'index.php') $parameterRequest = 'home';

vlog("New Evaluated request: " . $parameterRequest, 3);

// Define the pages directory
$pagesDirectory = __DIR__ . '/pages/';

vlog("Evaluated Pages directory: " . $pagesDirectory, 3);

// Build the path to the requested page
$pagePath = $pagesDirectory . $parameterRequest . '.php';

vlog("Path of Page: " . $pagePath, 3);

// Initialize $bodyContent
$bodyContent = '';

// Start output buffering to capture the contents of the requested page
ob_start();

// Check if the requested page exists
if (isFileOrFolder($pagePath) == 2) {
	// Get the contents of the requested page
	include $pagePath;
}
else {
	// Log
	vlog("Page not found: " . $parameterRequest);
	
	// Include the 404 page
	include $pagesDirectory . '404.php';
}

// Get the contents of the buffer
$bodyContent = ob_get_clean();

// Include the common template
include (__DIR__ . '/template.php');

return;
