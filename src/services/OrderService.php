<?php


namespace App\services;


class OrderService
{
    public function test(): void {
        print_r('test');
    }

    public function checkFill($val): string {
        $data = self::safetyData($val);
        return strlen($data) > 0 ? $data : false;
    }

    public function checkMail($val): string {
        $data = self::safetyData($val);
        return filter_var($data, FILTER_VALIDATE_EMAIL);
    }

    private static function safetyData($data=null) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

}
