<?php declare(strict_types=1);

function get_gabarit(string $filename, array $trans): string {
    $code_html = file_get_contents($filename);
    return $code_html;
}
