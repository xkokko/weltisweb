<!DOCTYPE html>
<html>

<?php
	$withTemplate = isset($withTemplate) ? $withTemplate : true; 
	$pageClasses = isset($pageClasses) ? $pageClasses : 'wcc';
	$customStylesheets = isset($customStylesheets) && is_array($customStylesheets) ? $customStylesheets : [];
	$customJavascripts = isset($customJavascripts) && is_array($customJavascripts) ? $customJavascripts : [];
?>

<head>
	<title><?php echo isset($pageTitle) ? $pageTitle : 'Weltis'; ?></title>
	<meta name="description" content="Weltis é un gioco di ruolo minimalista e versatile con ambientazione aperta."/>
	<meta name="author" content="kokko">

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

	<link rel="stylesheet" href="/assets/gcss.core.css">
	<script src="/scripts/chartjs.core.js"></script>

	<?php foreach ($customStylesheets as $stylesheet): ?>
		<link rel="stylesheet" href="/assets/<?php echo $stylesheet; ?>.css">
	<?php endforeach; ?>

	<?php foreach ($customJavascripts as $javascript): ?>
		<script src="/scripts/<?php echo $javascript; ?>.js"></script>
	<?php endforeach; ?>
</head>

<body class="<?php echo $pageClasses; ?>">
	<?php if ($withTemplate): ?>
	<nav class="sticky arrange top container bot theme dark full width navbar">
		<div class="flex full text just center absolute width"><a class="longo" href="/"><img class="brand" src="/assets/brand.png" alt="weltis home"></a></div>
	</nav>
	<div>
		<?php echo $bodyContent; ?>
		<div class="container col text center full width theme gray font sans footer">
			<a href="https://t.me/weltis" class="text link">@weltis su Telegram</a>
			<a href="mailto:hello@weltis.cc" class="text link">hello@weltis.cc</a>
			<span class="text ghost">© 2017-2024 Cosmo Cocconcelli</span>
		</div>
	</div>
	<?php else: ?>
		<?php echo $bodyContent; ?>
	<?php endif; ?>
</body>
</html>
