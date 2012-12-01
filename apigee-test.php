<?php

ini_set('display_errors', 1);
error_reporting(-1);
header('Content-Type: text/html; charset=utf-8');

$data = json_encode(array('name' => 'lode', 'kind' => 'human'));
curl_post('https://api.usergrid.com/lode/sandbox/animals', $data);

$animals = curl_get('https://api.usergrid.com/lode/sandbox/animals');
$animal = curl_get('https://api.usergrid.com/lode/sandbox/animals/pi');
$filter = http_build_query(array('kind' => "'cat'"));
$cats = curl_get('https://api.usergrid.com/lode/sandbox/animals?filter='.urlencode($filter));

print_r($animals['entities']);
print_r($animal['entities'][0]);
print_r($cats);

function curl_get($url, $post=false) {
	$resource = curl_init($url);
	
	curl_setopt($resource, CURLOPT_FAILONERROR, true);
	curl_setopt($resource, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($resource, CURLOPT_CONNECTTIMEOUT, 5);
	curl_setopt($resource, CURLOPT_TIMEOUT, 5);
	
	if ($post) {
		curl_setopt($resource, CURLOPT_POST, true);
		curl_setopt($resource, CURLOPT_POSTFIELDS, $post);
	}
	
	$response = curl_exec($resource);
	if ($response == false) {
		$error = curl_error($resource);
		$errno = curl_errno($resource);
		curl_close($resource);
		throw new Exception($error, $errno);
	}
	curl_close($resource);
	
	return json_decode($response, true);
}

function curl_post($url, $data) {
	return curl_get($url, $data);
}
