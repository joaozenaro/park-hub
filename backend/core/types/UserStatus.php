<?php

namespace app\core\types;

enum UserStatus: int
{
    case PENDING = 0;
    case ACTIVE = 1;
}
