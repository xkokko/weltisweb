<?php

// Variables

$logVerbosity = 10;


// Functions

function vlog($message, $verbosity = 1) {
	global $logVerbosity;
	
	$logFile = __DIR__ . '/debug.log';
	$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
	$logEntry = '[' . date('Y-m-d H:i:s') . '] ' . $message . "\n";
	
	if ($logVerbosity < $verbosity) return false;
	
	if (file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX) !== false) return true;
	else {
		error_log('Failed to log message: ' . $message, 3, $logFile);
		return false;
	}
}

// Returns a numerical value defining type of path
// 0 : Non-Existing
// 1 : Directory
// 2 : File
// 3 : Unknown
function isFileOrFolder($path) {
	if (!file_exists($path)) {
		vlog('Path unknown [0]', 2);
		return 0;
	}
	if (is_dir($path)) {
		vlog('Path is Directory [1]', 2);
		return 1;
	}
	elseif (is_file($path)) {
		vlog('Path is File [2]', 2);
		return 2;
	}
	else {
		vlog('Path exists [3]', 2);
		return 3;
	}
}
