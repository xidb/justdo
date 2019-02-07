<?php

namespace App\Listener\Entity;

use App\Entity\User;
use DateTimeImmutable;

class UserListener
{
    /**
     * @param User $user
     */
    public function preUpdate(User $user) {
        $user->setupdated(new DateTimeImmutable());
    }
}
