<?php

$paginationParams = [
    'pageParam',
    'pageSizeParam',
    'params',
    'totalCount',
    'defaultPageSize',
    'pageSizeLimit'
];

return [
    'frontendURL' => 'http://localhost/',
    'supportEmail' => 'admin@example.com',
    'adminEmail' => 'admin@example.com',
    'jwt.secret' => 'secretchambres',
    'user.passwordResetTokenExpire' => 3600,
    'paginationParams' => $paginationParams,
];
