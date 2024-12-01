<?php

$file = file_get_contents('./input');
$lines = explode("\n", $file);
$left = [];
$right = [];
foreach ($lines as $line) {
  if ($line) {
    $parts = explode("   ", $line);
    $left[] = $parts[0];
    $right[] = $parts[1];
  }
}
sort($left);
sort($right);
$totalPartOne = 0;
$totalPartTwo = 0;
for ($i = 0; $i < count($left); $i++) {
  $diff = abs($left[$i] - $right[$i]);
  $totalPartOne += $diff;

  $totalPartTwo += $left[$i] * count(array_filter($right, function ($value) use ($i, $left) {
    return $value == $left[$i];
  }));
}

echo "Result for Part One is: " . $totalPartOne . "\n";
echo "Result for Part Two is: " . $totalPartTwo . "\n";
