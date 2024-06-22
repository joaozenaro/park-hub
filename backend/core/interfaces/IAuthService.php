<?php

namespace app\core\interfaces;

interface IAuthService
{
    /**
     * Generates JWT
     */
    function getToken(int $id, string $username): string;
}